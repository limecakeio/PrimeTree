package BackendServer.Listings;

import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.nio.file.AccessDeniedException;
import java.nio.file.FileAlreadyExistsException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.Collection;
import java.util.Iterator;
import java.util.LinkedList;
import java.util.List;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;

import BackendServer.Exceptions.ListingNotFoundException;
import BackendServer.Exceptions.WrongFormatException;
import BackendServer.Listings.Entities.Listing;
import BackendServer.Listings.Entities.SellItem;
import BackendServer.Listings.ObjectControllers.ListingObjectController;

public class PersistenceAdapterImpl implements PersistenceAdapter {
	
	//This is an Array containing Instances of all non-abstract classes extending ListingObjectController
	@Autowired
	ListingObjectController[] listingControllers;
	
	private abstract class ListingObjectControllerActionPerformer {
		
		protected ListingObjectController listingObjectController;
		
		public abstract Object performAction(long listingId) throws ListingNotFoundException;
		
		public void setListingObjectController(ListingObjectController listingObjectController) {
			this.listingObjectController = listingObjectController;
		}
	}

	@Override
	public int persistNewListing(JSONObject newListingData, String creator) throws WrongFormatException{
		return (int) getListingControllerWithTheRightType(newListingData).
				createAndPersistNewInstance(newListingData, creator);
	}

	@Override
	public Listing getListingById(long listingId) throws ListingNotFoundException {
		return (Listing) performActionOnAlllistingControllers(listingId,
				new ListingObjectControllerActionPerformer(){

					@Override
					public Object performAction(long listingId) throws ListingNotFoundException {
						return listingObjectController.getListingById(listingId);
					}
			
		});
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
		throw new WrongFormatException("ListingType " + listingData.getString(Constants.listingDataFieldNameListingType) + " does not exist.");
	}

	@Override
	public LinkedList<Integer> getAllListings() {
		LinkedList<Integer> results=new LinkedList<Integer>();
		for(int controllerIndex=0;controllerIndex<listingControllers.length;controllerIndex++){
			Iterator<? extends Listing> listingIterator = listingControllers[controllerIndex].getAll().iterator();
			while(listingIterator.hasNext()){
				results.add((int) listingIterator.next().getListingId());
			}
		}
		return results;
	}

	@Override
	public Listing[] getListingArrayByIdArray(int[] listingIds) throws ListingNotFoundException {
		Collection<Listing> results=new LinkedList<Listing>();
		for(int IdArrayIndex=0;IdArrayIndex<listingIds.length;IdArrayIndex++){
			results.add(getListingById(listingIds[IdArrayIndex]));
		}
		return (Listing[]) results.toArray();
	}

	@Override
	public void deleteListingById(int listingId) throws ListingNotFoundException {
		performActionOnAlllistingControllers(listingId,
				new ListingObjectControllerActionPerformer(){

					@Override
					public Object performAction(long listingId) throws ListingNotFoundException {
						return listingObjectController.deleteListing((long) listingId);
					}
			
		});
	}
	
	private Object performActionOnAlllistingControllers(long listingId, ListingObjectControllerActionPerformer action) throws ListingNotFoundException{
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
	public void uploadImage(byte[] imageData, int listingId) throws FileNotFoundException, IOException {
		String filePath=makeFilePath(listingId);
		try{
			Files.deleteIfExists(Paths.get(filePath));
			Files.createDirectories(Paths.get(makeDirectoryPath(listingId)));
			Files.createFile(Paths.get(filePath));
		}catch(FileAlreadyExistsException e){
			//do nothing and continue
		}catch(AccessDeniedException e){
			System.out.println(e.getMessage());
		}
		FileOutputStream outputStream=new FileOutputStream(filePath);
		outputStream.write(imageData);
		outputStream.close();
	}

	private String makeFilePath(int listingId) {
		return "assets/listings/" + listingId + "/main-image.png";
	}
	
	private String makeDirectoryPath(int listingId) {
		return "assets/listings/" + listingId;
	}
}