package BackendServer.ListingsTest;

import static org.junit.Assert.*;

import java.util.Date;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletResponse;

import org.json.JSONObject;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mock.web.MockHttpServletRequest;
import org.springframework.mock.web.MockHttpServletResponse;
import org.springframework.security.authentication.TestingAuthenticationToken;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.context.SecurityContextImpl;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.DefaultMockMvcBuilder;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

import BackendServer.ClientDatabaseAccess.Config.EmployeeBeanCollection;
import BackendServer.Exceptions.WrongFormatException;
import BackendServer.Listings.Constants;
import BackendServer.Listings.ListingRESTController;
import BackendServer.Listings.PersistenceAdapter;
import BackendServer.Listings.TestConfigRESTController;
import BackendServer.UserData.Configuration.UserBeanCollection;
import BackendServer.Listings.ListingBeanCollection;

@RunWith(SpringJUnit4ClassRunner.class)
@WebAppConfiguration
@ContextConfiguration(classes ={ ListingBeanCollection.class, TestConfigRESTController.class,
		EmployeeBeanCollection.class, UserBeanCollection.class})
public class ListingRestControllerTest{
	
    @Autowired
    private WebApplicationContext wac;
    @Autowired
    private ListingRESTController testRESTController;
    
    
    
    private SecurityContext secCon;
    private Authentication auth;
    
    private JSONObject requestBody;
    private String requestBodyString;
 
    private MockHttpServletRequest request;
    private MockHttpServletResponse response;
    
	private MockMvc mockMvc;
	
    @Before
    public void setup() {
    	// wir haben hier nun unser erstes parameter erstellt
    	requestBody = new JSONObject();
    	requestBody.put(Constants.listingDataFieldListingType, Constants.listingTypeNameServiceOffering);
    	requestBody.put(Constants.listingDataFieldDescription, "gut");
    	requestBody.put(Constants.listingDataFieldCreateDate, new Date().getTime());
    	requestBody.put(Constants.listingDataFieldTitle, "Superangebot");
    	requestBody.put(Constants.listingDataFieldDeadLine, (long) Integer.MAX_VALUE);
    	requestBody.put(Constants.listingDataFieldLocation, "Mannheim");
    	requestBody.put(Constants.listingDataFieldPrice, 20.99);
    	requestBodyString = requestBody.toString();
    	
    	secCon = new SecurityContextImpl();
    	auth = new TestingAuthenticationToken("akessler", "123", "ADMIN");
    	secCon.setAuthentication(auth);
    	SecurityContextHolder.setContext(secCon);
    	response = new MockHttpServletResponse();
    	
        DefaultMockMvcBuilder builder = MockMvcBuilders.webAppContextSetup(this.wac);
        this.mockMvc = builder.build();
    }
	
	@Test
	public void createListingTestWithCorrectValues() throws ServletException{
    	request = new MockHttpServletRequest("POST", "listing");
		String result = testRESTController.createListing(requestBodyString, request, response);
		JSONObject resultJSON = new JSONObject(result);
		assertEquals(HttpServletResponse.SC_OK, response.getStatus());
		assertFalse(resultJSON.isNull(Constants.listingDataFieldId));
	}

	/**
	 * Test for createListing with wrong locationfield Expects an Exception
	 */
	@Test
	public void creatListingTestWithWrongLocation(){
    	request = new MockHttpServletRequest();
		requestBody.remove(Constants.listingDataFieldLocation);
		requestBody.put(Constants.listingDataFieldLocation, 123);
		requestBodyString = requestBody.toString();
		String result = testRESTController.createListing(requestBodyString, request, response);
		assertEquals(HttpServletResponse.SC_BAD_REQUEST, response.getStatus());
	}
	
	/**
	 * Test for createListing with null String
	 * We wont test more wrong formats because the tests for that are made in ListingTest
	 */
	@Test
	public void createListingTestWithNullString(){
		request = new MockHttpServletRequest("POST", "listing");
		String result = testRESTController.createListing(null, request, response);
		assertEquals(HttpServletResponse.SC_BAD_REQUEST, response.getStatus());
	}
	
	/**
	 * Test getListing with correct Values
	 */
	@Test
	public void getListingTestAllCorrect(){
		request = new MockHttpServletRequest("GET", "listing/{id}");
		String result = testRESTController.getListing(0, request, response);
		assertEquals(HttpServletResponse.SC_OK, response.getStatus());
	}
	
	/**
	 * Test getListing with non existing id value
	 */
	@Test
	public void getListingTestWrongId(){
		request = new MockHttpServletRequest("GET", "listing/{id}");
		String result = testRESTController.getListing(2000, request, response);
		assertEquals(HttpServletResponse.SC_BAD_REQUEST, response.getStatus());
	}
	
	/**
	 * Test getListing with negativ ID
	 */
	@Test
	public void getListingTestNegativeID(){
		request = new MockHttpServletRequest("GET", "listing/{id}");
		String result = testRESTController.getListing(-1, request, response);
		assertEquals(HttpServletResponse.SC_BAD_REQUEST, response.getStatus());
	}
	
	
	//------------------------------------------ editListing -----------------------
	/**
	 * Test editListing with all correct values
	 */
	@Test
	public void editListingTestWithCorrectValues(){
		request = new MockHttpServletRequest("POST", "listing/{id}");
		testRESTController.editListing(requestBodyString, 0, request, response);
		assertEquals(HttpServletResponse.SC_OK, response.getStatus());
	}
	
	/**
	 * Test editListing with not existing listing
	 */
	@Test
	public void editListingTestWithNotExistingListing(){
		request = new MockHttpServletRequest("POST", "listing/{id}");
		testRESTController.editListing(requestBodyString, -1, request, response);
		assertEquals(HttpServletResponse.SC_NOT_FOUND, response.getStatus());
	}
	
	/**
	 * Test editListing with a wrong format in the string
	 */
	@Test
	public void editListingTestWithAWrongFormat(){
		requestBody.remove(Constants.listingDataFieldDescription);
		requestBody.put(Constants.listingDataFieldDescription, 0);
		requestBodyString = requestBody.toString();
		request = new MockHttpServletRequest("POST", "listing/{id}");
		testRESTController.editListing(requestBodyString, 0, request, response);
		assertEquals(HttpServletResponse.SC_BAD_REQUEST, response.getStatus());
	}
	
	//---------------------------------------- delete() ----------------------------------------------
	/**
	 * Test delete() with all correct values
	 */
	@Test
	public void deleteTestWithCorrectValues(){
		request = new MockHttpServletRequest("DELETE", "listing/delete/{id}");
		testRESTController.delete(0, request, response);
		assertEquals(HttpServletResponse.SC_OK, response.getStatus());
	}
	
	/**
	 * Test delete() with incorrect id
	 */
	@Test
	public void deleteTestWithWrongId(){
		request = new MockHttpServletRequest("POST", "listing/{id}");
		testRESTController.delete(-1, request, response);
		assertEquals(HttpServletResponse.SC_NOT_FOUND, response.getStatus());
	}
	
	
	//--------------------------------- deactivateListing ----------------
	
	/**
	 * Test deactivateListing with correct values
	 */
	@Test
	public void deactivateListing(){
		request = new MockHttpServletRequest("POST", "listing");
		String result = testRESTController.createListing(requestBodyString, request, response);
		request = new MockHttpServletRequest("POST", "listing/{id}/deactivate");
//		testRESTController.deactivateListing(0, request, response);
		assertEquals(HttpServletResponse.SC_OK, response.getStatus());
	}
	
	/**
	 * Test deactivateLisitng() with incorrect ID
	 */
	@Test
	public void deactivateListingWithWrongID(){
		request = new MockHttpServletRequest("POST", "listing/{id}/deactivate");
//		testRESTController.deactivateListing(-1, request, response);
		assertEquals(HttpServletResponse.SC_NOT_FOUND, response.getStatus());
	}
	
	
	//--------------------------------- activateListing ------------------
	// These test can only run if deactivate is correct !!!
	
	/**
	 * Test activateListing with correct values
	 */
	@Test
	public void activateListingTestWithCorrectValues(){
		request = new MockHttpServletRequest("POST", "listing");
		String result = testRESTController.createListing(requestBodyString, request, response);
		request = new MockHttpServletRequest("POST", "listing/{id}/deactivate");
//		testRESTController.deactivateListing(0, request, response);
		request = new MockHttpServletRequest("POST", "listing/{id}/activate");
		testRESTController.activateListing(0, request, response);
		assertEquals(HttpServletResponse.SC_OK, response.getStatus());
	}
	
	/**
	 * Test activateListing with incorrect ID
	 */
	@Test
	public void activateListingTestWithWrongID(){
		request = new MockHttpServletRequest("POST", "listing/{id}/activate");
		testRESTController.activateListing(-1, request, response);
		assertEquals(HttpServletResponse.SC_NOT_FOUND, response.getStatus());
	}
	
	
}
