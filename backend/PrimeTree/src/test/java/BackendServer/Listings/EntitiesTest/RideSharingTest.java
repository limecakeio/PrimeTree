package BackendServer.Listings.EntitiesTest;

import static org.junit.Assert.*;

import java.util.LinkedList;

import org.json.JSONObject;
import org.junit.Before;
import org.junit.Test;

import BackendServer.Listings.Entities.RideSharing;

public class RideSharingTest {
	
	
	
	private LinkedList<String> linkedListForStops;
	private JSONObject obj1;
	private RideSharing rideSharetest;
	private String stop1;
	private String stop2;
	
	
	@Before
	public void initObjects(){
	linkedListForStops=new LinkedList<String>();
	stop1 = "Koeln";
	stop2 = "Dortmund";
	linkedListForStops.add(stop1);
	linkedListForStops.add(stop2);
	
	obj1.put("id", 0);
	obj1.put("active", true);
	obj1.put("createDate", 1);
	obj1.put("creator", 0);
	obj1.put("description", "test");
	obj1.put("expiryDate", 2.9);
	obj1.put("location", "Koeln");
	obj1.put("mainImage", "Null");
	obj1.put("title", "test1");
	obj1.put("fromLocation", "Mannheim");
	obj1.put("journeyStops", linkedListForStops);
	obj1.put("toLocation", "Frankfurt");
	obj1.put("availableSeats", 3);
	obj1.put("travelDateAndTime", 10);
	}

	@Test
	public void test() {
		fail("Not yet implemented");
	}

}
