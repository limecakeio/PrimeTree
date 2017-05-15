package BackendServer.Listings.Entities;

import javax.persistence.Entity;
import javax.persistence.PrimaryKeyJoinColumn;
import javax.persistence.Table;

import org.json.JSONObject;

import BackendServer.Listings.ConstantsAndSimpleMethods;

/**This class represents Listings with listingType SellItem*/
@Entity
@Table(name="SellItem")
@PrimaryKeyJoinColumn(referencedColumnName="id")
public class SellItem extends Offering{
	private String ItemCondition;
	private int price;
	
	public void fillFields(JSONObject listingData, String creator) {
		super.fillFields(listingData, creator);
		this.setPrice(listingData.getInt(ConstantsAndSimpleMethods.listingDataFieldNamePrice));
	}

	public String getItemCondition() {
		return ItemCondition;
	}

	public void setItemCondition(String ItemCondition) {
		this.ItemCondition = ItemCondition;
	}

	public float getPrice() {
		return price;
	}

	public void setPrice(int price) {
		this.price = price;
	}
	
	public JSONObject toJSON() {
		JSONObject json = super.toJSON();
		json.accumulate(ConstantsAndSimpleMethods.listingDataFieldNameCondition, this.getItemCondition());
		json.accumulate(ConstantsAndSimpleMethods.listingDataFieldNamePrice, this.getPrice());
		json.accumulate(ConstantsAndSimpleMethods.listingDataFieldNameListingType, ConstantsAndSimpleMethods.listingTypeNameSellItem);
		return json;
	}
	
}
