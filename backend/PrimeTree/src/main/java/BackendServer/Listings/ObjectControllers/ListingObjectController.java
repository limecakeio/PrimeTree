package BackendServer.Listings.ObjectControllers;

import java.util.List;

import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;

import BackendServer.Exceptions.ListingNotFoundException;
import BackendServer.Exceptions.WrongFormatException;
import BackendServer.Listings.ConstantsAndSimpleMethods;
import BackendServer.Listings.Entities.Listing;
import BackendServer.Listings.Entities.RideSharing;

/**This abstract class is made so sub-classes can control the listings with their individual listingType.
 * Controlling means checking, whether a listingData-JSONObject matches the individual listingType as well 
 * as persisting and reading the listings with the individual type. */
public abstract class ListingObjectController<L extends Listing> {
	
	public String listingType;
	protected JpaRepository<L, Long> listingRepository;
	
	/**This method checks whether the listingData-JSONObject contains data for the listingType of the sub-class.
	 * throws: WrongFormatException if the JSONObject contains no data about the listingType.*/
	public boolean isThisListingType(JSONObject listingData)throws WrongFormatException{
		try{
			return this.listingType.equals(listingData.getString(ConstantsAndSimpleMethods.listingDataFieldNameListingType));
		}catch(JSONException e){
			throw new WrongFormatException("The listingType is missing.");
		}
	}
	
	/**This method creates and persists a new Listing-Object with the data of listingData and the creator.*/
	public long createAndPersistNewInstance(JSONObject listingData, String creator) throws WrongFormatException {
		try{
			
			L newInstance=createNew();
			newInstance.fillFields(listingData, creator);
		    
			listingRepository.save(newInstance);
			return newInstance.getListingId();
			
		}catch(JSONException e){
			throw new WrongFormatException(e.toString());
		}
	}

	/**This method returns a Listing with this class's listingType with the id id*/
	public L getListingById(long listingId) throws ListingNotFoundException {
		L foundItem = listingRepository.findOne(listingId);
		if(foundItem==null){
			throw new ListingNotFoundException("Listing with id " + listingId + " does not exist.");
		}else{
			return foundItem;
		}
	}

	public List<? extends Listing> getAll() {
		return listingRepository.findAll();
	}

	public Long deleteListing(Long listingId) throws ListingNotFoundException {
		L foundItem = listingRepository.findOne(listingId);
		if(foundItem==null){
			throw new ListingNotFoundException("Listing with id " + listingId + " does not exist.");
		}else{
			listingRepository.delete(listingId);
			return listingId;
		}
	}
	
	public void edit(long listingId, JSONObject listingData)
		throws ListingNotFoundException, WrongFormatException {
		L editedListing = this.getListingById(listingId);
		System.out.println("Before: " + editedListing.toString());
		editedListing.fillFields(listingData, editedListing.getOwner());
		System.out.println("After: " + editedListing.toString());
		listingRepository.save(editedListing);
	}

	protected abstract L createNew();
	
}
