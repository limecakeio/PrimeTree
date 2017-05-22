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

/**This class represents Listings with listingType SellItem*/
@Entity
@Table(name="SellItem")
@PrimaryKeyJoinColumn(referencedColumnName="id")
public class SellItem extends Offering{
	private String ItemCondition;
	private int price;
	private String picture;
	@ElementCollection
	private List<String> imageGallery;
	
	public SellItem(){
		this.setType(Constants.listingTypeNameSellItem);
	}

	public void fillFields(JSONObject listingData, long creator) {
		super.fillFields(listingData, creator);
		this.setPrice(listingData.getInt(Constants.listingDataFieldPrice));
		this.setItemCondition(listingData.getString(Constants.listingDataFieldCondition));
		if(!listingData.isNull(Constants.listingDataFieldPicture)){
			this.setPicture(listingData.getString(Constants.listingDataFieldPicture));
		}
		if(!listingData.isNull(Constants.listingDataFieldImageGallery)){
			this.setImageGallery(SimpleMethods.parseJSONArrayToStringList(listingData.getJSONArray(Constants.listingDataFieldImageGallery)) );
		}
	}
	
	public String getPicture() {
		return picture;
	}

	public void setPicture(String picture) {
		this.picture = picture;
	}

	public String getItemCondition() {
		return ItemCondition;
	}

	public void setItemCondition(String ItemCondition) {
		this.ItemCondition = ItemCondition;
	}

	public int getPrice() {
		return price;
	}

	public void setPrice(int price) {
		this.price = price;
	}
	
	public JSONObject toJSON() {
		JSONObject json = super.toJSON();
		json.accumulate(Constants.listingDataFieldCondition, this.getItemCondition());
		json.accumulate(Constants.listingDataFieldPrice, this.getPrice());
		json.accumulate(Constants.listingDataFieldListingType, Constants.listingTypeNameSellItem);
		json.accumulate(Constants.listingDataFieldPicture, this.getPicture());
		json.accumulate(Constants.listingDataFieldImageGallery, this.getImageGallery());
		return json;
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

	public String makeNextGalleryFileName() throws NoImageGallerySupportedException {
		if(this.imageGallery.size()==0){
			return "0";
		}else if(this.imageGallery.size()==10){
			throw new NoImageGallerySupportedException();
		}else{
			String lastPath=imageGallery.get(imageGallery.size()-1);
			int lastIndexOfLastFilename=lastPath.lastIndexOf('.')-1;
			int firstIndexOfLastFilename=lastPath.lastIndexOf('.', lastIndexOfLastFilename);
			int lastFileNameAsNumber=SimpleMethods.parseStringToInt(lastPath.substring(firstIndexOfLastFilename, lastIndexOfLastFilename));
			return (lastFileNameAsNumber+1)+"";
		}
	}
	
}
