package BackendServer.Listings;

import static org.junit.Assert.*;

import java.util.Date;

import org.json.JSONObject;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import BackendServer.Exceptions.ListingNotFoundException;
import BackendServer.Exceptions.WrongFormatException;
import BackendServer.Listings.Entities.SellItem;
import BackendServer.Listings.Repositories.SellItemRepository;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(classes={BackendServer.UserData.Configuration.UserBeanCollection.class,
BackendServer.Listings.ListingBeanCollection.class, BackendServer.ClientDatabaseAccess.Config.EmployeeBeanCollection.class})
public class PersistenceAdapterTest {
	
	@Autowired
	PersistenceAdapter persistenceAdapter;
	@Autowired
	SellItemRepository sellItemRepository;
	JSONObject correctListingDataForSellItem;
	
	@Before
	public void setup(){
		correctListingDataForSellItem=new JSONObject();
		correctListingDataForSellItem.put(Constants.listingDataFieldListingType, Constants.listingTypeNameSellItem);
		correctListingDataForSellItem.put(Constants.listingDataFieldCreateDate, new Date().getTime());
		correctListingDataForSellItem.put(Constants.listingDataFieldDescription, "");
		correctListingDataForSellItem.put(Constants.listingDataFieldTitle, "");
		correctListingDataForSellItem.put(Constants.listingDataFieldLocation, "");
		correctListingDataForSellItem.put(Constants.listingDataFieldCondition, Constants.allItemConditions.get(0));
		correctListingDataForSellItem.put(Constants.listingDataFieldPrice, (double) 0 );
	}
	
	@Test
	public void createNewSellItemListingWithCorrectValues() throws WrongFormatException, ListingNotFoundException{
		int newId=persistenceAdapter.persistNewListing(correctListingDataForSellItem, 0);
		SellItem newListing=(SellItem) persistenceAdapter.getListingById(newId);
		assertEquals(newId,newListing.getListingId());
		assertEquals(Constants.listingTypeNameSellItem,newListing.getType());
		assertEquals(Constants.allItemConditions.get(0),newListing.getItemCondition());
		assertEquals(correctListingDataForSellItem.getLong(Constants.listingDataFieldCreateDate),newListing.getCreateDate().getTime(),1000);
		assertEquals("",newListing.getDescription());
		assertEquals("",newListing.getTitle());
		assertEquals("",newListing.getLocation());
		assertEquals((double) 0,newListing.getPrice(),0.001);
		assertEquals(Constants.listingKindOffering,newListing.getKind());
		assertTrue(newListing.isActive());
		assertNull(newListing.getExpiryDate());
		assertNull(newListing.getPicture());
		assertEquals((long)0,newListing.getOwner());
	}

}
