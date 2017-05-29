package BackendServer.Listings.Entities;

import java.util.LinkedList;
import java.util.List;

import javax.persistence.ElementCollection;
import javax.persistence.Entity;
import javax.persistence.PrimaryKeyJoinColumn;
import javax.persistence.Table;

import org.json.JSONObject;

import BackendServer.Exceptions.NoImageGallerySupportedException;
import BackendServer.Exceptions.WrongFormatException;
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
	private double price;
	
	public ServiceOffering(){
		this.setType(Constants.listingTypeNameServiceOffering);
		if(this.getImageGallery()==null){
			this.setImageGallery(new LinkedList<String>());
		}
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

	public double getPrice() {
		return price;
	}

	public void setPrice(double d) {
		this.price = d;
	}
	
	public void addImageToGallery(String pathName) throws NoImageGallerySupportedException{
		this.getImageGallery().add(pathName);
	}

	public int getImageGallerySize() throws NoImageGallerySupportedException {
		return this.getImageGallery().size();
	}
	
	/* (non-Javadoc)
	 * @see BackendServer.Listings.Entities.Offering#fillFields(org.json.JSONObject, long)
	 * listingData has one additional required field and two additional optional fields:
	 * price(required): The price for the service
	 * picture(optional): The public picture location
	 * imageGallery(optional): A JSONArray with strings of public image paths
	 */
	@Override
	public void fillFields(JSONObject listingData, long creator) throws WrongFormatException {
		super.fillFields(listingData, creator);
		if(listingData.isNull(Constants.listingDataFieldPrice)){
			throw new WrongFormatException("Missing required field(s)");
		}
		this.setPrice(listingData.getDouble(Constants.listingDataFieldPrice));
		if(!listingData.isNull(Constants.listingDataFieldPicture)){
			this.setPicture(listingData.getString(Constants.listingDataFieldPicture));
		}
		if(!listingData.isNull(Constants.listingDataFieldImageGallery)){
			this.setImageGallery(SimpleMethods.parseJSONArrayToStringList(listingData.getJSONArray(Constants.listingDataFieldImageGallery)) );
		}
	}

	/* (non-Javadoc)
	 * @see BackendServer.Listings.Entities.Listing#toJSON()
	 * listingData has three additional fields in the created JSONObject:
	 * price(required): The price for the service
	 * picture(optional): The public picture location
	 * imageGallery(optional): A JSONArray with strings of public image paths
	 */
	@Override
	public JSONObject toJSON() {
		JSONObject json = super.toJSON();
		json.accumulate(Constants.listingDataFieldPrice, this.getPrice());
		json.accumulate(Constants.listingDataFieldListingType, Constants.listingTypeNameServiceOffering);
		json.accumulate(Constants.listingDataFieldImageGallery, this.getImageGallery());
		json.accumulate(Constants.listingDataFieldPicture, this.getPicture());
		return json;
	}
	
}
