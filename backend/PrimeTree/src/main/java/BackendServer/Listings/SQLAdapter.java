package BackendServer.Listings;
import org.json.JSONObject;

import BackendServer.Exceptions.ListingNotFoundException;
import BackendServer.Exceptions.WrongFormatException;
import BackendServer.Listings.Entities.Listing;

public interface SQLAdapter {
	
	/**This method takes the data for a new listing in a single object and creates a persisted entry in the ListingDatabase.
	 * 
	 * @param:
	 * newListingData: This object contains data for the new listing in the same format of the listingData-definition in the REST-Implementation
	 * 
	 * @return: the id of the new persisted listing 
	 * */
	int persistNewListing(JSONObject newListingData, int creatorId) throws WrongFormatException;
	
	/**This method searches for the listing with the listingId and returns the Object
	 * 
	 * @param:
	 * listingId: Id of the required listing
	 * 
	 * @return: the listing-object
	 * */
	Listing getListingById(long listingId) throws ListingNotFoundException;

}
