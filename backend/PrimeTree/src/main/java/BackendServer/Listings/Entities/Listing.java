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

import BackendServer.Listings.ConstantsAndSimpleMethods;

/**This abstract class represents the common properties of all listings*/
@Entity
@Table(name="Listing")
@Inheritance( strategy = InheritanceType.JOINED )
public abstract class Listing {
	
	@Id
    @GeneratedValue(strategy=GenerationType.AUTO)
    private long id;
	private boolean active;
	private Date createDate;
	private String creator;
	private String description;
	private Date expiryDate;
	private String location;
	private String picture;
	private String title;
	
	/**This method fills the Object-fields except id with the data in listingData and the creator*/
	public void fillFields(JSONObject listingData, String creator){
		this.setActive(true);
		this.setCreateDate(new Date((long) listingData.getDouble(ConstantsAndSimpleMethods.listingDataFieldNameCreateDate)));
		this.setOwner(creator);
		this.setDescription(listingData.getString(ConstantsAndSimpleMethods.listingDataFieldNameDescription));
		if(!listingData.isNull(ConstantsAndSimpleMethods.listingDataFieldNameDeadLine)){
			this.setExpiryDate(new Date((long) listingData.getDouble(ConstantsAndSimpleMethods.listingDataFieldNameDeadLine)));
		}
		this.setLocation(listingData.getString(ConstantsAndSimpleMethods.listingDataFieldNameLocation));
		if(!listingData.isNull(ConstantsAndSimpleMethods.listingDataFieldNamePicture)){
			this.setPicture(listingData.getString(ConstantsAndSimpleMethods.listingDataFieldNamePicture));
		}
		this.setTitle(listingData.getString(ConstantsAndSimpleMethods.listingDataFieldNameTitle));
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

	public Date getCreateDate() {
		return createDate;
	}

	public void setCreateDate(Date createDate) {
		this.createDate = createDate;
	}

	public Date getExpiryDate() {
		return expiryDate;
	}

	public void setExpiryDate(Date expiryDate) {
		this.expiryDate =expiryDate;
	}

	public String getLocation() {
		return location;
	}

	public void setLocation(String location) {
		this.location = location;
	}

	public boolean isActive() {
		return active;
	}

	public void setActive(boolean active) {
		this.active = active;
	}
	
	/**This method returns a JSONObject with all fields of this class*/
	public JSONObject toJSON() {
		JSONObject json = new JSONObject();
		json.accumulate(ConstantsAndSimpleMethods.listingDataFieldNameId, this.getListingId());
		json.accumulate(ConstantsAndSimpleMethods.listingDataFieldNameActive, this.isActive());
		json.accumulate(ConstantsAndSimpleMethods.listingDataFieldNameCreateDate, this.getCreateDate().getTime());
		json.accumulate(ConstantsAndSimpleMethods.listingDataFieldNameCreator, this.getOwner());
		json.accumulate(ConstantsAndSimpleMethods.listingDataFieldNameDescription, this.getDescription());
		json.accumulate(ConstantsAndSimpleMethods.listingDataFieldNameDeadLine, this.getExpiryDate());
		json.accumulate(ConstantsAndSimpleMethods.listingDataFieldNameLocation, this.getLocation());
		json.accumulate(ConstantsAndSimpleMethods.listingDataFieldNamePicture, this.getPicture());
		json.accumulate(ConstantsAndSimpleMethods.listingDataFieldNameTitle, this.getTitle());
		return json;
	}
	
	/**This method returns a json-String of this object*/
	public String toString(){
		return this.toJSON().toString();
	}
	
	/**This method checks whether the expiryDate is in the past*/
	public boolean isExpired(){
		return expiryDate!=null&&expiryDate.before(new Date());
	}

	public String getPicture() {
		return picture;
	}

	public void setPicture(String picture) {
		this.picture = picture;
	}

	public boolean matchFilterOptions(JSONObject filter) {
		boolean stillAMatch=true;
		if(!filter.isNull(ConstantsAndSimpleMethods.filterOptionLocationArray) && 
			!ConstantsAndSimpleMethods.parseJSONArrayToStringCollection(
			filter.getJSONArray(ConstantsAndSimpleMethods.filterOptionLocationArray))
			.contains(this.getLocation())){
				stillAMatch=false;
		}
		if(!filter.isNull(ConstantsAndSimpleMethods.filterOptionActive) && 
			filter.getBoolean(ConstantsAndSimpleMethods.filterOptionActive)!=this.isActive()){
			stillAMatch=false;
		}
		return stillAMatch;
	}
}

