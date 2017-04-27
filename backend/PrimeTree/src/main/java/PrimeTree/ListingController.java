package PrimeTree;

import java.util.concurrent.atomic.AtomicLong;

import org.json.JSONObject;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import PrimeTree.SQLAdapterImpl.SQLAdapterImpl;

import javax.ws.rs.*;
import javax.ws.rs.core.Response;

@RestController
@Path("/listing")
public class ListingController {
	
	SQLAdapter sqlAdapter=new SQLAdapterImpl();
	
	@POST
	@RequestMapping
    public Response newListingData(@RequestParam(value="newListingData") JSONObject newListingData) {
        try {
			return Response.ok(sqlAdapter.persistNewListing(newListingData, 1)).build();
		} catch (WrongFormatException e) {
			return Response.notModified().status(406).build();
		}
    }
	
	@GET
	@RequestMapping
	public Response getListingById(@RequestParam(value="listingId") long listingId){
		try{
			return Response.ok(sqlAdapter.getListingById(listingId)).build();
		}catch(ListingNotFoundException e){
			return Response.notModified().status(404).build();
		}
	}

}
