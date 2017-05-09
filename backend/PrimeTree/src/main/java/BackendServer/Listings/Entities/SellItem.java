package BackendServer.Listings.Entities;

import javax.persistence.Entity;
import javax.persistence.Inheritance;
import javax.persistence.InheritanceType;
import javax.persistence.PrimaryKeyJoinColumn;
import javax.persistence.Table;

import org.json.JSONObject;

import BackendServer.Listings.Constants;

/**This class represents Listings with listingType SellItem*/
@Entity
@Table(name="SellItem")
@PrimaryKeyJoinColumn(referencedColumnName="id")
public class SellItem extends Offering{
	private int price;
	
	/**This method fills the Object-fields except id with the data in listingData and the creatorId*/
	public void fillFields(JSONObject listingData, String creator) {
		super.fillFields(listingData, creator);
		this.setPrice(listingData.getInt(Constants.listingDataFieldNamePrice));
	}

	public float getPrice() {
		return price;
	}

	public void setPrice(int price) {
		this.price = price;
	}
	
}
