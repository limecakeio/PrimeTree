package BackendServer.Listings;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.util.LinkedList;

import org.json.JSONObject;

import BackendServer.Exceptions.ListingNotFoundException;
import BackendServer.Exceptions.WrongFormatException;
import BackendServer.Listings.Entities.Listing;

public interface PersistenceAdapter {
	
	/**This method takes the data for a new listing in a single object and creates a persisted entry in the ListingDatabase.
	 * 
	 * @param:
	 * newListingData: This object contains data for the new listing in the same format of the listingData-definition in the REST-Implementation
	 * 
	 * @return: the id of the new persisted listing 
	 * 
	 * @throws WrongFormatException
	 * 	if newListingData cannot be read
	 * */
	int persistNewListing(JSONObject newListingData, String creator) throws WrongFormatException;
	
	/**This method searches for the listing with the listingId and returns the Object
	 * 
	 * @param:
	 * listingId: Id of the required listing
	 * 
	 * @return: the listing-object
	 * 
	 * @throws ListingNotFound
	 * 	if no listing with listingId listingId exists
	 * */
	Listing getListingById(long listingId) throws ListingNotFoundException;

	/**This method gives all listings by Id with no filter or sort algorithm
	 * 
	 * @param:
	 * 
	 * @return: An array of all listingId of all Listings
	 * */
	int[] getAllActiveListings();

	/**This method searches for all listings which listingId is present in the listingIds Array
	 * 
	 * @param:
	 * listingIds: An array of all listingIds of the listings this method returns
	 * 
	 * @return: An array of all listingIds of all Listings
	 * 
	 * @throws ListingNotFound
	 * 	if at least one of the ids in the array does not exist as a listing
	 * */
	Listing[] getListingArrayByIdArray(int[] listingIds) throws ListingNotFoundException;

	/**This method deletes the listing with the listingId listingId
	 * 
	 * @param:
	 * listingId: the id of the listing
	 * */
	void deleteListingById(int listingId) throws ListingNotFoundException;
	
	/**This method checks whether the user with username username is the
	 *  creator/owner of the listing with listingId listingId.
	 *  
	 *  @param:
	 *  listingId: the id of the listing
	 *  username: username of the user
	 *  
	 *  @return:
	 *  true: if the user is the creator/owner of the listing*/
	boolean isOwnerOfListing(int listingId, String username) throws ListingNotFoundException;
	
	/**This method creates a .png file for a listing
	 *  
	 *  @param:
	 *  listingId: the id of the listing the .png file belongs to
	 *  imageData: the imageData represented in a byte-Array
	 * @throws IOException if the method has a mistake in the implementation*/
	void uploadImage(byte[] imageData, int listingId) throws IOException;

}
