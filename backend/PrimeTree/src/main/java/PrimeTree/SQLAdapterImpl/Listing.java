package PrimeTree.SQLAdapterImpl;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import org.json.JSONObject;

/**This abstract Class represents a basic Listing as an Entity in the Database.
 * It contains only those fields, that all Listings must have.*/
@Entity
public abstract class Listing extends JSONObject{
	@Id
    @GeneratedValue(strategy=GenerationType.AUTO)
    private Integer listingId;
	private String title;
	private String description;
	private String[] pictures;
	private Date deadline;
	private int creatorId;
	private final String listingType;
	
	
	public Listing(JSONObject listingData, int creatorId){
		this.setTitle(listingData.getString(Constants.listingDataFieldNameTitle));
		this.setDescription(listingData.getString(Constants.listingDataFieldNameDescription));
		this.setPictures((String[]) listingData.get(Constants.listingDataFieldNamePictures));
		this.setDeadline((Date) listingData.get(Constants.listingDataFieldNameDeadLine));
		this.setCreatorId(creatorId);
		listingType=listingData.getString(Constants.listingDataFieldNameListingType);
	}

	public int getListingId() {
		return this.listingId;
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

	public String[] getPictures() {
		return pictures;
	}

	public void setPictures(String[] pictures) {
		this.pictures = pictures;
	}

	public Date getDeadline() {
		return deadline;
	}

	public void setDeadline(Date deadline) {
		this.deadline = deadline;
	}

	public int getCreatorId() {
		return creatorId;
	}

	public void setCreatorId(int creatorId) {
		this.creatorId = creatorId;
	}

	public String getListingType() {
		return listingType;
	}
}
