package BackendServer.Listings;

import java.io.IOException;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
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
import BackendServer.Exceptions.WrongFormatException;

/**
 * @author Florian Kutz
 *
 */
@Controller
@RequestMapping(value = "")
public class ListingRESTController {
	
	@Autowired
	PersistenceAdapter persistenceAdapter;
	
	@CrossOrigin
	@RequestMapping(value = "listing/create", method=RequestMethod.POST)
    public @ResponseBody String createListing(@RequestBody String body, HttpServletRequest request, HttpServletResponse response){
    	Authentication authenticationObject=SecurityContextHolder.getContext().getAuthentication();
		System.out.println("create-Aufruf von " + SecurityContextHolder.getContext().getAuthentication().getName());
		JSONObject newListingData = new JSONObject(body);
		System.out.println(newListingData);
		JSONObject result=new JSONObject();
		result.put("status", "OK");
		try {
			int newId = persistenceAdapter.persistNewListing(newListingData, authenticationObject.getName());
			result.put("id", newId);
			result.put("status", "OK");
		} catch (WrongFormatException thrownException) {
			response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
			result.put("status", "NOT_OK");
			result.put("message", thrownException.getMessage());
		}
		return result.toString();
    }
	
	@CrossOrigin
	@RequestMapping(value= "listing/upload/main-image/{id}", method=RequestMethod.PUT)
	public @ResponseBody String listingMainImageUpload(@PathVariable(value="id") final int listingId, 
			HttpServletRequest request, HttpServletResponse response, @RequestParam("file") final MultipartFile file){
		System.out.println("uploadImage() aufgerufen");
		return checkIfRequestComesFromOwnerAndPerform(response, listingId, new ActionPerformer(){

			@Override
			void perform() throws WrongFormatException, ListingNotFoundException, IOException {
				persistenceAdapter.uploadImage(file.getBytes(), listingId, file.getOriginalFilename());
			}
			
		});
	}
	
	@CrossOrigin
	@RequestMapping(value = "listings/active", method = RequestMethod.GET)
	public @ResponseBody String getActiveListings(@RequestBody String body, HttpServletRequest request, HttpServletResponse response){
		System.out.println("getall- Aufruf");
		JSONObject result=new JSONObject();
		JSONObject filter=new JSONObject(body).getJSONObject("filter");
		String sortOption=new JSONObject(body).getString("sortOption");
		if(filter.isNull(ConstantsAndSimpleMethods.filterOptionActive)){
			filter.put(ConstantsAndSimpleMethods.filterOptionActive, true);
		}
		result.put("ids", persistenceAdapter.getAllListingIdsThatMatchFilterSortedWithSortOption(filter, sortOption));
		result.put("status", "OK");
		return result.toString();
	}
	
	@CrossOrigin
	@RequestMapping(value = "listing/{id}", method = RequestMethod.GET)
	public @ResponseBody String getListing(@PathVariable(value="id") int listingId, HttpServletRequest request, HttpServletResponse response) throws IOException{
		System.out.println("getone-Aufruf mit listingId: " + listingId);
		try {
			return persistenceAdapter.getListingById(listingId).toJSON().accumulate("status", "OK").toString();
		} catch (ListingNotFoundException thrownException) {
			JSONObject result=new JSONObject();
			response.setStatus(HttpServletResponse.SC_NOT_FOUND);
			result.put("status", "NOT_OK");
			result.put("message", thrownException.getMessage());
			return result.toString();
		}
	}
	
	@CrossOrigin
	@RequestMapping(value = "listing/{id}", method = RequestMethod.POST)
	public @ResponseBody String editListing(@RequestBody final String body, @PathVariable(value="id") final int listingId, HttpServletRequest request, HttpServletResponse response) throws IOException{
		return checkIfRequestComesFromOwnerAndPerform(response, listingId, new ActionPerformer(){

			@Override
			void perform() throws WrongFormatException, ListingNotFoundException {
				persistenceAdapter.edit(listingId, new JSONObject(body));
			}
			
		});
	}
	
	@CrossOrigin
	@RequestMapping(value = "listing/delete/{id}", method=RequestMethod.DELETE)
    public @ResponseBody String delete(@PathVariable(value="id") final int listingId, HttpServletRequest request, HttpServletResponse response) throws IOException {
		System.out.println("delete() aufgerufen");
		return checkIfRequestComesFromOwnerAndPerform(response, listingId, new ActionPerformer(){

			@Override
			void perform() throws WrongFormatException, ListingNotFoundException {
				persistenceAdapter.deleteListingById(listingId);
			}
			
		});
    }
	
	@CrossOrigin
	@RequestMapping(value = "listing/{id}/activate", method=RequestMethod.POST)
    public @ResponseBody String activateListing(@PathVariable(value="id") final int listingId, HttpServletRequest request, HttpServletResponse response) throws IOException{
		return checkIfRequestComesFromOwnerAndPerform(response, listingId, new ActionPerformer(){

			@Override
			void perform() throws WrongFormatException, ListingNotFoundException {
				persistenceAdapter.edit(listingId, persistenceAdapter.getListingById(listingId).toJSON().accumulate(ConstantsAndSimpleMethods.listingDataFieldNameActive, true));
			}
			
		});
		
	}
	
	@CrossOrigin
	@RequestMapping(value = "listing/{id}/deactivate", method=RequestMethod.POST)
    public @ResponseBody String deactivateListing(@PathVariable(value="id") final int listingId, HttpServletRequest request, HttpServletResponse response) throws IOException{
		return checkIfRequestComesFromOwnerAndPerform(response, listingId, new ActionPerformer(){

			@Override
			void perform() throws WrongFormatException, ListingNotFoundException {
				persistenceAdapter.edit(listingId, persistenceAdapter.getListingById(listingId).toJSON().accumulate(ConstantsAndSimpleMethods.listingDataFieldNameActive, false));
			}
			
		});
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
	
	/**
	 * @author Florian Kutz
	 *
	 */
	private abstract class ActionPerformer{

		abstract void perform() throws WrongFormatException, ListingNotFoundException, IOException;
		
	}
	
	private String checkIfRequestComesFromOwnerAndPerform(HttpServletResponse response, int listingId, ActionPerformer performer){
		JSONObject result=new JSONObject();
		try {
			if(persistenceAdapter.isOwnerOfListing(listingId, SecurityContextHolder.getContext().getAuthentication().getName())){
				performer.perform();
				result.put("status", "OK");
			}else{
				response.setStatus(HttpServletResponse.SC_FORBIDDEN);
				result.put("status", "NOT_OK");
				result.put("message", "Only the Owner of this listing can deactivate the listing");
			}
		}catch(ListingNotFoundException thrownException) {
			response.setStatus(HttpServletResponse.SC_NOT_FOUND);
			result.put("status", "NOT_OK");
			result.put("message", thrownException.getMessage());
		} catch (WrongFormatException e) {
			System.out.println("Unexpected and uncommon error at deactivating a listing.");
		} catch (IOException thrownException) {
			response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
			result.put("status", "NOT_OK");
			result.put("message", thrownException.getMessage());
		}
		return result.toString();
	}
}
