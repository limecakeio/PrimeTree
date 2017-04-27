package BackendServer.Listings.ObjectControllers;

import org.json.JSONException;
import org.json.JSONObject;

import BackendServer.Exceptions.ListingNotFoundException;
import BackendServer.Exceptions.WrongFormatException;
import BackendServer.Listings.Constants;
import BackendServer.Listings.Entities.Listing;

/**This abstract class is made so sub-classes can control the listings with the individual listingType.
 * Controlling means checking, whether a listingData-JSONObject matches the individual listingType. */
public abstract class ListingObjectController {
	
	public String listingType;
	
	/**This method checks whether the listingData-JSONObject contains data for the listingType of the sub-class.
	 * If the JSONObject contains no data about the listingType a WrongFormatException is thrown.*/
	public boolean isThisListingType(JSONObject listingData)throws WrongFormatException{
		try{
			return this.listingType.equals(listingData.getString(Constants.listingDataFieldNameListingType));
//			return true;
		}catch(JSONException e){
			throw new WrongFormatException("The listingType is missing.");
		}
	}
	
	/**This method creates and persists a new Listing-Object with the data of thelistingData and the creatorId.*/
	public abstract long createAndPersistNewInstance(JSONObject listingData, int creatorId)throws WrongFormatException;

	public abstract Listing getListingById(long id) throws ListingNotFoundException;
}
