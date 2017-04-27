package BackendServer.Listings;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;

import BackendServer.Exceptions.ListingNotFoundException;
import BackendServer.Exceptions.WrongFormatException;
import BackendServer.Listings.Entities.Listing;
import BackendServer.Listings.ObjectControllers.ListingObjectController;

public class SQLAdapterImpl implements SQLAdapter {
	
	//This is an Array containing Instances of all non-abstract classes extending ListingObjectController
	@Autowired
	ListingObjectController[] listingControllers;

	@Override
	public int persistNewListing(JSONObject newListingData, int creatorId) throws WrongFormatException{
		System.out.println("persistNewListing-Aufruf");
		return (int) getListingControllerWithTheRightType(newListingData).
				createAndPersistNewInstance(newListingData, creatorId);
	}

	@Override
	public Listing getListingById(long listingId) throws ListingNotFoundException {
		for(int listingControllersIndex=0;listingControllersIndex<listingControllers.length;listingControllersIndex++){
			try{
				return listingControllers[listingControllersIndex].
						getListingById(listingId);
			}catch(ListingNotFoundException e){
				//do nothing and go to next listingController
			}
		}
		throw new ListingNotFoundException("Listing with id " + listingId + " does not exist.");
	}
	
	/**This method returns a ListingObjectController-instance, whose listingType matches the one of the listingData.
	 * If listingData contains no field with the listingType a WrongFormatException is thrown.*/
	private ListingObjectController getListingControllerWithTheRightType(JSONObject listingData) throws WrongFormatException{
		for(int controllerIndex=0;controllerIndex<listingControllers.length;controllerIndex++){
			if(listingControllers[controllerIndex].isThisListingType(listingData)){
				System.out.println("ListingType Confirmed");
				return listingControllers[controllerIndex];
			}
		}
		throw new WrongFormatException("ListingType " + listingData.getString(Constants.listingDataFieldNameListingType) + " does not exist.");
	}

}