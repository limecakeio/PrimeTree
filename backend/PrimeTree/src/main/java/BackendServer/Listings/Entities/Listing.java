package BackendServer.Listings.Entities;

import java.util.Date;
import java.util.List;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Inheritance;
import javax.persistence.InheritanceType;
import javax.persistence.Table;

import org.json.JSONArray;
import org.json.JSONObject;

import BackendServer.Exceptions.NoImageGallerySupportedException;
import BackendServer.Listings.Constants;
import BackendServer.Listings.SimpleMethods;

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
	private long creatorId;
	private String description;
	private Date expiryDate;
	private String location;
	private String title;
	private List<Comment> comments;
	private String type;
	private String kind;
	
	/**This method fills the Object-fields except id with the data in listingData and the creator*/
	public void fillFields(JSONObject listingData, long creatorId){
		this.setActive(true);
		this.setCreateDate(new Date((long) listingData.getDouble(Constants.listingDataFieldCreateDate)));
		this.setOwner(creatorId);
		this.setDescription(listingData.getString(Constants.listingDataFieldDescription));
		if(!listingData.isNull(Constants.listingDataFieldDeadLine)){
			this.setExpiryDate(new Date((long) listingData.getDouble(Constants.listingDataFieldDeadLine)));
		}
		this.setLocation(listingData.getString(Constants.listingDataFieldLocation));
		this.setTitle(listingData.getString(Constants.listingDataFieldTitle));
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

	public long getOwner() {
		return creatorId;
	}

	public void setOwner(long creatorId) {
		this.creatorId = creatorId;
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
		json.accumulate(Constants.listingDataFieldId, this.getListingId());
		json.accumulate(Constants.listingDataFieldActive, this.isActive());
		json.accumulate(Constants.listingDataFieldCreateDate, this.getCreateDate().getTime());
		json.accumulate(Constants.listingDataFieldCreator, this.getOwner());
		json.accumulate(Constants.listingDataFieldDescription, this.getDescription());
		json.accumulate(Constants.listingDataFieldDeadLine, this.getExpiryDate());
		json.accumulate(Constants.listingDataFieldLocation, this.getLocation());
		json.accumulate(Constants.listingDataFieldTitle, this.getTitle());
		json.accumulate(Constants.listingDataFieldListingType, this.getType());
		json.accumulate(Constants.listingDataFieldComments, this.commentsToJSONArray());
		json.accumulate(Constants.listingDataFieldDeadLine, this.getExpiryDate().getTime());
		return json;
	}
	
	private JSONArray commentsToJSONArray() {
		JSONArray commentsAsJSONArray=new JSONArray(comments.size());
		for(int index=0;index<comments.size();index++){
			commentsAsJSONArray.put(index, comments.get(index).toJSON());
		}
		return commentsAsJSONArray;
	}

	/**This method returns a json-String of this object*/
	public String toString(){
		return this.toJSON().toString();
	}
	
	/**This method checks whether the expiryDate is in the past*/
	public boolean isExpired(){
		return expiryDate!=null&&expiryDate.before(new Date());
	}
	
	public void addImageToGallery(String pathName) throws NoImageGallerySupportedException{
		throw new NoImageGallerySupportedException();
	}

	public int getImageGallerySize() throws NoImageGallerySupportedException {
		throw new NoImageGallerySupportedException();
	}

	public List<Comment> getComments() {
		return comments;
	}

	public void setComments(List<Comment> comments) {
		this.comments = comments;
	}
	
	public void addComment(Comment comment){
		this.comments.add(comment);
	}

	public int getPrice() {
		return 0;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public String getKind() {
		return kind;
	}

	public void setKind(String kind) {
		this.kind = kind;
	}

	public boolean matchFilterOptions(String[] location, boolean shallBeActive, int price_min, int price_max, String[] type, String kind) {
		boolean stillAMatch=true;
		if(!(location==null) && 
			!SimpleMethods.parseStringArrayToStringList(location)
			.contains(this.getLocation())){
				stillAMatch=false;
		}
		if(shallBeActive!=this.isActive()){
			stillAMatch=false;
		}
		if(price_min>this.getPrice()){
			stillAMatch=false;
		}
		if(price_max<this.getPrice()){
			stillAMatch=false;
		}
		if(!(type==null) && 
				!type.equals(this.getKind())){
				stillAMatch=false;
			}
		if(!(kind==null) && 
				!kind.equals(this.getType())){
				stillAMatch=false;
			}
		return stillAMatch;
	}

	public List<String> getImageGallery() throws NoImageGallerySupportedException {
		throw new NoImageGallerySupportedException();
	}

	public String makeNextGalleryFileName() throws NoImageGallerySupportedException {
		throw new NoImageGallerySupportedException();
	}

	public boolean matchFilterOptions(String query, String[] location, boolean b, int price_min, int price_max,
			String[] type, String kind) {
		return this.matchFilterOptions(location, b, price_min, price_max, type, kind) 
				&& (this.getTitle().contains(query) || this.getDescription().contains(query));
	}
}

