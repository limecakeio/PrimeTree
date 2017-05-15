package BackendServer.Listings.ObjectControllers;

import java.util.List;

import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;

import BackendServer.Exceptions.ListingNotFoundException;
import BackendServer.Exceptions.WrongFormatException;
import BackendServer.Listings.ConstantsAndSimpleMethods;
import BackendServer.Listings.Entities.Listing;
import BackendServer.Listings.Entities.SellItem;
import BackendServer.Listings.Entities.ServiceOffering;
import BackendServer.Listings.Repositories.ServiceOfferingRepository;

public class ServiceOfferingObjectController extends OfferingObjectController {
	
	@Autowired
	ServiceOfferingRepository serviceOfferingRepository;

	@Override
	public long createAndPersistNewInstance(JSONObject listingData, String creator) throws WrongFormatException {
		try{
			
			ServiceOffering newInstance=new ServiceOffering();
			newInstance.fillFields(listingData, creator);
		    
			serviceOfferingRepository.save(newInstance);
			return newInstance.getListingId();
			
		}catch(JSONException e){
			throw new WrongFormatException(e.toString());
		}
	}

	@Override
	public Listing getListingById(long listingId) throws ListingNotFoundException {
		ServiceOffering foundItem = serviceOfferingRepository.findOne(listingId);
		if(foundItem==null){
			throw new ListingNotFoundException("Listing with id " + listingId + " does not exist.");
		}else{
			return foundItem;
		}
	}

	@Override
	public List<? extends Listing> getAll() {
		return serviceOfferingRepository.findAll();
	}

	@Override
	public Long deleteListing(Long listingId) throws ListingNotFoundException {
		ServiceOffering foundItem = serviceOfferingRepository.findOne(listingId);
		if(foundItem==null){
			throw new ListingNotFoundException("Listing with id " + listingId + " does not exist.");
		}else{
			serviceOfferingRepository.delete(listingId);
			return listingId;
		}
	}
	
	/**Checks whether listingData is in the format of SellItem
	 * Does not check whether all required fields of SellItem are represented in listingData
	 * 
	 * @return true, if listingData is in the format of SellItem
	 * 
	 * @throws WrongFormatException if no listingType is found in listingData*/
	@Override
	public boolean isThisListingType(JSONObject listingData)throws WrongFormatException{
		try{
			return "ServiceOffering".equals(listingData.getString(ConstantsAndSimpleMethods.listingDataFieldNameListingType));
		}catch(JSONException e){
			throw new WrongFormatException("The listingType is missing.");
		}
	}

}
