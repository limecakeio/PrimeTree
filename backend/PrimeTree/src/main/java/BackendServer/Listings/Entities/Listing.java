package BackendServer.Listings.Entities;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Inheritance;
import javax.persistence.InheritanceType;
import javax.persistence.Table;

import org.json.JSONObject;

import BackendServer.Listings.Constants;

/**This abstract class represents all listings*/
@Entity
@Table(name="Listing")
@Inheritance( strategy = InheritanceType.JOINED )
public abstract class Listing {
	@Id
    @GeneratedValue(strategy=GenerationType.AUTO)
    private long id;
	private double createDate;
	private String creator;
	private String description;
	private double expiryDate;
	private String title;
	
	/**This method fills the Object-fields except id with the data in listingData and the creatorId*/
	public void fillFields(JSONObject listingData, String creator){
		this.setCreateDate(listingData.getDouble(Constants.listingDataFieldNameCreateDate));
		this.setOwner(creator);
		this.setDescription(listingData.getString(Constants.listingDataFieldNameDescription));
		this.setExpiryDate(listingData.getDouble(Constants.listingDataFieldNameDeadLine));
		this.setTitle(listingData.getString(Constants.listingDataFieldNameTitle));
	}

	public long getListingId() {
		return this.id;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getOwner() {
		return creator;
	}

	public void setOwner(String owner) {
		this.creator = owner;
	}

	public double getCreateDate() {
		return createDate;
	}

	public void setCreateDate(double createDate) {
		this.createDate = createDate;
	}

	public double getExpiryDate() {
		return expiryDate;
	}

	public void setExpiryDate(double expiryDate) {
		this.expiryDate = expiryDate;
	}
    
}

