package BackendServer.Listings.Entities;

import javax.persistence.Entity;
import javax.persistence.PrimaryKeyJoinColumn;
import javax.persistence.Table;

import org.json.JSONObject;

import BackendServer.Listings.ConstantsAndSimpleMethods;

/**This class represents Listings with listingType ServiceOffering*/
@Entity
@Table(name="ServiceOffering")
@PrimaryKeyJoinColumn(referencedColumnName="id")
public class ServiceOffering extends Offering {
	
	public void fillFields(JSONObject listingData, String creator) {
		super.fillFields(listingData, creator);
	}

	public JSONObject toJSON() {
		JSONObject json = super.toJSON();
		json.accumulate(ConstantsAndSimpleMethods.listingDataFieldNameListingType, ConstantsAndSimpleMethods.listingTypeNameServiceOffering);
		return json;
	}
	
}
