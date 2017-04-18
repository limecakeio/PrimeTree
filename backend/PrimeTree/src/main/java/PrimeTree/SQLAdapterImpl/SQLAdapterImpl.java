package PrimeTree.SQLAdapterImpl;

import org.json.JSONObject;

import PrimeTree.ListingNotFoundException;
import PrimeTree.SQLAdapter;
import PrimeTree.WrongFormatException;

public class SQLAdapterImpl implements SQLAdapter {
	
	ListingObjectController[] listingController={
		new SellItemObjectController()	
	};

	public int persistNewListing(JSONObject newListingData, int creatorId) throws WrongFormatException{
		return getListingControllerWithTheRightType(newListingData).createAndPersistNewInstance(newListingData, creatorId);
	}

	public Listing getListingById(int listingId) throws ListingNotFoundException {
		return Constants.listingRepository.findOne((long) listingId);
	}
	
	/**This method returns a ListingObjectController-instance, whose listingType matches the one of the listingData.
	 * If listingData contains no field with the listingType a WrongFormatException is thrown.*/
	private ListingObjectController getListingControllerWithTheRightType(JSONObject listingData) throws WrongFormatException{
		for(int controllerIndex=0;controllerIndex<listingController.length;controllerIndex++){
			if(listingController[controllerIndex].isThisListingType(listingData)){
				return listingController[controllerIndex];
			}
		}
		throw new WrongFormatException("ListingType " + listingData.getString(Constants.listingDataFieldNameListingType) + " does not exist.");
	}

}