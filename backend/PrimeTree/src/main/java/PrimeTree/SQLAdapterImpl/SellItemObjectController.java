package PrimeTree.SQLAdapterImpl;

import java.util.Date;

import org.json.JSONException;
import org.json.JSONObject;

import PrimeTree.WrongFormatException;

/**This sub-class of OfferingObjectController controlls all SellItem-Listings*/
public class SellItemObjectController extends OfferingObjectController {
	
	public class SellItem extends Offering{
		private int amount;
		private String condition;
		private float price;

		public SellItem(JSONObject listingData, int creatorId) {
			super(listingData, creatorId);
			this.amount=listingData.getInt("amount");
			this.condition=listingData.getString("condition");
			this.price=(float) (((float)listingData.getInt("price"))/100.0);
		}
	}
	
	protected final Class listingType=SellItem.class;

	@Override
	public int createAndPersistNewInstance(JSONObject listingData, int creatorId) throws WrongFormatException {
		try{
			SellItem newInstance=new SellItem(listingData, creatorId);
			Constants.listingRepository.save(newInstance);
			return newInstance.getListingId();
		}catch(JSONException e){
			throw new WrongFormatException(e.toString());
		}
	}

}
