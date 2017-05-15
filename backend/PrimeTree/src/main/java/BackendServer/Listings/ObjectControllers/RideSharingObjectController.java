package BackendServer.Listings.ObjectControllers;

import java.util.List;

import javax.persistence.Entity;
import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;
import javax.persistence.PrimaryKeyJoinColumn;
import javax.persistence.Table;

import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Configurable;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.NoRepositoryBean;
import org.springframework.stereotype.Component;

import BackendServer.Exceptions.ListingNotFoundException;
import BackendServer.Exceptions.WrongFormatException;
import BackendServer.Listings.ConstantsAndSimpleMethods;
import BackendServer.Listings.Entities.Listing;
import BackendServer.Listings.Entities.RideSharing;
import BackendServer.Listings.Repositories.RideSharingRepository;
/**This sub-class of OfferingObjectController controlls all RideSharing-Listings*/
@Component
public class RideSharingObjectController extends OfferingObjectController {
	
	@Autowired
	public RideSharingRepository RideSharingRepository;

	@Override
	public long createAndPersistNewInstance(JSONObject listingData, String creator) throws WrongFormatException {
		try{
			
			RideSharing newInstance=new RideSharing();
			newInstance.fillFields(listingData, creator);
		    
			RideSharingRepository.save(newInstance);
			return newInstance.getListingId();
			
		}catch(JSONException e){
			throw new WrongFormatException(e.toString());
		}
	}

	@Override
	public Listing getListingById(long listingId) throws ListingNotFoundException {
		RideSharing foundItem = RideSharingRepository.findOne(listingId);
		if(foundItem==null){
			throw new ListingNotFoundException("Listing with id " + listingId + " does not exist.");
		}else{
			return foundItem;
		}
	}
	
	/**Checks whether listingData is in the format of RideSharing
	 * Does not check whether all required fields of RideSharing are represented in listingData
	 * 
	 * @return true, if listingData is in the format of RideSharing
	 * 
	 * @throws WrongFormatException if no listingType is found in listingData*/
	@Override
	public boolean isThisListingType(JSONObject listingData)throws WrongFormatException{
		try{
			return "RideSharing".equals(listingData.getString(ConstantsAndSimpleMethods.listingDataFieldNameListingType));
		}catch(JSONException e){
			throw new WrongFormatException("The listingType is missing.");
		}
	}

	@Override
	public List<? extends Listing> getAll() {
		return RideSharingRepository.findAll();
	}

	@Override
	public Long deleteListing(Long listingId) throws ListingNotFoundException {
		RideSharing foundItem = RideSharingRepository.findOne(listingId);
		if(foundItem==null){
			throw new ListingNotFoundException("Listing with id " + listingId + " does not exist.");
		}else{
			RideSharingRepository.delete(listingId);
			return listingId;
		}
	}

}
