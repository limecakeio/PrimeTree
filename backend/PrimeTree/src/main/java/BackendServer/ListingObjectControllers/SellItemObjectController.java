package BackendServer.ListingObjectControllers;

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

import BackendServer.Constants;
import BackendServer.Exceptions.ListingNotFoundException;
import BackendServer.Exceptions.WrongFormatException;
import BackendServer.ListingEntities.Listing;
import BackendServer.ListingEntities.SellItem;
import BackendServer.ListingRepositories.SellItemRepository;
/**This sub-class of OfferingObjectController controlls all SellItem-Listings*/
@Component
public class SellItemObjectController extends OfferingObjectController {
	
	@Autowired
	public SellItemRepository sellItemRepository;

	@Override
	public long createAndPersistNewInstance(JSONObject listingData, int creatorId) throws WrongFormatException {
		try{
			
			SellItem newInstance=new SellItem();
			newInstance.fillFields(listingData, creatorId);
		    
			sellItemRepository.save(newInstance);
			return newInstance.getListingId();
			
			
		}catch(JSONException e){
			throw new WrongFormatException(e.toString());
		}
	}

	@Override
	public Listing getListingById(long id) throws ListingNotFoundException {
		SellItem foundItem = sellItemRepository.findOne(id);
		if(foundItem==null){
			throw new ListingNotFoundException("Listing with id " + id + " does not exist.");
		}else{
			return foundItem;
		}
	}
	
	@Override
	public boolean isThisListingType(JSONObject listingData)throws WrongFormatException{
		try{
			return "SellItem".equals(listingData.getString(Constants.listingDataFieldNameListingType));
//			return true;
		}catch(JSONException e){
			throw new WrongFormatException("The listingType is missing.");
		}
	}

}
