package BackendServer.Listings.Entities;

import javax.persistence.Entity;
import javax.persistence.PrimaryKeyJoinColumn;
import javax.persistence.Table;

import org.json.JSONObject;

import BackendServer.Listings.ConstantsAndSimpleMethods;

/**This class represents Listings with listingType RideSharing*/
@Entity
@Table(name="RideSharing")
@PrimaryKeyJoinColumn(referencedColumnName="id")
public class RideSharing extends Offering {
	
	public void fillFields(JSONObject listingData, String creator) {
		super.fillFields(listingData, creator);
	}
	
	public JSONObject toJSON() {
		JSONObject json = super.toJSON();
		json.accumulate(ConstantsAndSimpleMethods.listingDataFieldNameListingType, ConstantsAndSimpleMethods.listingTypeNameRideSharing);
		return json;
	}

}
