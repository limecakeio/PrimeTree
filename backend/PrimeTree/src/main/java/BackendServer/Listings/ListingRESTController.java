package BackendServer.Listings;

import java.util.Iterator;
import java.util.LinkedList;
import java.util.Set;

import javax.servlet.http.HttpServletRequest;
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
    	Authentication a=SecurityContextHolder.getContext().getAuthentication();
    	System.out.println(a.getName());
		System.out.println(req.getSession().getId());
		System.out.println("create-Aufruf");
		System.out.println(req.getSession());
		JSONObject obj = new JSONObject(body);
		System.out.println(obj);
		JSONObject newListingData = obj.optJSONObject("newListingData");
		return sqlAdapter.persistNewListing(newListingData, 1);
    }
	
	@CrossOrigin
	@RequestMapping(value = "/delete/{id}", method=RequestMethod.DELETE)
    public @ResponseBody Long delete(@PathVariable(value="id") int listingId, HttpServletRequest req) throws ListingNotFoundException {
		return sqlAdapter.deleteListingById(listingId);
    }
	
	@CrossOrigin
	@RequestMapping(value = "/getone/{id}", method = RequestMethod.GET)
	public @ResponseBody Listing getListingById(@PathVariable(value="id") int listingId, HttpServletRequest req) throws ListingNotFoundException{
		System.out.println("get-Aufruf");
		System.out.println("listingId: " + listingId);
		System.out.println(req.getSession());
		return sqlAdapter.getListingById(listingId);
	}
	
	@CrossOrigin
	@RequestMapping(value = "/getall", method = RequestMethod.GET)
	public @ResponseBody LinkedList<Integer> getAllListings(HttpServletRequest req){
		return sqlAdapter.getAllListings();
	}
	
	@CrossOrigin
	@RequestMapping(value = "/getmultiple", method = RequestMethod.GET)
	public @ResponseBody Listing[] getListingArrayByIdArray(@RequestParam int[] listingIds, HttpServletRequest req) throws ListingNotFoundException{
		return sqlAdapter.getListingArrayByIdArray(listingIds);
	}
}
