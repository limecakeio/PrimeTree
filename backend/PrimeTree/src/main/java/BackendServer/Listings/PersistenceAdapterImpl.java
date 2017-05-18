package BackendServer.Listings;

import java.io.FileOutputStream;
import java.io.IOException;
import java.nio.file.AccessDeniedException;
import java.nio.file.FileAlreadyExistsException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.Arrays;
import java.util.Collection;
import java.util.Comparator;
import java.util.Iterator;
import java.util.LinkedList;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;

import BackendServer.Exceptions.ListingNotFoundException;
import BackendServer.Exceptions.WrongFormatException;
import BackendServer.Listings.Entities.Listing;
import BackendServer.Listings.ObjectControllers.ListingObjectController;

/**This class implements PersistenceAdapter. It uses the bean getAnArrayOfAllTypesOfListingObjectController()
 * to write and read from and to the listingdb database. It also persists files and saves the public path with the
 * uploadImage(...) method.
 * 
 * 
 * @author Florian Kutz
 *
 */
public class PersistenceAdapterImpl implements PersistenceAdapter {
	
	//This is an Array containing Instances of all non-abstract classes extending ListingObjectController
	@Autowired
	ListingObjectController[] listingControllers;
	
	/**This class allows PersistenceAdapterImpl to give performActionOnAlllistingControllers(...) a function 
	 * parameter, which performs a custom method on one listingObjectController*/
	private abstract class ListingObjectControllerActionPerformer {
		
		protected ListingObjectController listingObjectController;
		
		/**This method), which is called by performActionOnAlllistingControllers(...),
		 * performs a custom method with listingId on listingObjectController
		 * @throws WrongFormatException */
		public abstract Object performAction(long listingId) throws ListingNotFoundException, WrongFormatException;
		
		public void setListingObjectController(ListingObjectController listingObjectController) {
			this.listingObjectController = listingObjectController;
		}
	}
	
	private ListingExpiringChecker listingExpiringChecker=new ListingExpiringChecker(this, 1000*60*60*24);

	@Override
	public int persistNewListing(JSONObject newListingData, String creator) throws WrongFormatException{
		return (int) getListingControllerWithTheRightType(newListingData).
				createAndPersistNewInstance(newListingData, creator);
	}

	@Override
	public Listing getListingById(long listingId) throws ListingNotFoundException {
		try {
			return (Listing) performActionOnAlllistingControllers(listingId,
					new ListingObjectControllerActionPerformer(){

						@Override
						public Object performAction(long listingId) throws ListingNotFoundException {
							return listingObjectController.getListingById(listingId);
						}
				
			});
		} catch (WrongFormatException e) {
			System.out.println("A WrongFormatException in the get method appeared. Normally this does not happen.");
			return null;
		}
	}
	
	/**This method returns a ListingObjectController-instance, whose listingType matches the one of the listingData.
	 * If listingData contains no field with the listingType a WrongFormatException is thrown.*/
	private ListingObjectController getListingControllerWithTheRightType(JSONObject listingData) throws WrongFormatException{
		try{
			listingData.getClass();
		}catch(NullPointerException e){
			throw new WrongFormatException("ListingData is null");
		}
		
		for(int controllerIndex=0;controllerIndex<listingControllers.length;controllerIndex++){
			if(listingControllers[controllerIndex].isThisListingType(listingData)){
				return listingControllers[controllerIndex];
			}
		}
		throw new WrongFormatException("ListingType " + listingData.getString(ConstantsAndSimpleMethods.listingDataFieldNameListingType) + " does not exist.");
	}

	@Override
	public int[] getAllActiveListingIds() {
		return this.getAllListingIdsThatMatchFilterSortedWithSortOption(new JSONObject().accumulate(ConstantsAndSimpleMethods.filterOptionActive, true), ConstantsAndSimpleMethods.sortOptionId);
	}

	@Override
	public Listing[] getListingArrayByIdArray(int[] listingIds) throws ListingNotFoundException {
		Collection<Listing> results=new LinkedList<Listing>();
		for(int IdArrayIndex=0;IdArrayIndex<listingIds.length;IdArrayIndex++){
			results.add(getListingById(listingIds[IdArrayIndex]));
		}
		return ConstantsAndSimpleMethods.parseObjectArrayToListingArray(results.toArray());
	}

	@Override
	public void deleteListingById(int listingId) throws ListingNotFoundException {
		try {
			performActionOnAlllistingControllers(listingId,
					new ListingObjectControllerActionPerformer(){

						@Override
						public Object performAction(long listingId) throws ListingNotFoundException {
							return listingObjectController.deleteListing((long) listingId);
						}
				
			});
		} catch (WrongFormatException e) {
			System.out.println("A WrongFormatException in the delete method appeared. Normally this does not happen.");
		}
	}
	
	/**This method tries action.performAction(listingId) on all listingControllers by 
	 * continuing if one listingController doesn't find the listing
	 * throws ListingNotFoundException if the listing with id listingId does not exist
	 * @throws WrongFormatException */
	private Object performActionOnAlllistingControllers(long listingId, ListingObjectControllerActionPerformer action) throws ListingNotFoundException, WrongFormatException{
		for(int controllerIndex=0;controllerIndex<listingControllers.length;controllerIndex++){
			try{
				action.setListingObjectController(listingControllers[controllerIndex]);
				return action.performAction(listingId);
			}catch(ListingNotFoundException e){
				//do nothing and go to next listingController
			}
		}
		throw new ListingNotFoundException("Listing with id " + listingId + " did not exist.");
	}

	@Override
	public boolean isOwnerOfListing(int listingId, String name) throws ListingNotFoundException {
		return name.equals(
				this.getListingById(listingId).getOwner()
				);
	}
	
	@Override
	public void edit(long listingId, final JSONObject listingData)
			throws ListingNotFoundException, WrongFormatException {
		this.performActionOnAlllistingControllers(listingId, new ListingObjectControllerActionPerformer(){
			
			private JSONObject listingDataInAnonymClass=listingData;

			@Override
			public Object performAction(long listingId) throws ListingNotFoundException, WrongFormatException {
				listingObjectController.edit(listingId, listingDataInAnonymClass);
				return null;
			}
			
		});
	}

	@Override
	public void uploadImage(byte[] imageData, int listingId, String originalFilename) throws IOException, ListingNotFoundException{
		String filePath=makeLocalFilePath(listingId, originalFilename);
		try{
			Files.deleteIfExists(Paths.get(filePath));
			Files.createDirectories(Paths.get(makeLocalDirectoryPath(listingId)));
			Files.createFile(Paths.get(filePath));
		}catch(FileAlreadyExistsException e){
			//do nothing and continue
		}catch(AccessDeniedException e){
			System.out.println(e.getMessage());
		}
		FileOutputStream outputStream=new FileOutputStream(filePath);
		outputStream.write(imageData);
		outputStream.close();
		try {
			this.edit(listingId, this.getListingById(listingId).toJSON().
					accumulate(ConstantsAndSimpleMethods.listingDataFieldNamePicture, 
							makePublicFilePath(listingId, originalFilename)));
		} catch (WrongFormatException e) {
			System.out.println("A WrongFormatException in the upload method appeared. Normally this does not happen.");
		}
	}
	
	/** This method creates the local filepath for file with the type of the originalFilename belonging to the 
	 *  listing with id listingId
	 *  
	 *  @param:
	 *  listingId: the id of the listing the file belongs to
	 *  imageData: the imageData represented in a byte-Array
	 *  originalFilename: the filename of the original file. The method can get the filetype (.png or .jpg) 
	 *  from this String
	 *  
	 * @return local pathname
	 * 
	 * @throws IOException if the originalFilename hints, that the file is not an image file*/
	private String makeLocalFilePath(int listingId, String originalFilename) throws IOException {
		return makeLocalDirectoryPath(listingId) + "/main-image." + getImageFileTypeEnding(originalFilename);
	}
	
	/** This method creates the public filepath for file with the type of the originalFilename belonging to the 
	 * listing with id listingId
	 * @param listingId: id of the listing
	 * @param originalFilename: name of the original File
	 * @return public pathname
	 * @throws IOException if the originalFilename hints, that the file is not an image file*/
	private String makePublicFilePath(int listingId, String originalFilename) throws IOException{
		return "resources/assets/listings/" + listingId + "/main-image." + getImageFileTypeEnding(originalFilename);
	}
	
	/** This method creates the local directory-path for a file belonging to the listing with id listingId
	 * @param originalFilename: name of the original File
	 * @return local pathname
	 * @throws IOException if the originalFilename hints, that the file is not an image file*/
	private String getImageFileTypeEnding(String originalFilename) throws IOException{
		String ending=originalFilename.substring(originalFilename.length()-3);
		if("png".equals(ending)||"jpg".equals(originalFilename)){
			return ending;
		}else{
			throw new IOException("The given file is neither a .png nor .jpg file.");
		}
	}
	
	/** This method creates the directorypath for a directory belonging to the listing with id listingId
	 *  @param listingId: id of the listing
	 *  @return: directory-path*/
	private String makeLocalDirectoryPath(int listingId) {
		return "src/main/webapp/resources/assets/listings/" + listingId;
	}

	@Override
	public int[] getAllListingIdsThatMatchFilterSortedWithSortOption(JSONObject filter, String sortOption) {
		Collection<Listing> resultSet=getAllListings();
		Iterator<? extends Listing> listingIterator=resultSet.iterator();
		while(listingIterator.hasNext()){
			Listing checkedListing=listingIterator.next();
			if(!checkedListing.matchFilterOptions(filter)){
				resultSet.remove(checkedListing);
			}
		}
		Listing[] resultArray=ConstantsAndSimpleMethods.parseObjectArrayToListingArray(resultSet.toArray());
		Arrays.sort(resultArray, this.createListingComparator(sortOption));
		return ConstantsAndSimpleMethods.parseListingArrayToIntArrayOfIds(resultArray);
	}
	
	private Comparator<Listing> createListingComparator(String sortOption) {
		if(sortOption.equals(ConstantsAndSimpleMethods.sortOptionId)){
			return new Comparator<Listing>(){

				@Override
				public int compare(Listing o1, Listing o2) {
					return (int) (o1.getListingId()-o2.getListingId());
				}
				
			};
		}
		return null;
	}

	private Collection<Listing> getAllListings(){
		LinkedList<Listing> resultList=new LinkedList<Listing>();
		for(int controllerIndex=0;controllerIndex<listingControllers.length;controllerIndex++){
			resultList.addAll(listingControllers[controllerIndex].getAll());
		}
		return resultList;
	}

}