package BackendServer.ListingsTest;

import static org.junit.Assert.*;

import org.json.JSONObject;
import org.junit.Before;
import org.junit.Test;
import org.springframework.mock.web.MockHttpServletRequest;
import org.springframework.mock.web.MockHttpServletResponse;

import BackendServer.Listings.ListingRESTController;

public class ListingRestControllerTest {

	private JSONObject initialiseJSONOject;
	private String JSONString;
	private MockHttpServletRequest request;
	private MockHttpServletResponse response;
	
	private ListingRESTController listingRESTController;
	
	@Before
	public void initTests(){
		listingRESTController = new ListingRESTController();
		initialiseJSONOject = new JSONObject();
		initialiseJSONOject.put("condition", "gut");
		initialiseJSONOject.put("description", "TestDescription");
		initialiseJSONOject.put("location", "Mannheim");
		initialiseJSONOject.put("price", 100);
		initialiseJSONOject.put("title", "TestTitle");
		initialiseJSONOject.put("type", "SaleOffer");
		initialiseJSONOject.put("createDate", 1495636552);
		JSONString = initialiseJSONOject.toString();
		request = new MockHttpServletRequest();
		response = new MockHttpServletResponse();
		
	}
	@Test
	public void test() {
		String test = listingRESTController.createListing(JSONString, request, response);
		System.out.println(test);
	}

}
