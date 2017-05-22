package BackendServer.Listings;

import java.util.Collection;
import java.util.Iterator;
import java.util.LinkedList;
import java.util.List;

import org.json.JSONArray;

import BackendServer.Listings.Entities.Listing;
import BackendServer.UserData.Entities.UserData;

/**This class has some simple methods, that allow parsing arrays.
 * 
 * @author Florian Kutz
 *
 */
public class SimpleMethods {
	
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

	public static List<String> parseJSONArrayToStringList(JSONArray jsonArray) {
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
		return SimpleMethods.parseIntegerArrayToIntArray(resultArray);
	}
	
	public static int[] parseListingArrayToIntArrayOfIds(Listing[] listingArray) {
		LinkedList<Integer> resultList=new LinkedList<Integer>();
		for(int index=0;index<listingArray.length;index++){
			resultList.add((int) listingArray[index].getListingId());
		}
		Integer[] resultArray=new Integer[resultList.size()];
		resultList.toArray(resultArray);
		return SimpleMethods.parseIntegerArrayToIntArray(resultArray);
	}

	public static Collection<String> parseStringArrayToStringList(String[] stringArray) {
		LinkedList<String> stringCollection=new LinkedList<String>();
		for(int index=0;index<stringArray.length;index++){
			stringCollection.add(stringArray[index]);
		}
		return stringCollection;
	}

	public static Collection parseListingArrayToJSONArray(Listing[] listingArray) {
		JSONArray jsonArray=new JSONArray(listingArray.length);
		for(int index=0;index<listingArray.length;index++){
			jsonArray.put(index, listingArray[index].toJSON());
		}
		return null;
	}

	public static int parseStringToInt(String substring) {
		int resultInt=0;
		for(int index=substring.length()-1;index>=0;index--){
			resultInt*=10;
			resultInt+=substring.charAt(index);
			resultInt-='0';
		}
		return resultInt;
	}

	public static UserData[] parseObjectArrayToUserDataArray(Object[] objectArray) {
		UserData[] listingArray=new UserData[objectArray.length];
		for(int index=0;index<objectArray.length;index++){
			listingArray[index]=(UserData)objectArray[index];
		}
		return listingArray;
	}

}
