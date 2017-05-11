package BackendServer.Listings.Entities;

import javax.persistence.Entity;
import javax.persistence.Inheritance;
import javax.persistence.InheritanceType;
import javax.persistence.PrimaryKeyJoinColumn;
import javax.persistence.Table;

import org.json.JSONObject;

/**This abstract class represents listings that are Offerings*/
@Entity
@Table(name="Offering")
@PrimaryKeyJoinColumn(referencedColumnName="id")
//@Inheritance( strategy = InheritanceType.JOINED )
public abstract class Offering extends Listing{
	
	/**This method fills the Object-fields except id with the data in listingData and the creatorId*/
	public void fillFields(JSONObject listingData, String creator) {
		super.fillFields(listingData, creator);
	}
	
}
