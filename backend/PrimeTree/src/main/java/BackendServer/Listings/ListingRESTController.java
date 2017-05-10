package BackendServer.Listings;

import java.io.IOException;
import java.util.Iterator;
import java.util.LinkedList;
import java.util.Set;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.ws.rs.NotAllowedException;
import javax.ws.rs.core.Context;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Configurable;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import BackendServer.Exceptions.ListingNotFoundException;
import BackendServer.Exceptions.WrongFormatException;
import BackendServer.Listings.Entities.Listing;

@Controller
@RequestMapping(value = "/listing")
public class ListingRESTController {
	
	@Autowired
	SQLAdapter sqlAdapter;
	
	@CrossOrigin
	@RequestMapping(value = "/create", method=RequestMethod.POST)
    public @ResponseBody int newListing(@RequestBody String body, HttpServletRequest req) throws WrongFormatException {
    	Authentication authenticationObject=SecurityContextHolder.getContext().getAuthentication();
		System.out.println("create-Aufruf von " + SecurityContextHolder.getContext().getAuthentication().getName());
		JSONObject obj = new JSONObject(body);
		System.out.println(obj);
		JSONObject newListingData = obj.optJSONObject("newListingData");
		return sqlAdapter.persistNewListing(newListingData, authenticationObject.getName());
    }
	
	@CrossOrigin
	@RequestMapping(value = "/delete/{id}", method=RequestMethod.DELETE)
    public @ResponseBody void delete(@PathVariable(value="id") int listingId, HttpServletRequest request) throws ListingNotFoundException, IOException {
		System.out.println("delete() aufgerufen");
		if(sqlAdapter.isOwnerOfListing(listingId, SecurityContextHolder.getContext().getAuthentication().getName())){
			sqlAdapter.deleteListingById(listingId);
		}else{
//			response.addHeader("Access-Control-Allow-Origin", request.getHeader("origin"));
//			response.addHeader("Access-Control-Allow-Credentials", "true");
//			response.addHeader("Access-Control-Allow-Headers", "x-authors");
//			response.setStatus(HttpServletResponse.SC_FORBIDDEN);
//			response.getWriter().write("Only the Owner of this listing can delete the listing");
			throw new NotAllowedException("Only the owner of this listing can delete this listing.");
		}
    }
	
	@CrossOrigin
	@RequestMapping(value = "/getone/{id}", method = RequestMethod.GET)
	public @ResponseBody Listing getListingById(@PathVariable(value="id") int listingId, HttpServletRequest req) throws ListingNotFoundException{
		System.out.println("getone-Aufruf mit listingId: " + listingId);
		return sqlAdapter.getListingById(listingId);
	}
	
	@CrossOrigin
	@RequestMapping(value = "/getall", method = RequestMethod.GET)
	public @ResponseBody LinkedList<Integer> getAllListings(HttpServletRequest req){
		System.out.println("getall- Aufruf");
		return sqlAdapter.getAllListings();
	}
	
	@CrossOrigin
	@RequestMapping(value = "/getmultiple", method = RequestMethod.GET)
	public @ResponseBody Listing[] getListingArrayByIdArray(@RequestParam int[] listingIds, HttpServletRequest req) throws ListingNotFoundException{
		System.out.println("getmultiple- Aufruf");
		return sqlAdapter.getListingArrayByIdArray(listingIds);
	}
}
