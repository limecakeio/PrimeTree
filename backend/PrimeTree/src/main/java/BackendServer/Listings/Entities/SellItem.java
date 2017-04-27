package BackendServer.Listings.Entities;

import javax.persistence.Entity;
import javax.persistence.Inheritance;
import javax.persistence.InheritanceType;
import javax.persistence.PrimaryKeyJoinColumn;
import javax.persistence.Table;

import org.json.JSONObject;

import BackendServer.Listings.Constants;

@Entity
@Table(name="SellItem")
@PrimaryKeyJoinColumn(referencedColumnName="id")
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
