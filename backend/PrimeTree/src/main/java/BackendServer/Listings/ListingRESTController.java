package BackendServer.Listings;

import java.util.Iterator;
import java.util.Set;

import javax.servlet.http.HttpServletRequest;
import javax.ws.rs.core.Context;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Configurable;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.security.access.annotation.Secured;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
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
	
	/**Creates a new Listing with the data in the body.
	 * @return id of the new listing
	 * @throws WrongFormatException if the newListingData cannot be read*/
//	@CrossOrigin
	@RequestMapping(value = "/create", method=RequestMethod.POST)
    public @ResponseBody int newListing(@RequestBody String body, HttpServletRequest req) throws WrongFormatException {
		System.out.println("create-Aufruf");
		System.out.println(req.getSession());
		JSONObject obj = new JSONObject(body);
		System.out.println(obj);
		JSONObject newListingData = obj.optJSONObject("newListingData");
		return sqlAdapter.persistNewListing(newListingData, 1);
    }
	
	/**Reads the listing with the listingId out of the database and returns the found listing
	 * @return Data of the found listing
	 * @throws ListingNotFoundException if the id doesn't exist*/
//	@CrossOrigin
	@RequestMapping(value = "/get", method = RequestMethod.GET)
	public @ResponseBody Listing getListingById(@RequestParam int listingId, HttpServletRequest req) throws ListingNotFoundException{
		System.out.println("get-Aufruf");
		System.out.println("listingId: " + listingId);
		System.out.println(req.getSession());
		return sqlAdapter.getListingById(listingId);
	}
	
	/**A dummy method for testing the configuration*/
	@RequestMapping("/")
	public @ResponseBody String helloWorld(){
		System.out.println("Hello World");
		return "Hello World";
	}
}
