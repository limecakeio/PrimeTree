package BackendServer.ListingEntities;

import javax.persistence.Entity;
import javax.persistence.Inheritance;
import javax.persistence.InheritanceType;
import javax.persistence.PrimaryKeyJoinColumn;
import javax.persistence.Table;

import org.json.JSONObject;

@Entity
@Table(name="Offering")
@PrimaryKeyJoinColumn(referencedColumnName="id")
@Inheritance( strategy = InheritanceType.JOINED )
public abstract class Offering extends Listing{
	
	public void fillFields(JSONObject listingData, int creatorId) {
		super.fillFields(listingData, creatorId);
	}
	
}
