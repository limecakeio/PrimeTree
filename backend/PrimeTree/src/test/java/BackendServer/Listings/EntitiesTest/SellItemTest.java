package BackendServer.Listings.EntitiesTest;

import static org.junit.Assert.*;

import java.util.List;

import org.json.JSONObject;
import org.junit.Before;
import org.junit.Test;

import BackendServer.Exceptions.WrongFormatException;
import BackendServer.Listings.Entities.SellItem;

public class SellItemTest {

	private SellItem testListing;
	private JSONObject obj1;
	private List<String> imageGallery;
	private String imagepath1;
	private String imagepath2;
	
	//Only price and condition will be tested here because the other fields were tested in ListingTest
	/**
	 * Setup the JSONObject for the tests
	 */
	@Before
	public void initObjects(){
		testListing = new SellItem();
		imageGallery.add(imagepath1);
		imageGallery.add(imagepath2);
		obj1 = new JSONObject();
		obj1.put("id", 0);
		obj1.put("active", true);
		obj1.put("createDate", 1);
		obj1.put("creator", 0);
		obj1.put("description", "test");
		obj1.put("expiryDate", 2.9);
		obj1.put("location", "Koeln");
		obj1.put("mainImage", "test/location");
		obj1.put("title", "test1");
		obj1.put("price", 2.1);
		obj1.put("condition", "gut");
		obj1.put("imageGallery", imageGallery);
		
	
	}
	
	//---------------------------------- fillFieldsTest---------------------------------------------------
	
	/**
	 * Test filliFedls with correct values
	 */
	@Test
	public void fillFieldsTestWithCorrectValues(){
		try {
			testListing.fillFields(obj1, 0);
		} catch (WrongFormatException e) {
			e.printStackTrace();
		}
	//	assertEquals
	}
	
	
	
	
	//---------------------------------- fillFieldsTest for price -----------------------------------------
	
		/**
		 * Test fillfields with a negativ price
		 * @result Exception
		 */
		@Test(expected = WrongFormatException.class)
		public void fillFieldsTestNegativePrice(){
			obj1.remove("price");
			obj1.put("price", -2.1);
			try {
				testListing.fillFields(obj1, 0);
			} catch (WrongFormatException e) {
				e.printStackTrace();
			}
		}
		
		/**
		 * Test fillFields with an Int instead of Float in price
		 */
		@Test
		public void fillFieldsTestWithIntPrice(){
			obj1.remove("price");
			obj1.put("price", 100);
			try {
				testListing.fillFields(obj1, 0);
			} catch (WrongFormatException e) {
				e.printStackTrace();
			}
			assertEquals(100, testListing.getPrice(), 0);
		}
		
		/**
		 * Test fillFields with a String instead of float in price
		 */
		@Test(expected = WrongFormatException.class)
		public void fillFieldsTestWithStringPrice(){
			obj1.remove("price");
			obj1.put("price", "zwei");
			try {
				testListing.fillFields(obj1, 0);
			} catch (WrongFormatException e) {
				e.printStackTrace();
			}
		}
		
		/**
		 * Test fillFields with a boolean instead of float in price
		 */
		@Test(expected = WrongFormatException.class)
		public void fillFieldsTestWithbooleanPrice(){
			obj1.remove("price");
			obj1.put("price", true);
			try {
				testListing.fillFields(obj1, 0);
			} catch (WrongFormatException e) {
				e.printStackTrace();
			}
		}

		//------------------------------------- fillFields for condition --------------------------------

		/**
		 * Test fillFields with a boolean in Condition
		 */
		@Test(expected = WrongFormatException.class)
		public void fillFieldsTestWithBooleanCondition(){
			obj1.remove("condition");
			obj1.put("condition",  true);
			try {
				testListing.fillFields(obj1, 0);
			} catch (WrongFormatException e) {
				e.printStackTrace();
			}
		}
		/**
		 * Test fillFields with an int in Condition
		 */
		@Test(expected = WrongFormatException.class)
		public void fillFieldsTestWithIntCondition(){
			obj1.remove("condition");
			obj1.put("condition",  2);
			try {
				testListing.fillFields(obj1, 0);
			} catch (WrongFormatException e) {
				e.printStackTrace();
			}
		}
//------------------------------------- fillFields for imagelocation ------------------------------------
		
			/**
			 * Test fillFields with a boolean instead of a String in imagelocation
			 */
			@Test(expected = WrongFormatException.class)
			public void fillFieldsTestWithBooleanImagelocation(){
				obj1.remove("mainImage");
				obj1.put("mainImage", true);
				try {
					testListing.fillFields(obj1, 0);
				} catch (WrongFormatException e) {
					e.printStackTrace();
				}
			}
			
			/**
			 * Test fillFields with an int instead of a String in imagelocation
			 */
			@Test(expected = WrongFormatException.class)
			public void fillFieldsTestWithIntImagelocation(){
				obj1.remove("mainImage");
				obj1.put("mainImage", 21);
				try {
					testListing.fillFields(obj1, 0);
				} catch (WrongFormatException e) {
					e.printStackTrace();
				}
			}
}
