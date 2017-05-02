package BackendServer.Listings.Entities;

import javax.persistence.Entity;
import javax.persistence.Inheritance;
import javax.persistence.InheritanceType;
import javax.persistence.PrimaryKeyJoinColumn;
import javax.persistence.Table;

import org.json.JSONObject;

/**This abstract class defines the Entity of Offering-listings*/
@Entity
@Table(name="Offering")
@PrimaryKeyJoinColumn(referencedColumnName="id")
@Inheritance( strategy = InheritanceType.JOINED )
public abstract class Offering extends Listing{
	
	/**Fills the Fields of this Object with the data in listingData and the creatorId*/
	public void fillFields(JSONObject listingData, int creatorId) {
		super.fillFields(listingData, creatorId);
	}
	
}
