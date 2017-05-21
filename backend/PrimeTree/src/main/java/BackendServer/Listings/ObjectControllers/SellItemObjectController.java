package BackendServer.Listings.ObjectControllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import BackendServer.Listings.ConstantsAndSimpleMethods;
import BackendServer.Listings.Entities.SellItem;
import BackendServer.Listings.Repositories.SellItemRepository;
/**This sub-class of OfferingObjectController controlls all SellItem-Listings*/
@Component
public class SellItemObjectController extends OfferingObjectController{
	
	@Override
	protected SellItem createNew() {
		return new SellItem();
	}

	@Autowired
	public void setListingRepository(SellItemRepository listingRepository) {
		this.listingRepository=listingRepository;
	}
	
	public SellItemObjectController(){
		listingType=ConstantsAndSimpleMethods.listingTypeNameSellItem;
	}

}
