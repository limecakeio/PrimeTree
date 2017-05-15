package BackendServer.Listings;

import java.io.IOException;
import java.io.InputStream;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
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

import BackendServer.Exceptions.ListingNotFoundException;
import BackendServer.Exceptions.WrongFormatException;
import BackendServer.Listings.Entities.Listing;

@Controller
@RequestMapping(value = "")
public class ListingRESTController {
	
	@Autowired
	PersistenceAdapter persistenceAdapter;
	
	
	/**
	 * this method creates a listing in a Database
	 * @param the body contains all data for the new listing
	 * @return A JSONObject with id of the new listing
	 */
	@CrossOrigin
	@RequestMapping(value = "listing/create", method=RequestMethod.POST)
    public @ResponseBody String createListing(@RequestBody String body, HttpServletRequest request, HttpServletResponse response){
    	Authentication authenticationObject=SecurityContextHolder.getContext().getAuthentication();
		System.out.println("create-Aufruf von " + SecurityContextHolder.getContext().getAuthentication().getName());
		JSONObject newListingData = new JSONObject(body);
		System.out.println(newListingData);
		JSONObject result=new JSONObject();
		try {
			int newId = persistenceAdapter.persistNewListing(newListingData, authenticationObject.getName());
			result.put("id", newId);
		} catch (WrongFormatException thrownException) {
			result.put("status", HttpServletResponse.SC_BAD_REQUEST);
			result.put("message", thrownException.getMessage());
		}
		return result.toString();
    }
	
	@CrossOrigin
	@RequestMapping(value= "listing/upload/mainImage/{id}", method=RequestMethod.PUT)
	public String listingMainImageUpload(@PathVariable(value="id") int listingId, HttpServletRequest request, HttpServletResponse response) throws IOException{
		System.out.println("delete() aufgerufen");
		JSONObject result=new JSONObject();
		try {
			if(persistenceAdapter.isOwnerOfListing(listingId, SecurityContextHolder.getContext().getAuthentication().getName())){
				InputStream inputStream=request.getInputStream();
				byte[] imageData=new byte[inputStream.available()];
				inputStream.read(imageData);
				persistenceAdapter.uploadImage(imageData, listingId);
				result.put("status", HttpServletResponse.SC_OK);
			}else{
				result.put("status", HttpServletResponse.SC_FORBIDDEN);
				result.put("message", "Only the Owner of this listing can put a image for this listing");
			}
		} catch (ListingNotFoundException thrownException) {
			result.put("status", HttpServletResponse.SC_NOT_FOUND);
			result.put("message", thrownException.getMessage());
		}
		return result.toString();
	}
	
	@CrossOrigin
	@RequestMapping(value = "listings/active", method = RequestMethod.GET)
	public @ResponseBody String getActiveListings(HttpServletRequest request, HttpServletResponse response){
		System.out.println("getall- Aufruf");
//		request.getParameter("location");
//		request.getParameter("priceFrom");
//		request.getParameter("priceTo");
//		request.getParameter("sortBy");
		JSONObject result=new JSONObject();
		result.put("ids", persistenceAdapter.getAllActiveListings());
		return result.toString();
	}
	
	@CrossOrigin
	@RequestMapping(value = "listing/{id}", method = RequestMethod.GET)
	public @ResponseBody String getListing(@PathVariable(value="id") int listingId, HttpServletRequest request, HttpServletResponse response) throws IOException{
		System.out.println("getone-Aufruf mit listingId: " + listingId);
		try {
			return persistenceAdapter.getListingById(listingId).toString(); 
		} catch (ListingNotFoundException thrownException) {
			JSONObject result=new JSONObject();
			result.put("status", HttpServletResponse.SC_NOT_FOUND);
			result.put("message", thrownException.getMessage());
			return result.toString();
		}
	}
	
	@CrossOrigin
	@RequestMapping(value = "listing/{id}", method = RequestMethod.POST)
	public @ResponseBody String editListing(@PathVariable(value="id") int listingId, HttpServletRequest request, HttpServletResponse response) throws IOException{
		JSONObject result=new JSONObject();
		try {
			if(persistenceAdapter.isOwnerOfListing(listingId, SecurityContextHolder.getContext().getAuthentication().getName())){
				//Funktion einfügen!!!
			}else{
				result.put("status", HttpServletResponse.SC_FORBIDDEN);
				result.put("message", "Only the Owner of this listing can put a image for this listing");
			}
		} catch (ListingNotFoundException thrownException) {
			result.put("status", HttpServletResponse.SC_NOT_FOUND);
			result.put("message", thrownException.getMessage());
		}
		return result.toString();
	}
	
	@CrossOrigin
	@RequestMapping(value = "listing/delete/{id}", method=RequestMethod.DELETE)
    public @ResponseBody String delete(@PathVariable(value="id") int listingId, HttpServletRequest request, HttpServletResponse response) throws IOException {
		System.out.println("delete() aufgerufen");
		JSONObject result=new JSONObject();
		try {
			if(persistenceAdapter.isOwnerOfListing(listingId, SecurityContextHolder.getContext().getAuthentication().getName())){
				persistenceAdapter.deleteListingById(listingId);
			}else{
				result.put("status", HttpServletResponse.SC_FORBIDDEN);
				result.put("message", "Only the Owner of this listing can delete the listing");
			}
		}catch(ListingNotFoundException thrownException) {
			result.put("status", HttpServletResponse.SC_NOT_FOUND);
			result.put("message", thrownException.getMessage());
		}
		System.out.println(result.toString());
		return result.toString();
    }
	
	@CrossOrigin
	@RequestMapping(value = "listing/{id}/activate", method=RequestMethod.POST)
    public @ResponseBody String activateListing(@PathVariable(value="id") int listingId, HttpServletRequest request, HttpServletResponse response) throws IOException{
		JSONObject result=new JSONObject();
		try {
			if(persistenceAdapter.isOwnerOfListing(listingId, SecurityContextHolder.getContext().getAuthentication().getName())){
				//Funktion einfügen!!!
			}else{
				result.put("status", HttpServletResponse.SC_FORBIDDEN);
				result.put("message", "Only the Owner of this listing can activate the listing");
			}
		}catch(ListingNotFoundException thrownException) {
			result.put("status", HttpServletResponse.SC_NOT_FOUND);
			result.put("message", thrownException.getMessage());
		}
		return result.toString();
	}
	
	@CrossOrigin
	@RequestMapping(value = "listing/{id}/deactivate", method=RequestMethod.POST)
    public @ResponseBody String deactivateListing(@PathVariable(value="id") int listingId, HttpServletRequest request, HttpServletResponse response) throws IOException{
		JSONObject result=new JSONObject();
		try {
			if(persistenceAdapter.isOwnerOfListing(listingId, SecurityContextHolder.getContext().getAuthentication().getName())){
				//Funktion einfügen!!!
			}else{
				result.put("status", HttpServletResponse.SC_FORBIDDEN);
				result.put("message", "Only the Owner of this listing can deactivate the listing");
			}
		}catch(ListingNotFoundException thrownException) {
			result.put("status", HttpServletResponse.SC_NOT_FOUND);
			result.put("message", thrownException.getMessage());
		}
		return result.toString();
	}
	
	@CrossOrigin
	@RequestMapping(value = "listings/getmultiple", method = RequestMethod.GET)
	public @ResponseBody Listing[] getListingArrayByIdArray(@RequestParam int[] listingIds, HttpServletRequest req) throws ListingNotFoundException{
		System.out.println("getmultiple- Aufruf");
		return persistenceAdapter.getListingArrayByIdArray(listingIds);
	}
}
