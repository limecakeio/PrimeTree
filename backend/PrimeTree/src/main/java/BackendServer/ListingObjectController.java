package BackendServer;

import org.json.JSONException;
import org.json.JSONObject;

/**This abstract class is made so sub-classes can control the listings with the individual listingType.
 * Controlling means checking, whether a listingData-JSONObject matches the individual listingType. */
public abstract class ListingObjectController {
	
	protected final Class<Listing> listingType=Listing.class;
	
	/**This method checks whether the listingData-JSONObject contains data for the listingType of the sub-class.
	 * If the JSONObject contains no data about the listingType a WrongFormatException is thrown.*/
	public boolean isThisListingType(JSONObject listingData)throws WrongFormatException{
		try{
			return this.listingType.getName().equals(listingData.getString(Constants.listingDataFieldNameListingType));
//			return true;
		}catch(JSONException e){
			throw new WrongFormatException("The listingType is missing.");
		}
	}
	
	/**This method creates and persists a new Listing-Object with the data of thelistingData and the creatorId.*/
	public abstract int createAndPersistNewInstance(JSONObject listingData, int creatorId)throws WrongFormatException;

}
