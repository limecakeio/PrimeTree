package BackendServer.Listings.Entities;

import java.util.LinkedList;
import java.util.List;

import javax.persistence.ElementCollection;
import javax.persistence.Entity;
import javax.persistence.ManyToOne;
import javax.persistence.PrimaryKeyJoinColumn;
import javax.persistence.Table;

import org.json.JSONObject;

import BackendServer.Exceptions.NoImageGallerySupportedException;
import BackendServer.Exceptions.WrongFormatException;
import BackendServer.Listings.Constants;
import BackendServer.Listings.SimpleMethods;

/**This class represents Listings with listingType SellItem*/
@Entity
@Table(name="SellItem")
@PrimaryKeyJoinColumn(referencedColumnName="id")
public class SellItem extends Offering{
	private double price;
	private String picture;
	@ElementCollection
	private List<String> imageGallery;
	private String itemCondition;
	
	public SellItem(){
		this.setType(Constants.listingTypeNameSellItem);
		if(this.getImageGallery()==null){
			this.setImageGallery(new LinkedList<String>());
		}
	}
	
	public String getPicture() {
		return picture;
	}

	@Override
	public void setPicture(String picture) {
		this.picture = picture;
	}

	public double getPrice() {
		return price;
	}

	public void setPrice(double d) {
		this.price = d;
	}

	public List<String> getImageGallery() {
		return imageGallery;
	}

	public void setImageGallery(List<String> imageGallery) {
		this.imageGallery = imageGallery;
	}
	
	public void addImageToGallery(String pathName) throws NoImageGallerySupportedException{
		this.getImageGallery().add(pathName);
	}

	public int getImageGallerySize() throws NoImageGallerySupportedException {
		return this.getImageGallery().size();
	}

	/* (non-Javadoc)
	 * @see BackendServer.Listings.Entities.Offering#fillFields(org.json.JSONObject, long)
	 * listingData has otwo additional required fields and two additional optional fields:
	 * price(required): The price for the service
	 * condition(required): The condition of the item
	 * picture(optional): The public picture location
	 * imageGallery(optional): A JSONArray with strings of public image paths
	 */
	@Override
	public void fillFields(JSONObject listingData, long creator) throws WrongFormatException{
		super.fillFields(listingData, creator);
		if(!Constants.allItemConditions.contains(listingData.getString(Constants.listingDataFieldCondition))){
			throw new WrongFormatException("This condition does not exist");
		}
		this.setPrice(listingData.getDouble(Constants.listingDataFieldPrice));
		this.setItemCondition(listingData.getString(Constants.listingDataFieldCondition));
	}
	
	/* (non-Javadoc)
	 * @see BackendServer.Listings.Entities.Listing#toJSON()
	 * listingData has four additional fields in the created JSONObject:
	 * price(required): The price for the service
	 * condition(required): The condition of the item
	 * picture(optional): The public picture location
	 * imageGallery(optional): A JSONArray with strings of public image paths
	 */
	public JSONObject toJSON() {
		JSONObject json = super.toJSON();
		json.accumulate(Constants.listingDataFieldCondition, this.getItemCondition());
		json.accumulate(Constants.listingDataFieldPrice, this.getPrice());
		json.accumulate(Constants.listingDataFieldPicture, this.getPicture());
		json.accumulate(Constants.listingDataFieldImageGallery, this.getImageGallery());
		return json;
	}

	public String makeNextGalleryFileName() throws NoImageGallerySupportedException {
		if(this.imageGallery.size()==0){
			return "0";
		}else{
			String lastPath=imageGallery.get(imageGallery.size()-1);
			int lastIndexOfLastFilename=lastPath.lastIndexOf('.')-1;
			int firstIndexOfLastFilename=lastPath.lastIndexOf('.', lastIndexOfLastFilename);
			int lastFileNameAsNumber=SimpleMethods.parseStringToInt(lastPath.substring(firstIndexOfLastFilename, lastIndexOfLastFilename));
			return (lastFileNameAsNumber+1)+"";
		}
	}

	public String getItemCondition() {
		return itemCondition;
	}

	public void setItemCondition(String itemCondition) {
		this.itemCondition = itemCondition;
	}
	
}
