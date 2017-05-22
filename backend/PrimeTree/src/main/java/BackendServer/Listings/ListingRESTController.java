package BackendServer.Listings;

import java.io.IOException;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import BackendServer.Exceptions.ListingNotFoundException;
import BackendServer.Exceptions.NoImageGallerySupportedException;
import BackendServer.Exceptions.UserNotFoundException;
import BackendServer.Exceptions.WrongFormatException;
import BackendServer.Listings.Entities.Listing;
import BackendServer.User.Service.UserManager;

/**
 * @author Florian Kutz
 *
 */
@Controller
@RequestMapping(value = "")
public class ListingRESTController {
	
	@Autowired
	PersistenceAdapter persistenceAdapter;
	
	@Autowired
	UserManager userManager;
	
	@CrossOrigin
	@RequestMapping(value = "listing", method=RequestMethod.POST)
    public @ResponseBody String createListing(@RequestBody String body, HttpServletRequest request, HttpServletResponse response){
    	Authentication authenticationObject=SecurityContextHolder.getContext().getAuthentication();
		System.out.println("create-Aufruf von " + authenticationObject.getName());
		JSONObject newListingData = new JSONObject(body);
		System.out.println(newListingData);
		JSONObject result=new JSONObject();
		result.put("status", "OK");
		try {
			int newId = persistenceAdapter.persistNewListing(newListingData, userManager.loadUserByUsername(authenticationObject.getName()).getId());
			result.put("id", newId);
		} catch (WrongFormatException thrownException) {
			response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
		}
		return result.toString();
    }

	@CrossOrigin
	@RequestMapping(value = "listing/{id}", method = RequestMethod.GET)
	@PreAuthorize("hasPermission(#id, 'listing', 'reader') or hasAuthority('ROLE_ADMIN')")
	public @ResponseBody String getListing(@PathVariable(value="id") int listingId, HttpServletRequest request, HttpServletResponse response) throws IOException{
		JSONObject result=new JSONObject();
		try {
			Listing foundListing=persistenceAdapter.getListingById(listingId);
			result=foundListing.toJSON();
			this.addUserImagePropertyIntoAllComments(new JSONArray().put(result));
			return result.toString();
		} catch (ListingNotFoundException thrownException) {
			response.setStatus(HttpServletResponse.SC_NOT_FOUND);
			result.put("status", "NOT_OK");
			result.put("message", thrownException.getMessage());
			return result.toString();
		}
	}
	
	@CrossOrigin
	@RequestMapping(value = "listing/{id}", method = RequestMethod.POST)
	@PreAuthorize("hasPermission(#id, 'listing', 'owner') or hasAuthority('ROLE_ADMIN')")
	public @ResponseBody void editListing(@RequestBody final String body, @PathVariable(value="id") final int listingId, HttpServletRequest request, HttpServletResponse response) throws IOException{
		try {
			persistenceAdapter.edit(listingId, new JSONObject(body));
		} catch (ListingNotFoundException e) {
			response.setStatus(HttpServletResponse.SC_NOT_FOUND);
		} catch (WrongFormatException e) {
			response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
		}
	}
	
	@CrossOrigin
	@RequestMapping(value = "listing/delete/{id}", method=RequestMethod.DELETE)
	@PreAuthorize("hasPermission(#id, 'listing', 'owner') or hasAuthority('ROLE_ADMIN')")
    public @ResponseBody void delete(@PathVariable(value="id") final int listingId, HttpServletRequest request, HttpServletResponse response) throws IOException {
		System.out.println("delete() aufgerufen");
		try {
			persistenceAdapter.deleteListingById(listingId);
		} catch (ListingNotFoundException e) {
			response.setStatus(HttpServletResponse.SC_NOT_FOUND);
		}
    }
	
	@CrossOrigin
	@RequestMapping(value = "listing/{id}/activate", method=RequestMethod.POST)
	@PreAuthorize("hasPermission(#id, 'listing', 'owner') or hasAuthority('ROLE_ADMIN')")
    public @ResponseBody void activateListing(@PathVariable(value="id") final int listingId, HttpServletRequest request, HttpServletResponse response) throws IOException{
		try {
			persistenceAdapter.edit(listingId, persistenceAdapter.getListingById(listingId).toJSON().accumulate(Constants.listingDataFieldActive, true));
		} catch (ListingNotFoundException e) {
			response.setStatus(HttpServletResponse.SC_NOT_FOUND);
		} catch (WrongFormatException e) {
			System.out.println("Uncommon error while activating a listing.");
		}
	}
	
	@CrossOrigin
	@RequestMapping(value = "listing/{id}/deactivate", method=RequestMethod.POST)
	@PreAuthorize("hasPermission(#id,'listing', 'owner') or hasAuthority('ROLE_ADMIN')")
    public @ResponseBody void deactivateListing(@PathVariable(value="id") final int listingId, HttpServletRequest request, HttpServletResponse response) throws IOException{
		try {
			persistenceAdapter.edit(listingId, persistenceAdapter.getListingById(listingId).toJSON().accumulate(Constants.listingDataFieldActive, false));
		} catch (ListingNotFoundException e) {
			response.setStatus(HttpServletResponse.SC_NOT_FOUND);
		} catch (WrongFormatException e) {
			System.out.println("Uncommon error while deactivating a listing.");
		}
	}
	
	@CrossOrigin
	@RequestMapping(value = "listing/{id}/comment", method = RequestMethod.POST)
	@PreAuthorize("hasPermission(#id, 'listing', 'reader') or hasAuthority('ROLE_ADMIN')")
	public @ResponseBody void postComment(@PathVariable(value="id") int listingId, @RequestBody String body, HttpServletRequest request, HttpServletResponse response) throws IOException{
		long authorId=userManager.loadUserByUsername(SecurityContextHolder.getContext().getAuthentication().getName()).getId();
		try {
			persistenceAdapter.comment(new JSONObject(body), authorId, listingId);
		} catch (ListingNotFoundException e) {
			response.setStatus(HttpServletResponse.SC_NOT_FOUND);
		}
	}

	@CrossOrigin
	@RequestMapping(value = "listing/{listingId}/comment/{commentId}", method = RequestMethod.DELETE)
	@PreAuthorize("hasPermission(#commentId, 'comment', 'author') or hasAuthority('ROLE_ADMIN')")
	public @ResponseBody void deleteComment(@PathVariable(value="listingId") int commentId, @PathVariable(value="commentId") int listingId, @RequestBody String body, HttpServletRequest request, HttpServletResponse response) throws IOException{
		long authorId=userManager.loadUserByUsername(SecurityContextHolder.getContext().getAuthentication().getName()).getId();
		persistenceAdapter.deleteComment(commentId);
	}
	
	@CrossOrigin
	@RequestMapping(value= "listing/upload/main-image/{id}", method=RequestMethod.PUT)
	@PreAuthorize("hasPermission(#id, 'listing', 'owner') or hasAuthority('ROLE_ADMIN')")
	public @ResponseBody void listingMainImageUpload(@PathVariable(value="id") final int listingId, 
			HttpServletRequest request, HttpServletResponse response, @RequestParam("file") final MultipartFile file){
				try {
					persistenceAdapter.uploadImage(file.getBytes(), listingId, file.getOriginalFilename());
				} catch (IOException e) {
					response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
				} catch (ListingNotFoundException e) {
					response.setStatus(HttpServletResponse.SC_NOT_FOUND);
				}
	}
	
	@CrossOrigin
	@RequestMapping(value= "listing/upload/gallery/{id}", method=RequestMethod.PUT)
	@PreAuthorize("hasPermission(#id, 'listing', 'owner') or hasAuthority('ROLE_ADMIN')")
	public @ResponseBody void listingGalleryUpload(@PathVariable(value="id") final int listingId, 
	HttpServletRequest request, HttpServletResponse response, @RequestParam("file") final MultipartFile file){
		try {
			persistenceAdapter.addImageToGallery(file.getBytes(), listingId,file.getOriginalFilename());
		} catch (IOException e) {
			response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
		} catch (ListingNotFoundException e) {
			response.setStatus(HttpServletResponse.SC_NOT_FOUND);
		} catch (NoImageGallerySupportedException e) {
			response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
		}
	}
	
	@CrossOrigin
	@RequestMapping(value= "listing/upload/gallery/{listingId}/{galleryIndex}", method=RequestMethod.PUT)
	@PreAuthorize("hasPermission(#id, 'listing', 'owner') or hasAuthority('ROLE_ADMIN')")
	public @ResponseBody void listingGalleryChange(@PathVariable(value="listingId") final int listingId, @PathVariable(value="galleryIndex") final int galleryIndex, 
	HttpServletRequest request, HttpServletResponse response, @RequestParam("file") final MultipartFile file){
		try {
			persistenceAdapter.changeImageInGallery(file.getBytes(), listingId, galleryIndex, file.getOriginalFilename());
		} catch (IOException e) {
			response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
		} catch (ListingNotFoundException e) {
			response.setStatus(HttpServletResponse.SC_NOT_FOUND);
		} catch (NoImageGallerySupportedException e) {
			response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
		}
	}
	
	@CrossOrigin
	@RequestMapping(value= "listing/upload/gallery/{listingId}/{galleryIndex}", method=RequestMethod.DELETE)
	@PreAuthorize("hasPermission(#id, 'listing', 'owner') or hasAuthority('ADMIN')")
	public @ResponseBody void listingGalleryDelete(@PathVariable(value="listingId") final int listingId, @PathVariable(value="galleryIndex") final int galleryIndex, 
	HttpServletRequest request, HttpServletResponse response){
		try {
			persistenceAdapter.deleteImageInGallery(listingId, galleryIndex);
		} catch (ListingNotFoundException e) {
			response.setStatus(HttpServletResponse.SC_NOT_FOUND);
		} catch (NoImageGallerySupportedException e) {
			response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
		}
	}
	
	@CrossOrigin
	@RequestMapping(value= "listings/search", method=RequestMethod.GET)
	public @ResponseBody String getLstingsBySearch(@RequestParam("query")String query,@RequestParam("page") int page, @RequestParam("location") String[] location, @RequestParam("price_min") int price_min, @RequestParam("price_max") int price_max, @RequestParam("type") String[] type, @RequestParam("kind") String kind, @RequestParam("sort") String sort, HttpServletRequest request, HttpServletResponse response){
		if(query.length()<2){
			response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
			return "";
			}
		ListingSearchStatistics statistics=new ListingSearchStatistics();
		Listing[] resultListings=persistenceAdapter.getListingsBySearch(query, page, location, true, price_min, price_max, type, kind, sort, statistics);
		JSONObject result=this.createPage(resultListings, statistics);
		return result.toString();
	}
	
	@CrossOrigin
	@RequestMapping(value = "/listings", method = RequestMethod.GET)
	@PreAuthorize("hasAuthority('ADMIN')")
	public @ResponseBody String getllListings(@RequestParam("page") int page, @RequestParam("location") String[] location, @RequestParam("price_min") int price_min, @RequestParam("price_max") int price_max, @RequestParam("type") String[] type, @RequestParam("kind") String kind, @RequestParam("sort") String sort, HttpServletRequest request, HttpServletResponse response){
		ListingSearchStatistics statistics=new ListingSearchStatistics();
		Listing[] resultListings=persistenceAdapter.getListingsFiltered(page, location, true, price_min, price_max, type, kind, sort, statistics);
		JSONObject result=this.createPage(resultListings, statistics);
		return result.toString();
	}
	
	@CrossOrigin
	@RequestMapping(value = "listings/active", method = RequestMethod.GET)
	public @ResponseBody String getActiveListings(@RequestParam("page") int page, @RequestParam("location") String[] location, @RequestParam("price_min") int price_min, @RequestParam("price_max") int price_max, @RequestParam("type") String[] type, @RequestParam("kind") String kind, @RequestParam("sort") String sort, HttpServletRequest request, HttpServletResponse response){
		ListingSearchStatistics statistics=new ListingSearchStatistics();
		Listing[] resultListings=persistenceAdapter.getListingsFiltered(page, location, true, price_min, price_max, type, kind, sort, statistics);
		JSONObject result=this.createPage(resultListings, statistics);
		return result.toString();
	}
	
	@CrossOrigin
	@RequestMapping(value = "listings/inactive", method = RequestMethod.GET)
	public @ResponseBody String getInactiveListings(@RequestParam("page") int page, @RequestParam("location") String[] location, @RequestParam("price_min") int price_min, @RequestParam("price_max") int price_max, @RequestParam("type") String[] type, @RequestParam("kind") String kind, @RequestParam("sort") String sort, HttpServletRequest request, HttpServletResponse response){
		ListingSearchStatistics statistics=new ListingSearchStatistics();
		Listing[] resultListings=persistenceAdapter.getListingsFiltered(page, location, false, price_min, price_max, type, kind, sort, statistics);
		JSONObject result=this.createPage(resultListings, statistics);
		return result.toString();
	}
	
	@CrossOrigin
	@RequestMapping(value = "listings/own", method = RequestMethod.GET)
	public @ResponseBody String getOwnListings(HttpServletRequest request, HttpServletResponse response){
		Listing[] resultListings=persistenceAdapter.getListingsFromUser(userManager.loadUserByUsername(SecurityContextHolder.getContext().getAuthentication().getName()).getId());
		JSONObject result=new JSONObject();
		result.put(Constants.listingSearchResultFieldListings, SimpleMethods.parseListingArrayToJSONArray(resultListings));
		this.addUserImagePropertyIntoAllComments(result.getJSONArray("listings"));
		return result.toString();
	}
	
	@CrossOrigin
	@RequestMapping(value = "listings/getmultiple", method = RequestMethod.GET)
	public @ResponseBody String getListingArrayByIdArray(@RequestParam int[] listingIds, HttpServletRequest request,HttpServletResponse response){
		System.out.println("getmultiple- Aufruf");
		JSONObject result=new JSONObject();
		try {
			result.put("listings", persistenceAdapter.getListingArrayByIdArray(listingIds));
			result.put("status", "OK");
		} catch (ListingNotFoundException thrownException) {
			response.setStatus(HttpServletResponse.SC_NOT_FOUND);
			result.put("status", "NOT_OK");
			result.put("message", thrownException.getMessage());
		}
		return result.toString();
	}

	private JSONObject createPage(Listing[] resultListings, ListingSearchStatistics statistics) {
		JSONObject page=new JSONObject();
		page.put(Constants.listingSearchResultFieldListings, SimpleMethods.parseListingArrayToJSONArray(resultListings));
		this.addUserImagePropertyIntoAllComments(page.getJSONArray("listings"));
		page.put(Constants.listingSearchResultFieldPrice_Min, statistics.getPrice_min());
		page.put(Constants.listingSearchResultFieldPrice_Max, statistics.getPrice_max());
		page.put(Constants.listingSearchResultFieldCount, statistics.getCount());
		page.put(Constants.listingSearchResultFieldPages, statistics.getPages());
		return page;
	}

	private void addUserImagePropertyIntoAllComments(JSONArray listingArray) {
		for(int listingArrayIndex=0;listingArrayIndex<listingArray.length();listingArrayIndex++){
			JSONArray commentsArray=listingArray.getJSONObject(listingArrayIndex).getJSONArray(Constants.listingDataFieldComments);
			for(int commentsArrayIndex=0;commentsArrayIndex<commentsArray.length();commentsArrayIndex++){
				JSONObject editedComment=commentsArray.getJSONObject(commentsArrayIndex);
					try {
						editedComment.accumulate(Constants.commentDataFieldUserImage, 
								this.userManager.loadUserById(editedComment.getInt(Constants.commentDataFieldUserId)).getPicture());
					} catch (UserNotFoundException e) {
						System.out.println("The user with id " + editedComment.getInt(Constants.commentDataFieldUserId) + " doesn' exist anymore");
					}
			}
		}
		
	}
}
