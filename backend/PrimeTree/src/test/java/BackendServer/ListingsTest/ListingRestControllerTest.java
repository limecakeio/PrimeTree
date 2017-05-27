package BackendServer.ListingsTest;

import static org.junit.Assert.*;

import java.util.Date;

import javax.servlet.ServletException;
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
import BackendServer.Listings.Constants;
import BackendServer.Listings.ListingRESTController;
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
    	requestBody.put(Constants.listingDataFieldFromLocation, "Mannheim");
    	requestBody.put(Constants.listingDataFieldPrice, 20.99);
    	requestBodyString = requestBody.toString();
    	
    	secCon = new SecurityContextImpl();
    	auth = new TestingAuthenticationToken("akessler", "123");
    	secCon.setAuthentication(auth);
    	SecurityContextHolder.setContext(secCon);
    	request = new MockHttpServletRequest("POST", "listing");
    	response = new MockHttpServletResponse();
    	
        DefaultMockMvcBuilder builder = MockMvcBuilders.webAppContextSetup(this.wac);
        this.mockMvc = builder.build();
    }
	
	@Test
	public void createListingTestWithCorrectValues() throws ServletException{
		String result = testRESTController.createListing(requestBodyString, request, response);
		JSONObject resultJSON = new JSONObject(result);
		assertEquals(HttpServletResponse.SC_OK, response.getStatus());
		assertFalse(resultJSON.isNull(Constants.listingDataFieldId));
	}

}
