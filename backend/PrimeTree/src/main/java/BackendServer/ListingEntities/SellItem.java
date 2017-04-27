package BackendServer.ListingEntities;

import javax.persistence.Entity;
import javax.persistence.Inheritance;
import javax.persistence.InheritanceType;
import javax.persistence.PrimaryKeyJoinColumn;
import javax.persistence.Table;

import org.json.JSONObject;

import BackendServer.Constants;

@Entity
@Table(name="SellItem")
@PrimaryKeyJoinColumn(referencedColumnName="id")
@Inheritance( strategy = InheritanceType.JOINED )
public class SellItem extends Offering{
	private int price;
	
	public void fillFields(JSONObject listingData, int creatorId) {
		super.fillFields(listingData, creatorId);
		this.setPrice(listingData.getInt(Constants.listingDataFieldNamePrice));
	}

	public float getPrice() {
		return price;
	}

	public void setPrice(int price) {
		this.price = price;
	}
	
}
