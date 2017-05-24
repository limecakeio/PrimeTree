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

import BackendServer.Exceptions.CommentNotFoundException;
import BackendServer.Exceptions.ListingNotFoundException;
import BackendServer.Exceptions.NoImageGallerySupportedException;
import BackendServer.Exceptions.WrongFormatException;
import BackendServer.Listings.Entities.Listing;
import BackendServer.Listings.ObjectControllers.ListingObjectController;
import BackendServer.Listings.Repositories.CommentRepository;

/**This class implements PersistenceAdapter. It uses the bean getAnArrayOfAllTypesOfListingObjectController()
 * to write and read from and to the listingdb database as well as saving and publishing files.
 * 
 * 
 * @author Florian Kutz
 *
 */
public class PersistenceAdapterImpl implements PersistenceAdapter {
	
	//This is an Array containing Instances of all non-abstract classes extending ListingObjectController
	@Autowired
	ListingObjectController[] listingControllers;
	
	@Autowired 
	CommentRepository commentRepository;
	
	/**This class allows PersistenceAdapterImpl to give performActionOnAlllistingControllers(...) a function 
	 * parameter, which performs a custom method on one listingObjectController*/
	private abstract class ListingObjectControllerActionPerformer {
		
		protected ListingObjectController listingObjectController;
		
		/**This method), which is called by performActionOnAlllistingControllers(...),
		 * performs a custom method with listingId on listingObjectController
		 * @throws WrongFormatException 
		 * @throws NoImageGallerySupportedException */
		public abstract Object performAction(long listingId) throws ListingNotFoundException, WrongFormatException, NoImageGallerySupportedException;
		
		public void setListingObjectController(ListingObjectController listingObjectController) {
			this.listingObjectController = listingObjectController;
		}
	}

	@Override
	public int persistNewListing(JSONObject newListingData, long creatorId) throws WrongFormatException{
		return (int) getListingControllerWithTheRightType(newListingData).
				createAndPersistNewInstance(newListingData, creatorId);
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
		} catch (NoImageGallerySupportedException e) {
			System.out.println("A NoImageGalleryException in the get method appeared. Normally this does not happen.");
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
		throw new WrongFormatException("ListingType " + listingData.getString(Constants.listingDataFieldListingType) + " does not exist.");
	}

	@Override
	public Listing[] getListingArrayByIdArray(int[] listingIds) throws ListingNotFoundException {
		Collection<Listing> results=new LinkedList<Listing>();
		for(int IdArrayIndex=0;IdArrayIndex<listingIds.length;IdArrayIndex++){
			results.add(getListingById(listingIds[IdArrayIndex]));
		}
		return SimpleMethods.parseObjectArrayToListingArray(results.toArray());
	}

	@Override
	public void deleteListingById(int listingId) throws ListingNotFoundException {
		try {
			performActionOnAlllistingControllers(listingId,
					new ListingObjectControllerActionPerformer(){

						@Override
						public Object performAction(long listingId) throws ListingNotFoundException {
							listingObjectController.deleteListing((long) listingId);
							return null;
						}
				
			});
		} catch (WrongFormatException e) {
			System.out.println("A WrongFormatException in the delete method appeared. Normally this does not happen.");
		} catch (NoImageGallerySupportedException e) {
			System.out.println("A NoImageGallerySupportedException in the delete method appeared. Normally this does not happen.");
		}
	}
	
	/**This method tries action.performAction(listingId) on all listingControllers by 
	 * continuing if one listingController doesn't find the listing
	 * throws ListingNotFoundException if the listing with id listingId does not exist
	 * @throws WrongFormatException 
	 * @throws NoImageGallerySupportedException if the action tries to add a picturepath to the gallery 
	 * but the type of the listing doesn't support an imageGallery*/
	private Object performActionOnAlllistingControllers(long listingId, ListingObjectControllerActionPerformer action) throws ListingNotFoundException, WrongFormatException, NoImageGallerySupportedException{
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
	public boolean isOwnerOfListing(int listingId, long userId) throws ListingNotFoundException {
		return userId==this.getListingById(listingId).getOwner();
	}
	
	@Override
	public void edit(long listingId, final JSONObject listingData)
			throws ListingNotFoundException, WrongFormatException {
		try {
			this.performActionOnAlllistingControllers(listingId, new ListingObjectControllerActionPerformer(){
				
				private JSONObject listingDataInAnonymClass=listingData;

				@Override
				public Object performAction(long listingId) throws ListingNotFoundException, WrongFormatException {
					listingObjectController.edit(listingId, listingDataInAnonymClass);
					return null;
				}
				
			});
		} catch (NoImageGallerySupportedException e) {
			System.out.println("A WrongFormatException in the edit method appeared. Normally this does not happen.");
		}
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
					accumulate(Constants.listingDataFieldPicture, 
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
	public Listing[] getListingsFiltered(int page, String[] location, boolean shallBeActive, int price_min, int price_max, String[] type, String kind,
			String sort, ListingSearchStatistics statistics) {
		Collection<Listing> resultSet=getAllListings();
		Iterator<? extends Listing> listingIterator=resultSet.iterator();
		int lowestPriceFound=Integer.MAX_VALUE,
				highestPriceFound=0;
		while(listingIterator.hasNext()){
			Listing checkedListing=listingIterator.next();
			if(!checkedListing.matchFilterOptions(location, shallBeActive, price_min, price_max, type, kind)){
				resultSet.remove(checkedListing);
			}else if(checkedListing.getPrice()<lowestPriceFound){
				lowestPriceFound=checkedListing.getPrice();
			}else if(checkedListing.getPrice()>highestPriceFound){
				highestPriceFound=checkedListing.getPrice();
			}
		}
		int pageBeginning=(page-1)*Constants.pageSize,
				pageEnd=page*Constants.pageSize;
		Listing[] resultArray=SimpleMethods.parseObjectArrayToListingArray(resultSet.toArray());
		Arrays.sort(resultArray, this.createListingComparator(sort));
		statistics.setPages((resultSet.size()-1)/50);
		statistics.setPrice_max(highestPriceFound);
		statistics.setPrice_min(lowestPriceFound);
		resultArray=Arrays.copyOfRange(resultArray, pageBeginning, pageEnd);
		statistics.setCount(resultArray.length);
		return resultArray;
	}
	
	/**This method creates a new Comparator<Listing> that compares two Listings with the sortOption-criteria
	 * @param sortOption the criteria by which the listings should be compared
	 * @return a new Comparator<Listing> that compares two Listings with the sortOption-criteria
	 */
	private Comparator<Listing> createListingComparator(String sortOption) {
		if(sortOption.equals(Constants.sortOptionPrice_Desc)){
			return new Comparator<Listing>(){

				@Override
				public int compare(Listing o1, Listing o2) {
					return (int) (o2.getPrice()-o1.getPrice());
				}
				
			};
		} else if(sortOption.equals(Constants.sortOptionPrice_Asc)){
			return new Comparator<Listing>(){

				@Override
				public int compare(Listing o1, Listing o2) {
					return (int) (o1.getPrice()-o2.getPrice());
				}
				
			};
		}  else if(sortOption.equals(Constants.sortOptionAlphabetical_Asc)){
			return new Comparator<Listing>(){

				@Override
				public int compare(Listing o1, Listing o2) {
					return o1.getTitle().compareTo(o2.getTitle());
				}
				
			};
		}  else if(sortOption.equals(Constants.sortOptionAlphabetical_Desc)){
			return new Comparator<Listing>(){

				@Override
				public int compare(Listing o1, Listing o2) {
					return o2.getTitle().compareTo(o1.getTitle());
				}
				
			};
		}  else if(sortOption.equals(Constants.sortOptionDate_Asc)){
			return new Comparator<Listing>(){

				@Override
				public int compare(Listing o1, Listing o2) {
					return o1.getCreateDate().compareTo(o2.getCreateDate());
				}
				
			};
		}  else if(sortOption.equals(Constants.sortOptionLocation_Asc)){
			return new Comparator<Listing>(){

				@Override
				public int compare(Listing o1, Listing o2) {
					return o1.getLocation().compareTo(o2.getLocation());
				}
				
			};
		}  else if(sortOption.equals(Constants.sortOptionPrice_Desc)){
			return new Comparator<Listing>(){

				@Override
				public int compare(Listing o1, Listing o2) {
					return o2.getLocation().compareTo(o1.getLocation());
				}
				
			};
		}  else if(sortOption.equals(Constants.sortOptionPrice_Desc)){
			return new Comparator<Listing>(){

				@Override
				public int compare(Listing o1, Listing o2) {
					return (int) (o2.getPrice()-o1.getPrice());
				}
				
			};
		} else{
			return new Comparator<Listing>(){

				@Override
				public int compare(Listing o1, Listing o2) {
					return (int) (o1.getListingId()-o2.getListingId());
				}
				
			};
		}
	}

	/**This method creates a Collection of all Listings in the database
	 * @return all existing listings unsorted in a Collection
	 */
	private Collection<Listing> getAllListings(){
		LinkedList<Listing> resultList=new LinkedList<Listing>();
		for(int controllerIndex=0;controllerIndex<listingControllers.length;controllerIndex++){
			resultList.addAll(listingControllers[controllerIndex].getAll());
		}
		return resultList;
	}

	@Override
	public void addImageToGallery(byte[] imageData, int listingId, String originalFilename)
			throws IOException, ListingNotFoundException, NoImageGallerySupportedException {
		final String filePath=makeNewImageInGalleryPathName(listingId, originalFilename);
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
			this.performActionOnAlllistingControllers(listingId, new ListingObjectControllerActionPerformer(){

				@Override
				public Object performAction(long listingId) throws ListingNotFoundException, WrongFormatException, NoImageGallerySupportedException {
					this.listingObjectController.addImagePath(listingId, filePath);
					return null;
				}
			
			});
		} catch (WrongFormatException e) {
			System.out.println("A WrongFormatException in the upload method appeared. Normally this does not happen.");
		}
	}

	@Override
	public void comment(final JSONObject commentData, final long authorId, long listingId) throws ListingNotFoundException {
		try {
			this.performActionOnAlllistingControllers(listingId, new ListingObjectControllerActionPerformer(){

				@Override
				public Object performAction(long listingId)
						throws ListingNotFoundException, WrongFormatException, NoImageGallerySupportedException {
					listingObjectController.comment(commentData, authorId, listingId);
					return null;
				}
				
			});
		} catch (WrongFormatException e) {
			System.out.println("A WrongFormatException in the comment method appeared. Normally this does not happen.");
		} catch (NoImageGallerySupportedException e) {
			System.out.println("A NoImageGallerySupportedException in the comment method appeared. Normally this does not happen.");
		}
	}

	@Override
	public void deleteComment(int commentId) throws CommentNotFoundException{
		commentRepository.delete((long) commentId);
	}

	@Override
	public void changeImageInGallery(byte[] imageData, int listingId, final int galleryIndex, String originalFilename) throws ListingNotFoundException, NoImageGallerySupportedException, IOException {
		this.deleteImageInGallery(listingId, galleryIndex);
		this.addImageToGallery(imageData, listingId, originalFilename);
	}

	/**This method creates a new unredundant public pathname for a new image for a gallery
	 * @param listingId id of the listing the gallery belongs to
	 * @param originalFilename the original filename of the image
	 * @return the new public pathname
	 * @throws IOException if the pathname shows that the file was no image
	 * @throws NoImageGallerySupportedException if the listing doesn't
	 * @throws ListingNotFoundException
	 */
	private String makeNewImageInGalleryPathName(int listingId,  String originalFilename) throws IOException, NoImageGallerySupportedException, ListingNotFoundException {
		return "/resources/assets/listings/" + listingId + "/gallery/" + this.getListingById(listingId).makeNextGalleryFileName() + this.getImageFileTypeEnding(originalFilename);
	}

	@Override
	public void deleteImageInGallery(int listingId, final int galleryIndex) throws ListingNotFoundException, NoImageGallerySupportedException {
		try {
			this.performActionOnAlllistingControllers(listingId, new ListingObjectControllerActionPerformer(){

				@Override
				public Object performAction(long listingId)
						throws ListingNotFoundException, WrongFormatException, NoImageGallerySupportedException {
					listingObjectController.deleteGalleryImage(listingId, galleryIndex);
					return null;
				}
				
			});
		} catch (WrongFormatException e) {
			System.out.println("A WrongFormatException in the comment method appeared. Normally this does not happen.");
		}
	}

	@Override
	public Listing[] getListingsFiltered(int page, String[] location, int price_min, int price_max, String[] type,
			String kind, String sort, ListingSearchStatistics statistics) {
		Collection<Listing> resultSet=getAllListings();
		Iterator<? extends Listing> listingIterator=resultSet.iterator();
		int lowestPriceFound=Integer.MAX_VALUE,
				highestPriceFound=0;
		while(listingIterator.hasNext()){
			Listing checkedListing=listingIterator.next();
			if(!(checkedListing.matchFilterOptions(location, true, price_min, price_max, type, kind)||
					checkedListing.matchFilterOptions(location, false
							, price_min, price_max, type, kind))){
				resultSet.remove(checkedListing);
			}else if(checkedListing.getPrice()<lowestPriceFound){
				lowestPriceFound=checkedListing.getPrice();
			}else if(checkedListing.getPrice()>highestPriceFound){
				highestPriceFound=checkedListing.getPrice();
			}
		}
		int pageBeginning=(page-1)*Constants.pageSize,
				pageEnd=page*Constants.pageSize;
		Listing[] resultArray=SimpleMethods.parseObjectArrayToListingArray(resultSet.toArray());
		Arrays.sort(resultArray, this.createListingComparator(sort));
		statistics.setPages((resultSet.size()-1)/50);
		statistics.setPrice_max(highestPriceFound);
		statistics.setPrice_min(lowestPriceFound);
		resultArray=Arrays.copyOfRange(resultArray, pageBeginning, pageEnd);
		statistics.setCount(resultArray.length);
		return resultArray;
	}

	@Override
	public Listing[] getListingsBySearch(String query, int page, String[] location, boolean b, int price_min,
			int price_max, String[] type, String kind, String sort, ListingSearchStatistics statistics) {
		Collection<Listing> resultSet=getAllListings();
		Iterator<? extends Listing> listingIterator=resultSet.iterator();
		int lowestPriceFound=Integer.MAX_VALUE,
				highestPriceFound=0;
		while(listingIterator.hasNext()){
			Listing checkedListing=listingIterator.next();
			if(!checkedListing.matchFilterOptions(query, location, true, price_min, price_max, type, kind)){
				resultSet.remove(checkedListing);
			}else if(checkedListing.getPrice()<lowestPriceFound){
				lowestPriceFound=checkedListing.getPrice();
			}else if(checkedListing.getPrice()>highestPriceFound){
				highestPriceFound=checkedListing.getPrice();
			}
		}
		int pageBeginning=(page-1)*Constants.pageSize,
				pageEnd=page*Constants.pageSize;
		Listing[] resultArray=SimpleMethods.parseObjectArrayToListingArray(resultSet.toArray());
		Arrays.sort(resultArray, this.createListingComparator(sort));
		statistics.setPages((resultSet.size()-1)/50);
		statistics.setPrice_max(highestPriceFound);
		statistics.setPrice_min(lowestPriceFound);
		resultArray=Arrays.copyOfRange(resultArray, pageBeginning, pageEnd);
		statistics.setCount(resultArray.length);
		return resultArray;
	}

	@Override
	public Listing[] getListingsFromUser(long id) {
		Collection<Listing> resultSet=getAllListings();
		Iterator<? extends Listing> listingIterator=resultSet.iterator();
		while(listingIterator.hasNext()){
			Listing checkedListing=listingIterator.next();
			if(checkedListing.getOwner()!=id){
				resultSet.remove(checkedListing);
			}
		}
		Listing[] resultArray=SimpleMethods.parseObjectArrayToListingArray(resultSet.toArray());
		Arrays.sort(resultArray, this.createListingComparator(Constants.sortOptionId));
		return resultArray;
	}

}