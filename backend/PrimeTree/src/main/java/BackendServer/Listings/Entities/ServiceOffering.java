package BackendServer.Listings.Entities;

import java.util.List;

import javax.persistence.ElementCollection;
import javax.persistence.Entity;
import javax.persistence.PrimaryKeyJoinColumn;
import javax.persistence.Table;

import org.json.JSONObject;

import BackendServer.Exceptions.NoImageGallerySupportedException;
import BackendServer.Listings.Constants;
import BackendServer.Listings.SimpleMethods;

/**This class represents Listings with listingType ServiceOffering*/
@Entity
@Table(name="ServiceOffering")
@PrimaryKeyJoinColumn(referencedColumnName="id")
public class ServiceOffering extends Offering {

	@ElementCollection
	private List<String> imageGallery;
	private String picture;
	private int price;
	
	public ServiceOffering(){
		this.setType(Constants.listingTypeNameServiceOffering);
	}
	
	public void fillFields(JSONObject listingData, long creator) {
		super.fillFields(listingData, creator);
		this.setPrice(listingData.getInt(Constants.listingDataFieldPrice));
		if(!listingData.isNull(Constants.listingDataFieldPicture)){
			this.setPicture(listingData.getString(Constants.listingDataFieldPicture));
		}
		if(!listingData.isNull(Constants.listingDataFieldImageGallery)){
			this.setImageGallery(SimpleMethods.parseJSONArrayToStringList(listingData.getJSONArray(Constants.listingDataFieldImageGallery)) );
		}
	}

	public JSONObject toJSON() {
		JSONObject json = super.toJSON();
		json.accumulate(Constants.listingDataFieldPrice, this.getPrice());
		json.accumulate(Constants.listingDataFieldListingType, Constants.listingTypeNameServiceOffering);
		json.accumulate(Constants.listingDataFieldImageGallery, this.getImageGallery());
		json.accumulate(Constants.listingDataFieldPicture, this.getPicture());
		return json;
	}

	public List<String> getImageGallery() {
		return imageGallery;
	}

	public void setImageGallery(List<String> imageGallery) {
		this.imageGallery = imageGallery;
	}

	public String getPicture() {
		return picture;
	}

	public void setPicture(String picture) {
		this.picture = picture;
	}

	public int getPrice() {
		return price;
	}

	public void setPrice(int price) {
		this.price = price;
	}
	
	public void addImageToGallery(String pathName) throws NoImageGallerySupportedException{
		this.getImageGallery().add(pathName);
	}

	public int getImageGallerySize() throws NoImageGallerySupportedException {
		return this.getImageGallery().size();
	}
	
}
