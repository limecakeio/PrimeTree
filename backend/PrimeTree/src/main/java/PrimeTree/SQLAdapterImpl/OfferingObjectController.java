package PrimeTree.SQLAdapterImpl;

import java.util.Date;

import org.json.JSONObject;

/**This abstract class is the super-class of all ListingObjectController-sub-classes, that control an offering*/
public abstract class OfferingObjectController extends ListingObjectController {

	public class Offering extends Listing{
		public Offering(JSONObject listingData, int creatorId) {
			super(listingData, creatorId);
		}
	}
	
	protected final Class listingType=Offering.class;
	
}
