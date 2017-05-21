package BackendServer.Listings;

import java.util.Collection;
import java.util.Iterator;
import java.util.LinkedList;

import org.json.JSONArray;

import BackendServer.Listings.Entities.Listing;

/**This class defines all Constants relevant for the BackendServer as static fields
 * as well as some simple methods, that allow parsing of arrays
 * 
 * @author Florian Kutz
 * */
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
	listingDataFieldNameCreator="creator",
	listingDataFieldNameId="id",
	listingDataFieldNamePicture="mainImage";
	
	public static final String 
	listingTypeNameSellItem="SellItem",
	listingTypeNameRideSharing="RideSharing",
	listingTypeNameServiceOffering="ServiceOffering";
	
	public static final String
	filterOptionLocationArray="location",
	filterOptionActive="active",
	filterOptionMinPrice="minPrice",
	filterOptionMaxPrice="maxPrice";
	
	public static final String
	sortOptionId="id";

	//The following three methods are really self-explaining by their names, so no JavaDoc is required I guess
	public static String[] parseJSONArrayToStringArray(JSONArray jsonArray) {
		String[] stringArray=new String[jsonArray.length()];
		for(int index=0;index<jsonArray.length();index++){
			stringArray[index]=jsonArray.getString(index);
		}
		return stringArray;
	}

	public static int[] parseIntegerArrayToIntArray(Integer[] integerArray) {
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

	public static Collection<String> parseJSONArrayToStringCollection(JSONArray jsonArray) {
		LinkedList<String> stringCollection=new LinkedList<String>();
		for(int index=0;index<jsonArray.length();index++){
			stringCollection.add(jsonArray.getString(index));
		}
		return stringCollection;
	}

	public static int[] parseListingCollectionToIntArrayOfIds(Collection<? extends Listing> listingCollection) {
		Iterator<? extends Listing>listingIterator=listingCollection.iterator();
		LinkedList<Integer> resultList=new LinkedList<Integer>();
		while(listingIterator.hasNext()){
			resultList.add((int) listingIterator.next().getListingId());
		}
		Integer[] resultArray=new Integer[resultList.size()];
		resultList.toArray(resultArray);
		return ConstantsAndSimpleMethods.parseIntegerArrayToIntArray(resultArray);
	}
	
	public static int[] parseListingArrayToIntArrayOfIds(Listing[] listingArray) {
		LinkedList<Integer> resultList=new LinkedList<Integer>();
		for(int index=0;index<listingArray.length;index++){
			resultList.add((int) listingArray[index].getListingId());
		}
		Integer[] resultArray=new Integer[resultList.size()];
		resultList.toArray(resultArray);
		return ConstantsAndSimpleMethods.parseIntegerArrayToIntArray(resultArray);
	}
	
}
