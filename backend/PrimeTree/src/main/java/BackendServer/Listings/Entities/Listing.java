package BackendServer.Listings.Entities;

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
	private String title;
	private String description;
	private String owner;
	
	/**This method fills the Object-fields except id with the data in listingData and the creatorId*/
	public void fillFields(JSONObject listingData, String creator){
		this.setTitle(listingData.getString(Constants.listingDataFieldNameTitle));
		this.setDescription(listingData.getString(Constants.listingDataFieldNameDescription));
		this.setOwner(creator);
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
		return owner;
	}

	public void setOwner(String owner) {
		this.owner = owner;
	}
    
}

