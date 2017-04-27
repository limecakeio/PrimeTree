package BackendServer;

import java.util.Iterator;
import java.util.Set;

import javax.servlet.http.HttpServletRequest;
import javax.ws.rs.core.Context;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Configurable;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
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
import BackendServer.ListingEntities.Listing;

@Controller
@RequestMapping(value = "/listing")
public class ListingRESTController {
	
	@Autowired
	SQLAdapter sqlAdapter;
	
	@CrossOrigin
	@RequestMapping(value = "/create", method=RequestMethod.POST)
    public @ResponseBody int newListingData(@RequestBody String body, HttpServletRequest req) throws WrongFormatException {
		System.out.println("create-Aufruf");
		System.out.println(req.getSession());
		JSONObject obj = new JSONObject(body);
		System.out.println(obj);
		JSONObject newListingData = obj.optJSONObject("newListingData");
		return sqlAdapter.persistNewListing(newListingData, 1);
    }
	
	@CrossOrigin
	@RequestMapping(value = "/get", method = RequestMethod.GET)
	public @ResponseBody Listing getListingById(@RequestParam int listingId, HttpServletRequest req){
		System.out.println("get-Aufruf");
		System.out.println("listingId: " + listingId);
		System.out.println(req);
		try{
			return sqlAdapter.getListingById(listingId);
		}catch(ListingNotFoundException e){
//			return Response.notModified().status(404).build();
			return null;
		}
	}
	
	@RequestMapping("/")
	public @ResponseBody String helloWorld(){
		System.out.println("Hello World");
		return "Hello World";
	}
}
