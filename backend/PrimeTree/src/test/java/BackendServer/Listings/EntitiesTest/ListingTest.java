package BackendServer.Listings.EntitiesTest;

import static org.junit.Assert.*;

import java.util.List;

import org.json.JSONException;
import org.json.JSONObject;
import org.junit.Before;
import org.junit.Test;

import BackendServer.Exceptions.WrongFormatException;
import BackendServer.Listings.Entities.SellItem;

public class ListingTest {
	// We create a Sellitem to test Listing because we cannot create a Listing because it is abstract
	private SellItem testListing;
	private JSONObject initialiseJSONOject;
	private JSONObject testJSON;
	private String[] locations;
	private String[] typeArray;
	private boolean test;
	private List<String> imageGallery;
	private String imagepath1;
	private String imagepath2;
	
	//type is SellItem/Ridesharing 
	// kind is offering or request
	/**
	 * Setup the JSONObject for the tests
	 * Setup only the fields for Listing
	 */
	@Before
	public void initObjects(){
		testListing = new SellItem();
		initialiseJSONOject = new JSONObject();
		initialiseJSONOject.put("id", 0);
		initialiseJSONOject.put("active", true);
		initialiseJSONOject.put("createDate", 200.22);
		initialiseJSONOject.put("creator", 0);
		initialiseJSONOject.put("description", "test");
		initialiseJSONOject.put("expiryDate", 1);
		initialiseJSONOject.put("location", "Koeln");
		initialiseJSONOject.put("title", "test1");
		initialiseJSONOject.put("price", 30);
		initialiseJSONOject.put("condition", "gut");
		
		locations = new String[2];
		locations[0] = "Mannheim";
		locations[1] = "Koeln";
		
		typeArray = new String[2];
		typeArray[0] = "SellItem";
		typeArray[1] = "RideSharing";
		testListing.setKind("Offering");
		testListing.setType("SellItem");
	}
	
	//---------------------------------------- Correct tests ---------------------------------------------------
	
	// You don`t need to test with null because the put method doesn`t allow null
	/**
	 * Test fillFields with correct values in SellItem
	 * @Result a correct Listing
	 */
	@Test
	public void fillfieldsTestAllCorrectSellItem() {
		try {
			testListing.fillFields(initialiseJSONOject, 0);
		} catch (WrongFormatException e) {
			e.printStackTrace();
		}
	//	assertEquals(testListing.getListingId(), 0);
		assertEquals(testListing.getOwner(), 0);
		assertEquals(testListing.getDescription(), "test");
		assertEquals(testListing.getTitle(), "test1");
		assertEquals(testListing.getLocation(), "Koeln");
		assertEquals(testListing.isActive(), true);
	}
	
	/**
	 * Test fillfields with null
	 */
	@Test(expected = Exception.class)
	public void fillFieldsTestWithNull(){
		try {
			testListing.fillFields(null, 0);
		} catch (WrongFormatException e) {
			e.printStackTrace();
		}
	}
	
	/**
	 * Test toJSON with correct values
	 * the new JSON object should have the same values as obj1
	 */
	@Test
	public void toJSONTest(){
		testJSON = testListing.toJSON();
		
		//assertEquals(testJSON.get("id"), testListing.getListingId());
		assertEquals(testJSON.get("creator"), testListing.getOwner());
		assertEquals(testJSON.get("description"), testListing.getDescription());
		assertEquals(testJSON.get("title"), testListing.getTitle());
		assertEquals(testJSON.get("mainImage"), testListing.getPicture());
		assertEquals(testJSON.get("location"), testListing.getLocation());
		assertEquals(testJSON.get("active"), testListing.isActive());
	}
	
//---------------------------------- fillFields for ID -------------------------------------------
	
//		/**
//		 * Test fillfields with a String instead of Int in ID
//		 */
//		@Test(expected = Exception.class)
//		public void fillFieldsTestStringID(){
//			initialiseJSONOject.remove("id");
//			initialiseJSONOject.put("id", "zwei");
//			testListing.fillFields(initialiseJSONOject, 0);
//		}
//		
//		/**
//		 * Test fillFields with a double instead of an Int in ID
//		 */
//		@Test(expected = Exception.class)
//		public void fillFieldsTestWithDoubleID(){
//			initialiseJSONOject.remove("id");
//			initialiseJSONOject.put("id", 20.09);
//			testListing.fillFields(initialiseJSONOject, 0);
//		}
//		/**
//		 * Test fillFields with a boolean instead of an Int in ID
//		 */
//		@Test(expected = Exception.class)
//		public void fillFieldsTestWithBolleanID(){
//			initialiseJSONOject.remove("id");
//			initialiseJSONOject.put("id", true);
//			testListing.fillFields(initialiseJSONOject, 0);
//		}
		
//------------------------------------- fillFields for active --------------------------------
		
		/**
		 * Test fillFields with a String instead of boolean in active
		 */
		@Test(expected=WrongFormatException.class)
		public void fillFieldsTestWithStringActive(){
			initialiseJSONOject.remove("active");
			initialiseJSONOject.put("active", "test");
			try {
				testListing.fillFields(initialiseJSONOject, 0);
			} catch (WrongFormatException e) {
				e.printStackTrace();
			}
		}
		
		/**
		 * Test fillFields with an int instead of boolean in active
		 */
		@Test(expected=WrongFormatException.class)
		public void fillFieldsTestWithIntActive(){
			initialiseJSONOject.remove("active");
			initialiseJSONOject.put("active", 3);
			try {
				testListing.fillFields(initialiseJSONOject, 0);
			} catch (WrongFormatException e) {
				e.printStackTrace();
			}
		}
		
//------------------------------------- fillFields for CreateDate -------------------------------
		
		/**
		 * Test fillFields with a boolean in createDate
		 */
		@Test(expected =WrongFormatException.class)
		public void fillFieldsTestWithBooleanCreateDate(){
			initialiseJSONOject.remove("createDate");
			initialiseJSONOject.put("createDate", true);
			try {
				testListing.fillFields(initialiseJSONOject, 0);
			} catch (WrongFormatException e) {
				e.printStackTrace();
			}
		}
		/**
		 * Test fillFields with a String in createDate
		 */
		@Test(expected =WrongFormatException.class)
		public void fillFieldsTestWithStringCreateDate(){
			initialiseJSONOject.remove("createDate");
			initialiseJSONOject.put("createDate", "20.05.2017");
			try{
			testListing.fillFields(initialiseJSONOject, 0);
			}catch(Exception e){
				
			}
		}
		
//------------------------------------- fillFields for creator --------------------------------

		/**
		 * Test fillFields with a String instead of int in creator
		 */
		@Test
		public void fillFieldsTestWithStringCreator(){
			initialiseJSONOject.remove("creator");
			initialiseJSONOject.put("creator", "Mark");
			try {
				testListing.fillFields(initialiseJSONOject, 0);
			} catch (WrongFormatException e) {
				e.printStackTrace();
			}
			assertEquals(0,testListing.getOwner());
		}
		
		/**
		 * Test fillFields with a boolean instead of int in creator
		 */
		@Test
		public void fillFieldsTestWithBooleanCreator(){
			initialiseJSONOject.remove("creator");
			initialiseJSONOject.put("creator", true);
			try {
				testListing.fillFields(initialiseJSONOject, 0);
			} catch (WrongFormatException e) {
				e.printStackTrace();
			}
			assertEquals(0,testListing.getOwner());
		}
		
		/**
		 * Test fillFields with a doubleinstead of int in creator
		 */
		@Test
		public void fillFieldsTestWithDoubleCreator(){
			initialiseJSONOject.remove("creator");
			initialiseJSONOject.put("creator", 2.1);
			try {
				testListing.fillFields(initialiseJSONOject, 0);
			} catch (WrongFormatException e) {
				e.printStackTrace();
			}
			assertEquals(0,testListing.getOwner());
		}
				
//------------------------------------- fillFields for description -------------------------------

		/**
		 * Test fillfields with a boolean instead of String in description
		 */
		@Test(expected=WrongFormatException.class)
		public void fillFieldsTestWithBooleanDesription(){
			initialiseJSONOject.remove("description");
			initialiseJSONOject.put("descriptin", true);
			try {
				testListing.fillFields(initialiseJSONOject, 0);
			} catch (WrongFormatException e) {
				e.printStackTrace();
			}
		}
		/**
		 * Test fillfields with a number instead of String in description
		 */
		@Test(expected=WrongFormatException.class)
		public void fillFieldsTestWithIntDesription(){
			initialiseJSONOject.remove("description");
			initialiseJSONOject.put("descriptin", 12);
			try {
				testListing.fillFields(initialiseJSONOject, 0);
			} catch (WrongFormatException e) {
				e.printStackTrace();
			}
		}
		
//------------------------------------- fillFields for expiryDate -------------------------------
		
		/**
		 * Test fillFields with a boolean in createDate
		 */
		@Test(expected =WrongFormatException.class)
		public void fillFieldsTestWithBooleanExpiryDate(){
			initialiseJSONOject.remove("expiryDate");
			initialiseJSONOject.put("expiryDate", true);
			try {
				testListing.fillFields(initialiseJSONOject, 0);
			} catch (WrongFormatException e) {
				e.printStackTrace();
			}
		}
		/**
		 * Test fillFields with a String in createDate
		 */
		@Test(expected =WrongFormatException.class)
		public void fillFieldsTestWithStringExpiryDate(){
			initialiseJSONOject.remove("expiryDate");
			initialiseJSONOject.put("expiryDate", "20.05.2017");
			try {
				testListing.fillFields(initialiseJSONOject, 0);
			} catch (WrongFormatException e) {
				e.printStackTrace();
			}
		}
		
//------------------------------------- fillFields for location --------------------------------
		
		/**
		 * Test fillFields with a wrong location in location
		 */
		@Test(expected = WrongFormatException.class)
		public void fillFieldsTestWithWrongLocation(){
			initialiseJSONOject.remove("location");
			initialiseJSONOject.put("location",  "Vossenack");
			try {
				testListing.fillFields(initialiseJSONOject, 0);
			} catch (WrongFormatException e) {
				e.printStackTrace();
			}
		}
		
		/**
		 * Test fillFields with a int in location
		 */
		@Test(expected = WrongFormatException.class)
		public void fillFieldsTestWithIntLocation(){
			initialiseJSONOject.remove("location");
			initialiseJSONOject.put("location",  2);
			try {
				testListing.fillFields(initialiseJSONOject, 0);
			} catch (WrongFormatException e) {
				e.printStackTrace();
			}
		}
		/**
		 * Test fillFields with a boolean in location
		 */
		@Test(expected = WrongFormatException.class)
		public void fillFieldsTestWithBooleanLocation(){
			initialiseJSONOject.remove("location");
			initialiseJSONOject.put("location",  true);
			try {
				testListing.fillFields(initialiseJSONOject, 0);
			} catch (WrongFormatException e) {
				e.printStackTrace();
			}
		}
		/**
		 * Test fillFields with an empty String in location
		 */
		@Test(expected = WrongFormatException.class)
		public void fillFieldsTestWithEmptyStringLocation(){
			initialiseJSONOject.remove("location");
			initialiseJSONOject.put("location",  "");
			try {
				testListing.fillFields(initialiseJSONOject, 0);
			} catch (WrongFormatException e) {
				e.printStackTrace();
			}
		}
		

//------------------------------------- fillFields for title ----------------------------------------
		
		/**
		 * Test fillFields with empty string in title
		 */
		@Test(expected = WrongFormatException.class)
		public void fillFieldsTestEmptyStringTitle(){
			initialiseJSONOject.remove("title");
			initialiseJSONOject.put("title", "");
			try {
				testListing.fillFields(initialiseJSONOject, 0);
			} catch (WrongFormatException e) {
				e.printStackTrace();
			}
		}
		
		/**
		 * Test fillFields with an Int instead of String in title
		 */
		@Test(expected = WrongFormatException.class)
		public void fillFieldsTestWithIntTitle(){
			initialiseJSONOject.remove("title");
			initialiseJSONOject.put("title", 10);
			try {
				testListing.fillFields(initialiseJSONOject, 0);
			} catch (WrongFormatException e) {
				e.printStackTrace();
			}
		}
		
		/**
		 * Test fillFields with an boolean instead of String in title
		 */
		@Test(expected = WrongFormatException.class)
		public void fillFieldsTestWithBooleanTitle(){
			initialiseJSONOject.remove("title");
			initialiseJSONOject.put("title", true);
			try {
				testListing.fillFields(initialiseJSONOject, 0);
			} catch (WrongFormatException e) {
				e.printStackTrace();
			}
		}
		
		
//---------------------------------------- matchFilterOptions --------------------------------------------------------
		
		
		/**
		 * Test matchFilterOptions with correct Values
		 * @Result true
		 */
		@Test
		public void matchFilterOptionsTestWithCorrectValues(){
			test = testListing.matchFilterOptions(locations, true, 0, 0, typeArray, "Offering");
			assertEquals(true, test);
			// other correct values for min/maxPrice price is set to 0
			test = testListing.matchFilterOptions(locations, true, -2, 1, typeArray, "Offering");
			assertEquals(true, test);
		}
		
		/**
		 * Test matchFilterOptions with wrong location
		 */
		@Test
		public void matchFilterOptionsWithWrongLocation(){
			testListing.setLocation("Vossenack");
			test = testListing.matchFilterOptions(locations, true, 0, 0, typeArray, "Offering");
			assertEquals(false, test);
			testListing.setLocation("Koeln");
		}
		
		/**
		 * Test matchFilterOptions with wrong type
		 */
		@Test
		public void matchFilterOptionsTestWithWrongType(){
			testListing.setType("ServiceOffering");
			test = testListing.matchFilterOptions(locations, true, 0, 0, typeArray, "Offering");
			assertEquals(false, test);
			testListing.setType("SellItem");
		}
		
		/**
		 * Test matchFilterOptions with location = null
		 */
		@Test
		public void matchFilterOptionsTestWithNullLocation(){
			test = testListing.matchFilterOptions(null, true, 0, 0, typeArray, "Offering");
			assertEquals(true, test);
		}
		
		/**
		 * Test matchFilterOptions with type = null
		 */
		@Test
		public void matchFilterOptionsTestWithNullType(){
			test = testListing.matchFilterOptions(locations, true, 0, 0, null, "Offering");
			assertEquals(true, test);
		}
		
		/**
		 * Test matchFilterOptions with kind = null
		 */
		@Test
		public void matchFilterOptionsTestWithNullKind(){
			test = testListing.matchFilterOptions(locations, true, 0, 0, typeArray, null);
			assertEquals(true, test);
		}
		
		/**
		 * Test matchFilterOptions with shallbeactive = false
		 */
		@Test
		public void matchFilterOptionsTestWithFalseShallBeActive(){
			test = testListing.matchFilterOptions(locations, false, 0, 0, typeArray, "Offering");
			assertEquals(false, test);
		}
		
		/**
		 * Test matchFilterOptions with wrong kind
		 */
		@Test
		public void matchFilterOptionsTestWithWrongKind(){
			test = testListing.matchFilterOptions(locations, true, 0, 0, typeArray, "Request");
			assertEquals(false, test);
		}
		
		/**
		 * Test matchFilterOptions with wrong minPrice
		 */
		@Test
		public void matchFilterOptionsTestWithWrongMinPrice(){
			test = testListing.matchFilterOptions(locations, true, 1, 0, typeArray, "Offering");
			assertEquals(false, test);
		}
		
		/**
		 * Test matchFilterOptions with wrong maxPrice
		 */
		@Test
		public void matchFilterOptionsWithWrongMaxPrice(){
			test = testListing.matchFilterOptions(locations, true, 0, -2, typeArray, "Offering");
			assertEquals(false, test);
		}
		
//------------------------------------- matchFilterOptions with query ------------------------------------
		/**
		 * Test matchFilterOptions with correct Querry (query = title)
		 */
		@Test
		public void matchFilterOptionsTestWithCorrectQueryTitle(){
			test = testListing.matchFilterOptions("test1", locations, true, 0, 0, typeArray, "Offering");
			assertEquals(true, test);
		}
		/**
		 * Test matchFilterOptions with correct Querry (query = description)
		 */
		@Test
		public void matchFilterOptionsTestWithCorrectQueryDescription(){
			test = testListing.matchFilterOptions("test", locations, true, 0, 0, typeArray, "Offering");
			assertEquals(true, test);
		}
		
		/**
		 * Test matchFilterOptions with query = null
		 */
		@Test
		public void matchFilterOptionsTestWithQuerryNull(){
			test = testListing.matchFilterOptions(null, locations, true, 0, 0, typeArray, "Offering");
			assertEquals(false, test);
		}
		
		/**
		 * Test matchFilterOptions with wrong query
		 */
		@Test
		public void matchFilterOptionsTestWithWrongQuery(){
			test = testListing.matchFilterOptions("test123", locations, true, 0, 0, typeArray, "Offering");
			assertEquals(false, test);
		}
		
}
