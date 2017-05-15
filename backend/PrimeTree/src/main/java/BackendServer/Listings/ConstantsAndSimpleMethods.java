package BackendServer.Listings;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;

import org.json.JSONArray;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Configurable;

import BackendServer.Listings.Entities.Listing;

/**This class defines all Constants relevant for the BackendServer as static fields*/
public class ConstantsAndSimpleMethods {
	
	//The following Strings are the names of the required fields in all JSONObjects representing listingData
	public static final String
	listingDataFieldNameCondition="condition",
	listingDataFieldNameDescription="description",
	listingDataFieldNameDeadLine="expiryDate",
	listingDataFieldNameLocation="location",
	listingDataFieldNamePrice="price",
	listingDataFieldNameTitle="title",
	listingDataFieldNameListingType="type",
	listingDataFieldNameCreateDate="createDate",
	listingDataFieldNameActive="active",
	listingDataFieldNameCreator="creator";
	
	public static final String 
	listingTypeNameSellItem="SellItem",
	listingTypeNameRideSharing="RideSharing",
	listingTypeNameServiceOffering="ServiceOffering";

	public static String[] castJSONArrayToStringArray(JSONArray jsonArray) {
		String[] stringArray=new String[jsonArray.length()];
		for(int index=0;index<jsonArray.length();index++){
			stringArray[index]=jsonArray.getString(index);
		}
		return stringArray;
	}

	public static int[] castIntegerArrayToIntArray(Integer[] integerArray) {
		int[] intArray=new int[integerArray.length];
		for(int index=0;index<integerArray.length;index++){
			intArray[index]=integerArray[index];
		}
		return intArray;
	}

	public static Listing[] parseObjectArrayToListingArray(Object[] objectArray) {
		Listing[] listingArray=new Listing[objectArray.length];
		for(int index=0;index<objectArray.length;index++){
			listingArray[index]=(Listing)objectArray[index];
		}
		return listingArray;
	}
	
}
