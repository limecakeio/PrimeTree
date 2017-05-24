package BackendServer.Listings.ObjectControllers;

import java.util.Date;
import java.util.List;

import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;

import BackendServer.Exceptions.ListingNotFoundException;
import BackendServer.Exceptions.NoImageGallerySupportedException;
import BackendServer.Exceptions.WrongFormatException;
import BackendServer.Listings.Constants;
import BackendServer.Listings.Entities.Comment;
import BackendServer.Listings.Entities.Listing;
import BackendServer.Listings.Repositories.CommentRepository;

/**This abstract class is made so sub-classes can control the listings with their individual listingType.
 * Controlling means checking, whether a listingData-JSONObject matches the individual listingType as well 
 * as persisting and reading the listings with the individual type. */
public abstract class ListingObjectController<L extends Listing> {
	
	public String listingType;
	protected JpaRepository<L, Long> listingRepository;
	@Autowired
	protected CommentRepository commentRepository;
	
	/**This method checks whether the listingData-JSONObject contains data for the listingType of the sub-class.
	 * throws: WrongFormatException if the JSONObject contains no data about the listingType.*/
	public boolean isThisListingType(JSONObject listingData)throws WrongFormatException{
		try{
			return this.listingType.equals(listingData.getString(Constants.listingDataFieldListingType));
		}catch(JSONException e){
			throw new WrongFormatException("The listingType is missing.");
		}
	}
	
	/**This method creates and persists a new Listing-Object with the data of listingData and the creator.*/
	public long createAndPersistNewInstance(JSONObject listingData, long creatorId) throws WrongFormatException {
		try{
			
			L newInstance=createNew();
			newInstance.fillFields(listingData, creatorId);
		    
			listingRepository.save(newInstance);
			return newInstance.getListingId();
			
		}catch(JSONException e){
			throw new WrongFormatException(e.toString());
		}
	}

	/**This method returns a Listing with this class's listingType with the id id*/
	public L getListingById(long listingId) throws ListingNotFoundException {
		L foundItem = listingRepository.findOne(listingId);
		if(foundItem==null){
			throw new ListingNotFoundException("Listing with id " + listingId + " does not exist.");
		}else{
			return foundItem;
		}
	}

	public List<? extends Listing> getAll() {
		return listingRepository.findAll();
	}

	public void deleteListing(Long listingId) throws ListingNotFoundException {
		L foundItem = listingRepository.findOne(listingId);
		if(foundItem==null){
			throw new ListingNotFoundException("Listing with id " + listingId + " does not exist.");
		}else{
			listingRepository.delete(listingId);
		}
	}
	
	public void edit(long listingId, JSONObject listingData)
		throws ListingNotFoundException, WrongFormatException {
		L editedListing = this.getListingById(listingId);
		System.out.println("Before: " + editedListing.toString());
		editedListing.fillFields(listingData, editedListing.getOwner());
		System.out.println("After: " + editedListing.toString());
		listingRepository.save(editedListing);
	}

	protected abstract L createNew();

	public void addImagePath(long listingId, String filePath) throws NoImageGallerySupportedException, ListingNotFoundException {
		L editedListing = this.getListingById(listingId);
		editedListing.addImageToGallery(filePath);
		listingRepository.save(editedListing);
	}
	
	public void comment(JSONObject commentData, long authorId, long listingId) throws ListingNotFoundException{
		L commentedListing=this.getListingById(listingId);
		Comment newComment=new Comment();
		newComment.setAuthorId(authorId);
		newComment.setCreateDate(new Date(commentData.getLong(Constants.commentDataFieldDate)));
		newComment.setText(commentData.getString(Constants.commentDataFieldMessage));
		commentedListing.addComment(newComment);
		this.listingRepository.save(commentedListing);
		this.commentRepository.save(newComment);
	}

	public void deleteGalleryImage(long listingId, int galleryIndex) throws NoImageGallerySupportedException, ListingNotFoundException {
		L editedListing=this.getListingById(listingId);
		editedListing.getImageGallery().remove(galleryIndex);
		this.listingRepository.save(editedListing);
	}
	
}
