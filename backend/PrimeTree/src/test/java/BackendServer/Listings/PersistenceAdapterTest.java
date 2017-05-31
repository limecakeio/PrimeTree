package BackendServer.Listings;

import static org.junit.Assert.*;

import java.util.Date;

import org.json.JSONArray;
import org.json.JSONObject;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import BackendServer.Exceptions.ListingNotFoundException;
import BackendServer.Exceptions.WrongFormatException;
import BackendServer.Listings.Entities.BorrowRequest;
import BackendServer.Listings.Entities.PurchaseRequest;
import BackendServer.Listings.Entities.ReturningRecreationRequest;
import BackendServer.Listings.Entities.RideShareRequest;
import BackendServer.Listings.Entities.RideSharing;
import BackendServer.Listings.Entities.SellItem;
import BackendServer.Listings.Entities.ServiceOffering;
import BackendServer.Listings.Entities.SingleRecreationRequest;
import BackendServer.Listings.Repositories.SellItemRepository;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(classes={BackendServer.UserData.Configuration.UserBeanCollection.class,
BackendServer.Listings.ListingBeanCollection.class, BackendServer.ClientDatabaseAccess.Config.EmployeeBeanCollection.class})
public class PersistenceAdapterTest {
	
	@Autowired
	PersistenceAdapter persistenceAdapter;
	@Autowired
	SellItemRepository sellItemRepository;
	
	//These are all JSONObjects for testing persistNewListing with valid input:
	JSONObject 
	correctListingDataForSellItemCreateWithoutExtraFields,
	correctListingDataForSellItemCreateWithAllOptionalFieldsPlusOneAdditionalFieldFromTheFieldsListOfAnotherListingTypeThatShouldBeIgnored,
	correctListingDataForServiceOfferCreateWithNoOptionalFieldsExceptIsActiveAndPictureWhichShouldBeIgnored,
	correctListingDataForRideShareOfferCreateWithNoOptionalFields,
	correctListingDataForRideShareOfferCreateWithAllOptionalFields,
	correctListingDataForBorrowRequestCreateWithNoOptionalFields,
	correctListingDataForBorrowRequestCreateWithAllOptionalFieldsInBorrowRequest,
	correctListingDataForPurchaseRequestCreateWithNewConditionAndNoPicture,
	correctListingDataForPurchaseRequestCreateWithUsedConditionAndAPicture,
	correctListingDataForReturningRecreationRequestCreateWithNoOptionalField,
	correctListingDataForReturningRecreationRequestCreateWithAllOptionalFields,
	correctListingDataForSingleRecreationRequestCreateWithNoOptionalField,
	correctListingDataForSingleRecreationRequestCreateWithAllOptionalFields,
	correctListingDataForRideShareRequestCreateWithNoOptionalField,
	correctListingDataForRideShareRequestCreateWithAllOptionalFields;
	
	//And those are the ones for testing persistNewListing with invalid input:
	JSONObject
	listingDataForSellItemWithAnExistingListingTypeWhichIsNotSellItem,
	listingDataForSellItemWithAnNotExistingListingType,
	listingDataForSellItemWithMissingAttributeListingType,
	listingDataForSellItemWithMissingAttributeCreateDate,
	listingDataForSellItemWithMissingAttributeDescription,
	listingDataForSellItemWithMissingAttributeLocation,
	listingDataForSellItemWithMissingAttributeTitle,
	listingDataForSellItemWithMissingAttributePrice,
	listingDataForSellItemWithMissingAttributeCondition,
	listingDataForSellItemWithNotExistingCondition,
	listingDataWithWrongTypeOfOneRequiredField,
	listingDataWithWrongTypeOfOneOptionalField,
	listingDataForServiceOfferWithMissingAttributePrice,
	listingDataForRideShareOfferWithMissingAttributeFromLocation,
	listingDataForRideShareOfferWithMissingAttributeToLocation,
	listingDataForRideShareOfferWithMissingAttributeTravelDateAndTime,
	listingDataForPurchaseRequestWithMissingAttributeCondition,
	listingDataForPurchaseRequestWithNotExistingCondition,
	listingDataForReturningRecreationRequestWithMissingAttributeRegularity,
	listingDataForReturningRecreationRequestWithNotExistingRegularity,
	listingDataForReturningRecreationRequestWithMissingAttributeCategory,
	listingDataForReturningRecreationRequestWithNotExistingCategory,
	listingDataForRideShareRequestWithMissingAttributeFromLocation,
	listingDataForRideShareRequestWithMissingAttributeToLocation;
	
	@Before
	public void setup(){
		
		//These are all JSONObjects for testing persistNewListing with valid input
		correctListingDataForSellItemCreateWithoutExtraFields=new JSONObject();
		correctListingDataForSellItemCreateWithoutExtraFields.put(Constants.listingDataFieldListingType, Constants.listingTypeNameSellItem);
		correctListingDataForSellItemCreateWithoutExtraFields.put(Constants.listingDataFieldCreateDate, new Date().getTime());
		correctListingDataForSellItemCreateWithoutExtraFields.put(Constants.listingDataFieldDescription, "1");
		correctListingDataForSellItemCreateWithoutExtraFields.put(Constants.listingDataFieldTitle, "2");
		correctListingDataForSellItemCreateWithoutExtraFields.put(Constants.listingDataFieldLocation, "3");
		correctListingDataForSellItemCreateWithoutExtraFields.put(Constants.listingDataFieldCondition, Constants.allItemConditions.get(0));
		correctListingDataForSellItemCreateWithoutExtraFields.put(Constants.listingDataFieldPrice, (double) 0 );
		
		correctListingDataForSellItemCreateWithAllOptionalFieldsPlusOneAdditionalFieldFromTheFieldsListOfAnotherListingTypeThatShouldBeIgnored=new JSONObject();
		correctListingDataForSellItemCreateWithAllOptionalFieldsPlusOneAdditionalFieldFromTheFieldsListOfAnotherListingTypeThatShouldBeIgnored.put(Constants.listingDataFieldListingType, Constants.listingTypeNameSellItem);
		correctListingDataForSellItemCreateWithAllOptionalFieldsPlusOneAdditionalFieldFromTheFieldsListOfAnotherListingTypeThatShouldBeIgnored.put(Constants.listingDataFieldCreateDate, new Date().getTime());
		correctListingDataForSellItemCreateWithAllOptionalFieldsPlusOneAdditionalFieldFromTheFieldsListOfAnotherListingTypeThatShouldBeIgnored.put(Constants.listingDataFieldDescription, "1");
		correctListingDataForSellItemCreateWithAllOptionalFieldsPlusOneAdditionalFieldFromTheFieldsListOfAnotherListingTypeThatShouldBeIgnored.put(Constants.listingDataFieldTitle, "2");
		correctListingDataForSellItemCreateWithAllOptionalFieldsPlusOneAdditionalFieldFromTheFieldsListOfAnotherListingTypeThatShouldBeIgnored.put(Constants.listingDataFieldLocation, "3");
		correctListingDataForSellItemCreateWithAllOptionalFieldsPlusOneAdditionalFieldFromTheFieldsListOfAnotherListingTypeThatShouldBeIgnored.put(Constants.listingDataFieldCondition, Constants.allItemConditions.get(1));
		correctListingDataForSellItemCreateWithAllOptionalFieldsPlusOneAdditionalFieldFromTheFieldsListOfAnotherListingTypeThatShouldBeIgnored.put(Constants.listingDataFieldPrice, (double) 0 );
		correctListingDataForSellItemCreateWithAllOptionalFieldsPlusOneAdditionalFieldFromTheFieldsListOfAnotherListingTypeThatShouldBeIgnored.put(Constants.listingDataFieldActive, true);
		correctListingDataForSellItemCreateWithAllOptionalFieldsPlusOneAdditionalFieldFromTheFieldsListOfAnotherListingTypeThatShouldBeIgnored.put(Constants.listingDataFieldDeadLine, new Date().getTime()+1000000);
		correctListingDataForSellItemCreateWithAllOptionalFieldsPlusOneAdditionalFieldFromTheFieldsListOfAnotherListingTypeThatShouldBeIgnored.put(Constants.listingDataFieldImageGallery, new JSONArray().put("4"));
		correctListingDataForSellItemCreateWithAllOptionalFieldsPlusOneAdditionalFieldFromTheFieldsListOfAnotherListingTypeThatShouldBeIgnored.put(Constants.listingDataFieldPicture, "5");
		correctListingDataForSellItemCreateWithAllOptionalFieldsPlusOneAdditionalFieldFromTheFieldsListOfAnotherListingTypeThatShouldBeIgnored.put(Constants.listingDataFieldActivityLocation, "ShouldBeIgnored");
		
		correctListingDataForServiceOfferCreateWithNoOptionalFieldsExceptIsActiveAndPictureWhichShouldBeIgnored=new JSONObject();
		correctListingDataForServiceOfferCreateWithNoOptionalFieldsExceptIsActiveAndPictureWhichShouldBeIgnored.put(Constants.listingDataFieldListingType, Constants.listingTypeNameServiceOffering);
		correctListingDataForServiceOfferCreateWithNoOptionalFieldsExceptIsActiveAndPictureWhichShouldBeIgnored.put(Constants.listingDataFieldCreateDate, new Date().getTime());
		correctListingDataForServiceOfferCreateWithNoOptionalFieldsExceptIsActiveAndPictureWhichShouldBeIgnored.put(Constants.listingDataFieldDescription, "1");
		correctListingDataForServiceOfferCreateWithNoOptionalFieldsExceptIsActiveAndPictureWhichShouldBeIgnored.put(Constants.listingDataFieldTitle, "2");
		correctListingDataForServiceOfferCreateWithNoOptionalFieldsExceptIsActiveAndPictureWhichShouldBeIgnored.put(Constants.listingDataFieldLocation, "3");
		correctListingDataForServiceOfferCreateWithNoOptionalFieldsExceptIsActiveAndPictureWhichShouldBeIgnored.put(Constants.listingDataFieldPrice, (double) 0 );
		correctListingDataForServiceOfferCreateWithNoOptionalFieldsExceptIsActiveAndPictureWhichShouldBeIgnored.put(Constants.listingDataFieldActive, false );
		
		correctListingDataForRideShareOfferCreateWithNoOptionalFields=new JSONObject();
		correctListingDataForRideShareOfferCreateWithNoOptionalFields.put(Constants.listingDataFieldListingType, Constants.listingTypeNameRideSharing);
		correctListingDataForRideShareOfferCreateWithNoOptionalFields.put(Constants.listingDataFieldCreateDate, new Date().getTime());
		correctListingDataForRideShareOfferCreateWithNoOptionalFields.put(Constants.listingDataFieldDescription, "1");
		correctListingDataForRideShareOfferCreateWithNoOptionalFields.put(Constants.listingDataFieldTitle, "2");
		correctListingDataForRideShareOfferCreateWithNoOptionalFields.put(Constants.listingDataFieldLocation, "3");
		correctListingDataForRideShareOfferCreateWithNoOptionalFields.put(Constants.listingDataFieldFromLocation, "4");
		correctListingDataForRideShareOfferCreateWithNoOptionalFields.put(Constants.listingDataFieldToLocation, "5");
		correctListingDataForRideShareOfferCreateWithNoOptionalFields.put(Constants.listingDataFieldTravelDateAndTime, new Date().getTime()+1000000);
		
		correctListingDataForRideShareOfferCreateWithAllOptionalFields=new JSONObject();
		correctListingDataForRideShareOfferCreateWithAllOptionalFields.put(Constants.listingDataFieldListingType, Constants.listingTypeNameRideSharing);
		correctListingDataForRideShareOfferCreateWithAllOptionalFields.put(Constants.listingDataFieldCreateDate, new Date().getTime());
		correctListingDataForRideShareOfferCreateWithAllOptionalFields.put(Constants.listingDataFieldDescription, "1");
		correctListingDataForRideShareOfferCreateWithAllOptionalFields.put(Constants.listingDataFieldTitle, "2");
		correctListingDataForRideShareOfferCreateWithAllOptionalFields.put(Constants.listingDataFieldLocation, "3");
		correctListingDataForRideShareOfferCreateWithAllOptionalFields.put(Constants.listingDataFieldFromLocation, "4");
		correctListingDataForRideShareOfferCreateWithAllOptionalFields.put(Constants.listingDataFieldToLocation, "5");
		correctListingDataForRideShareOfferCreateWithAllOptionalFields.put(Constants.listingDataFieldTravelDateAndTime, new Date().getTime()+1000000);
		correctListingDataForRideShareOfferCreateWithAllOptionalFields.put(Constants.listingDataFieldAvailableSeats, 1);
		correctListingDataForRideShareOfferCreateWithAllOptionalFields.put(Constants.listingDataFieldJourneyStops, new JSONArray().put("6").put("7"));
		
		correctListingDataForBorrowRequestCreateWithNoOptionalFields=new JSONObject();
		correctListingDataForBorrowRequestCreateWithNoOptionalFields.put(Constants.listingDataFieldListingType, Constants.listingTypeNameBorrowRequest);
		correctListingDataForBorrowRequestCreateWithNoOptionalFields.put(Constants.listingDataFieldCreateDate, new Date().getTime());
		correctListingDataForBorrowRequestCreateWithNoOptionalFields.put(Constants.listingDataFieldDescription, "1");
		correctListingDataForBorrowRequestCreateWithNoOptionalFields.put(Constants.listingDataFieldTitle, "2");
		correctListingDataForBorrowRequestCreateWithNoOptionalFields.put(Constants.listingDataFieldLocation, "3");
		
		correctListingDataForBorrowRequestCreateWithAllOptionalFieldsInBorrowRequest=new JSONObject();
		correctListingDataForBorrowRequestCreateWithAllOptionalFieldsInBorrowRequest.put(Constants.listingDataFieldListingType, Constants.listingTypeNameBorrowRequest);
		correctListingDataForBorrowRequestCreateWithAllOptionalFieldsInBorrowRequest.put(Constants.listingDataFieldCreateDate, new Date().getTime());
		correctListingDataForBorrowRequestCreateWithAllOptionalFieldsInBorrowRequest.put(Constants.listingDataFieldDescription, "1");
		correctListingDataForBorrowRequestCreateWithAllOptionalFieldsInBorrowRequest.put(Constants.listingDataFieldTitle, "2");
		correctListingDataForBorrowRequestCreateWithAllOptionalFieldsInBorrowRequest.put(Constants.listingDataFieldLocation, "3");
		correctListingDataForBorrowRequestCreateWithAllOptionalFieldsInBorrowRequest.put(Constants.listingDataFieldBorrowFromDate, new Date().getTime()+10000000);
		correctListingDataForBorrowRequestCreateWithAllOptionalFieldsInBorrowRequest.put(Constants.listingDataFieldBorrowToDate, new Date().getTime()+20000000);
		correctListingDataForBorrowRequestCreateWithAllOptionalFieldsInBorrowRequest.put(Constants.listingDataFieldPicture, "4");
		
		correctListingDataForPurchaseRequestCreateWithNewConditionAndNoPicture=new JSONObject();
		correctListingDataForPurchaseRequestCreateWithNewConditionAndNoPicture.put(Constants.listingDataFieldListingType, Constants.listingTypeNamePurchaseRequest);
		correctListingDataForPurchaseRequestCreateWithNewConditionAndNoPicture.put(Constants.listingDataFieldCreateDate, new Date().getTime());
		correctListingDataForPurchaseRequestCreateWithNewConditionAndNoPicture.put(Constants.listingDataFieldDescription, "1");
		correctListingDataForPurchaseRequestCreateWithNewConditionAndNoPicture.put(Constants.listingDataFieldTitle, "2");
		correctListingDataForPurchaseRequestCreateWithNewConditionAndNoPicture.put(Constants.listingDataFieldLocation, "3");
		correctListingDataForPurchaseRequestCreateWithNewConditionAndNoPicture.put(Constants.listingDataFieldCondition, Constants.allItemConditions.get(0));
		
		correctListingDataForPurchaseRequestCreateWithUsedConditionAndAPicture=new JSONObject();
		correctListingDataForPurchaseRequestCreateWithUsedConditionAndAPicture.put(Constants.listingDataFieldListingType, Constants.listingTypeNamePurchaseRequest);
		correctListingDataForPurchaseRequestCreateWithUsedConditionAndAPicture.put(Constants.listingDataFieldCreateDate, new Date().getTime());
		correctListingDataForPurchaseRequestCreateWithUsedConditionAndAPicture.put(Constants.listingDataFieldDescription, "1");
		correctListingDataForPurchaseRequestCreateWithUsedConditionAndAPicture.put(Constants.listingDataFieldTitle, "2");
		correctListingDataForPurchaseRequestCreateWithUsedConditionAndAPicture.put(Constants.listingDataFieldLocation, "3");
		correctListingDataForPurchaseRequestCreateWithUsedConditionAndAPicture.put(Constants.listingDataFieldCondition, Constants.allItemConditions.get(1));
		correctListingDataForPurchaseRequestCreateWithUsedConditionAndAPicture.put(Constants.listingDataFieldPicture, "4");
		
		correctListingDataForReturningRecreationRequestCreateWithNoOptionalField=new JSONObject();
		correctListingDataForReturningRecreationRequestCreateWithNoOptionalField.put(Constants.listingDataFieldListingType, Constants.listingTypeNameReturningRecreationRequest);
		correctListingDataForReturningRecreationRequestCreateWithNoOptionalField.put(Constants.listingDataFieldCreateDate, new Date().getTime());
		correctListingDataForReturningRecreationRequestCreateWithNoOptionalField.put(Constants.listingDataFieldDescription, "1");
		correctListingDataForReturningRecreationRequestCreateWithNoOptionalField.put(Constants.listingDataFieldTitle, "2");
		correctListingDataForReturningRecreationRequestCreateWithNoOptionalField.put(Constants.listingDataFieldLocation, "3");
		correctListingDataForReturningRecreationRequestCreateWithNoOptionalField.put(Constants.listingDataFieldFreeTimeActivityCategory, Constants.allFreeTimeActivityCategories.get(0));
		correctListingDataForReturningRecreationRequestCreateWithNoOptionalField.put(Constants.listingDataFieldActivityLocation, "4");
		correctListingDataForReturningRecreationRequestCreateWithNoOptionalField.put(Constants.listingDataFieldRegularity, Constants.allRegularityOptions.get(0));
		
		correctListingDataForReturningRecreationRequestCreateWithAllOptionalFields=new JSONObject();
		correctListingDataForReturningRecreationRequestCreateWithAllOptionalFields.put(Constants.listingDataFieldListingType, Constants.listingTypeNameReturningRecreationRequest);
		correctListingDataForReturningRecreationRequestCreateWithAllOptionalFields.put(Constants.listingDataFieldCreateDate, new Date().getTime());
		correctListingDataForReturningRecreationRequestCreateWithAllOptionalFields.put(Constants.listingDataFieldDescription, "1");
		correctListingDataForReturningRecreationRequestCreateWithAllOptionalFields.put(Constants.listingDataFieldTitle, "2");
		correctListingDataForReturningRecreationRequestCreateWithAllOptionalFields.put(Constants.listingDataFieldLocation, "3");
		correctListingDataForReturningRecreationRequestCreateWithAllOptionalFields.put(Constants.listingDataFieldFreeTimeActivityCategory, Constants.allFreeTimeActivityCategories.get(0));
		correctListingDataForReturningRecreationRequestCreateWithAllOptionalFields.put(Constants.listingDataFieldActivityLocation, "4");
		correctListingDataForReturningRecreationRequestCreateWithAllOptionalFields.put(Constants.listingDataFieldPicture, "5");
		correctListingDataForReturningRecreationRequestCreateWithAllOptionalFields.put(Constants.listingDataFieldStartDate, new Date().getTime()+1000000);
		correctListingDataForReturningRecreationRequestCreateWithAllOptionalFields.put(Constants.listingDataFieldEndDate, new Date().getTime()+2000000);
		correctListingDataForReturningRecreationRequestCreateWithAllOptionalFields.put(Constants.listingDataFieldRegularity, Constants.allRegularityOptions.get(1));
		
		correctListingDataForSingleRecreationRequestCreateWithNoOptionalField=new JSONObject();
		correctListingDataForSingleRecreationRequestCreateWithNoOptionalField.put(Constants.listingDataFieldListingType, Constants.listingTypeNameSingleRecreationRequest);
		correctListingDataForSingleRecreationRequestCreateWithNoOptionalField.put(Constants.listingDataFieldCreateDate, new Date().getTime());
		correctListingDataForSingleRecreationRequestCreateWithNoOptionalField.put(Constants.listingDataFieldDescription, "1");
		correctListingDataForSingleRecreationRequestCreateWithNoOptionalField.put(Constants.listingDataFieldTitle, "2");
		correctListingDataForSingleRecreationRequestCreateWithNoOptionalField.put(Constants.listingDataFieldLocation, "3");
		correctListingDataForSingleRecreationRequestCreateWithNoOptionalField.put(Constants.listingDataFieldFreeTimeActivityCategory, Constants.allFreeTimeActivityCategories.get(0));
		correctListingDataForSingleRecreationRequestCreateWithNoOptionalField.put(Constants.listingDataFieldActivityLocation, "4");
		
		correctListingDataForSingleRecreationRequestCreateWithAllOptionalFields=new JSONObject();
		correctListingDataForSingleRecreationRequestCreateWithAllOptionalFields.put(Constants.listingDataFieldListingType, Constants.listingTypeNameSingleRecreationRequest);
		correctListingDataForSingleRecreationRequestCreateWithAllOptionalFields.put(Constants.listingDataFieldCreateDate, new Date().getTime());
		correctListingDataForSingleRecreationRequestCreateWithAllOptionalFields.put(Constants.listingDataFieldDescription, "1");
		correctListingDataForSingleRecreationRequestCreateWithAllOptionalFields.put(Constants.listingDataFieldTitle, "2");
		correctListingDataForSingleRecreationRequestCreateWithAllOptionalFields.put(Constants.listingDataFieldLocation, "3");
		correctListingDataForSingleRecreationRequestCreateWithAllOptionalFields.put(Constants.listingDataFieldFreeTimeActivityCategory, Constants.allFreeTimeActivityCategories.get(0));
		correctListingDataForSingleRecreationRequestCreateWithAllOptionalFields.put(Constants.listingDataFieldActivityLocation, "4");
		correctListingDataForSingleRecreationRequestCreateWithAllOptionalFields.put(Constants.listingDataFieldPicture, "5");
		correctListingDataForSingleRecreationRequestCreateWithAllOptionalFields.put(Constants.listingDataFieldHappeningDate, new Date().getTime()+100000);
		
		correctListingDataForRideShareRequestCreateWithNoOptionalField=new JSONObject();
		correctListingDataForRideShareRequestCreateWithNoOptionalField.put(Constants.listingDataFieldListingType, Constants.listingTypeNameRideShareRequest);
		correctListingDataForRideShareRequestCreateWithNoOptionalField.put(Constants.listingDataFieldCreateDate, new Date().getTime());
		correctListingDataForRideShareRequestCreateWithNoOptionalField.put(Constants.listingDataFieldDescription, "1");
		correctListingDataForRideShareRequestCreateWithNoOptionalField.put(Constants.listingDataFieldTitle, "2");
		correctListingDataForRideShareRequestCreateWithNoOptionalField.put(Constants.listingDataFieldLocation, "3");
		correctListingDataForRideShareRequestCreateWithNoOptionalField.put(Constants.listingDataFieldFromLocation, "4");
		correctListingDataForRideShareRequestCreateWithNoOptionalField.put(Constants.listingDataFieldToLocation, "5");
		
		correctListingDataForRideShareRequestCreateWithAllOptionalFields=new JSONObject();
		correctListingDataForRideShareRequestCreateWithAllOptionalFields.put(Constants.listingDataFieldListingType, Constants.listingTypeNameRideShareRequest);
		correctListingDataForRideShareRequestCreateWithAllOptionalFields.put(Constants.listingDataFieldCreateDate, new Date().getTime());
		correctListingDataForRideShareRequestCreateWithAllOptionalFields.put(Constants.listingDataFieldDescription, "1");
		correctListingDataForRideShareRequestCreateWithAllOptionalFields.put(Constants.listingDataFieldTitle, "2");
		correctListingDataForRideShareRequestCreateWithAllOptionalFields.put(Constants.listingDataFieldLocation, "3");
		correctListingDataForRideShareRequestCreateWithAllOptionalFields.put(Constants.listingDataFieldFromLocation, "4");
		correctListingDataForRideShareRequestCreateWithAllOptionalFields.put(Constants.listingDataFieldToLocation, "5");
		correctListingDataForRideShareRequestCreateWithAllOptionalFields.put(Constants.listingDataFieldTravelDateAndTime, new Date().getTime()+1000000);
		
		//These are all JSONObjects for testing persistNewListing with invalid input:
		
		listingDataForSellItemWithAnExistingListingTypeWhichIsNotSellItem=new JSONObject();
		listingDataForSellItemWithAnExistingListingTypeWhichIsNotSellItem.put(Constants.listingDataFieldListingType, Constants.listingTypeNameRideSharing);
		listingDataForSellItemWithAnExistingListingTypeWhichIsNotSellItem.put(Constants.listingDataFieldCreateDate, new Date().getTime());
		listingDataForSellItemWithAnExistingListingTypeWhichIsNotSellItem.put(Constants.listingDataFieldDescription, "1");
		listingDataForSellItemWithAnExistingListingTypeWhichIsNotSellItem.put(Constants.listingDataFieldTitle, "2");
		listingDataForSellItemWithAnExistingListingTypeWhichIsNotSellItem.put(Constants.listingDataFieldLocation, "3");
		listingDataForSellItemWithAnExistingListingTypeWhichIsNotSellItem.put(Constants.listingDataFieldCondition, Constants.allItemConditions.get(0));
		listingDataForSellItemWithAnExistingListingTypeWhichIsNotSellItem.put(Constants.listingDataFieldPrice, (double) 0 );
		
		listingDataForSellItemWithAnNotExistingListingType=new JSONObject();
		listingDataForSellItemWithAnNotExistingListingType.put(Constants.listingDataFieldListingType, "Gibt Es Nicht");
		listingDataForSellItemWithAnNotExistingListingType.put(Constants.listingDataFieldCreateDate, new Date().getTime());
		listingDataForSellItemWithAnNotExistingListingType.put(Constants.listingDataFieldDescription, "1");
		listingDataForSellItemWithAnNotExistingListingType.put(Constants.listingDataFieldTitle, "2");
		listingDataForSellItemWithAnNotExistingListingType.put(Constants.listingDataFieldLocation, "3");
		listingDataForSellItemWithAnNotExistingListingType.put(Constants.listingDataFieldCondition, Constants.allItemConditions.get(0));
		listingDataForSellItemWithAnNotExistingListingType.put(Constants.listingDataFieldPrice, (double) 0 );
		
		listingDataForSellItemWithMissingAttributeListingType=new JSONObject();
		listingDataForSellItemWithMissingAttributeListingType.put(Constants.listingDataFieldCreateDate, new Date().getTime());
		listingDataForSellItemWithMissingAttributeListingType.put(Constants.listingDataFieldDescription, "1");
		listingDataForSellItemWithMissingAttributeListingType.put(Constants.listingDataFieldTitle, "2");
		listingDataForSellItemWithMissingAttributeListingType.put(Constants.listingDataFieldLocation, "3");
		listingDataForSellItemWithMissingAttributeListingType.put(Constants.listingDataFieldCondition, Constants.allItemConditions.get(0));
		listingDataForSellItemWithMissingAttributeListingType.put(Constants.listingDataFieldPrice, (double) 0 );
		
		listingDataForSellItemWithMissingAttributeCreateDate=new JSONObject();
		listingDataForSellItemWithMissingAttributeCreateDate.put(Constants.listingDataFieldListingType, Constants.listingTypeNameSellItem);
		listingDataForSellItemWithMissingAttributeCreateDate.put(Constants.listingDataFieldDescription, "1");
		listingDataForSellItemWithMissingAttributeCreateDate.put(Constants.listingDataFieldTitle, "2");
		listingDataForSellItemWithMissingAttributeCreateDate.put(Constants.listingDataFieldLocation, "3");
		listingDataForSellItemWithMissingAttributeCreateDate.put(Constants.listingDataFieldCondition, Constants.allItemConditions.get(0));
		listingDataForSellItemWithMissingAttributeCreateDate.put(Constants.listingDataFieldPrice, (double) 0 );
		
		listingDataForSellItemWithMissingAttributeDescription=new JSONObject();
		listingDataForSellItemWithMissingAttributeDescription.put(Constants.listingDataFieldListingType, Constants.listingTypeNameSellItem);
		listingDataForSellItemWithMissingAttributeDescription.put(Constants.listingDataFieldCreateDate, new Date().getTime());
		listingDataForSellItemWithMissingAttributeDescription.put(Constants.listingDataFieldTitle, "2");
		listingDataForSellItemWithMissingAttributeDescription.put(Constants.listingDataFieldLocation, "3");
		listingDataForSellItemWithMissingAttributeDescription.put(Constants.listingDataFieldCondition, Constants.allItemConditions.get(0));
		listingDataForSellItemWithMissingAttributeDescription.put(Constants.listingDataFieldPrice, (double) 0 );
		
		listingDataForSellItemWithMissingAttributeLocation=new JSONObject();
		listingDataForSellItemWithMissingAttributeLocation.put(Constants.listingDataFieldListingType, Constants.listingTypeNameSellItem);
		listingDataForSellItemWithMissingAttributeLocation.put(Constants.listingDataFieldCreateDate, new Date().getTime());
		listingDataForSellItemWithMissingAttributeLocation.put(Constants.listingDataFieldDescription, "1");
		listingDataForSellItemWithMissingAttributeLocation.put(Constants.listingDataFieldTitle, "2");
		listingDataForSellItemWithMissingAttributeLocation.put(Constants.listingDataFieldCondition, Constants.allItemConditions.get(0));
		listingDataForSellItemWithMissingAttributeLocation.put(Constants.listingDataFieldPrice, (double) 0 );
		
		listingDataForSellItemWithMissingAttributeTitle=new JSONObject();
		listingDataForSellItemWithMissingAttributeTitle.put(Constants.listingDataFieldListingType, Constants.listingTypeNameSellItem);
		listingDataForSellItemWithMissingAttributeTitle.put(Constants.listingDataFieldCreateDate, new Date().getTime());
		listingDataForSellItemWithMissingAttributeTitle.put(Constants.listingDataFieldDescription, "1");
		listingDataForSellItemWithMissingAttributeTitle.put(Constants.listingDataFieldLocation, "3");
		listingDataForSellItemWithMissingAttributeTitle.put(Constants.listingDataFieldCondition, Constants.allItemConditions.get(0));
		listingDataForSellItemWithMissingAttributeTitle.put(Constants.listingDataFieldPrice, (double) 0 );
		
		listingDataForSellItemWithMissingAttributePrice=new JSONObject();
		listingDataForSellItemWithMissingAttributePrice.put(Constants.listingDataFieldListingType, Constants.listingTypeNameSellItem);
		listingDataForSellItemWithMissingAttributePrice.put(Constants.listingDataFieldCreateDate, new Date().getTime());
		listingDataForSellItemWithMissingAttributePrice.put(Constants.listingDataFieldDescription, "1");
		listingDataForSellItemWithMissingAttributePrice.put(Constants.listingDataFieldTitle, "2");
		listingDataForSellItemWithMissingAttributePrice.put(Constants.listingDataFieldLocation, "3");
		listingDataForSellItemWithMissingAttributePrice.put(Constants.listingDataFieldCondition, Constants.allItemConditions.get(0));
		
		listingDataForSellItemWithMissingAttributeCondition=new JSONObject();
		listingDataForSellItemWithMissingAttributeCondition.put(Constants.listingDataFieldListingType, Constants.listingTypeNameSellItem);
		listingDataForSellItemWithMissingAttributeCondition.put(Constants.listingDataFieldCreateDate, new Date().getTime());
		listingDataForSellItemWithMissingAttributeCondition.put(Constants.listingDataFieldDescription, "1");
		listingDataForSellItemWithMissingAttributeCondition.put(Constants.listingDataFieldTitle, "2");
		listingDataForSellItemWithMissingAttributeCondition.put(Constants.listingDataFieldLocation, "3");
		listingDataForSellItemWithMissingAttributeCondition.put(Constants.listingDataFieldPrice, (double) 0 );
		
		listingDataForSellItemWithNotExistingCondition=new JSONObject();
		listingDataForSellItemWithNotExistingCondition.put(Constants.listingDataFieldListingType, Constants.listingTypeNameSellItem);
		listingDataForSellItemWithNotExistingCondition.put(Constants.listingDataFieldCreateDate, new Date().getTime());
		listingDataForSellItemWithNotExistingCondition.put(Constants.listingDataFieldDescription, "1");
		listingDataForSellItemWithNotExistingCondition.put(Constants.listingDataFieldTitle, "2");
		listingDataForSellItemWithNotExistingCondition.put(Constants.listingDataFieldLocation, "3");
		listingDataForSellItemWithNotExistingCondition.put(Constants.listingDataFieldCondition, "Gibt es nicht");
		listingDataForSellItemWithNotExistingCondition.put(Constants.listingDataFieldPrice, (double) 0 );
		
		listingDataWithWrongTypeOfOneRequiredField=new JSONObject();
		listingDataWithWrongTypeOfOneRequiredField.put(Constants.listingDataFieldListingType, Constants.listingTypeNameSellItem);
		listingDataWithWrongTypeOfOneRequiredField.put(Constants.listingDataFieldCreateDate, new Date().getTime());
		listingDataWithWrongTypeOfOneRequiredField.put(Constants.listingDataFieldDescription, "1");
		listingDataWithWrongTypeOfOneRequiredField.put(Constants.listingDataFieldTitle, 2);
		listingDataWithWrongTypeOfOneRequiredField.put(Constants.listingDataFieldLocation, "3");
		listingDataWithWrongTypeOfOneRequiredField.put(Constants.listingDataFieldCondition, Constants.allItemConditions.get(0));
		listingDataWithWrongTypeOfOneRequiredField.put(Constants.listingDataFieldPrice, (double) 0 );
		
		listingDataWithWrongTypeOfOneOptionalField=new JSONObject();
		listingDataWithWrongTypeOfOneOptionalField.put(Constants.listingDataFieldListingType, Constants.listingTypeNameSellItem);
		listingDataWithWrongTypeOfOneOptionalField.put(Constants.listingDataFieldCreateDate, new Date().getTime());
		listingDataWithWrongTypeOfOneOptionalField.put(Constants.listingDataFieldDescription, "1");
		listingDataWithWrongTypeOfOneOptionalField.put(Constants.listingDataFieldTitle, 2);
		listingDataWithWrongTypeOfOneOptionalField.put(Constants.listingDataFieldLocation, "3");
		listingDataWithWrongTypeOfOneOptionalField.put(Constants.listingDataFieldCondition, Constants.allItemConditions.get(0));
		listingDataWithWrongTypeOfOneOptionalField.put(Constants.listingDataFieldPrice, (double) 0 );
		listingDataWithWrongTypeOfOneOptionalField.put(Constants.listingDataFieldDeadLine, "Kein Long");
		
		listingDataForServiceOfferWithMissingAttributePrice=new JSONObject();
		listingDataForServiceOfferWithMissingAttributePrice.put(Constants.listingDataFieldListingType, Constants.listingTypeNameServiceOffering);
		listingDataForServiceOfferWithMissingAttributePrice.put(Constants.listingDataFieldCreateDate, new Date().getTime());
		listingDataForServiceOfferWithMissingAttributePrice.put(Constants.listingDataFieldDescription, "1");
		listingDataForServiceOfferWithMissingAttributePrice.put(Constants.listingDataFieldTitle, "2");
		listingDataForServiceOfferWithMissingAttributePrice.put(Constants.listingDataFieldLocation, "3");
		
		listingDataForRideShareOfferWithMissingAttributeFromLocation=new JSONObject();
		listingDataForRideShareOfferWithMissingAttributeFromLocation.put(Constants.listingDataFieldListingType, Constants.listingTypeNameRideSharing);
		listingDataForRideShareOfferWithMissingAttributeFromLocation.put(Constants.listingDataFieldCreateDate, new Date().getTime());
		listingDataForRideShareOfferWithMissingAttributeFromLocation.put(Constants.listingDataFieldDescription, "1");
		listingDataForRideShareOfferWithMissingAttributeFromLocation.put(Constants.listingDataFieldTitle, "2");
		listingDataForRideShareOfferWithMissingAttributeFromLocation.put(Constants.listingDataFieldLocation, "3");
		listingDataForRideShareOfferWithMissingAttributeFromLocation.put(Constants.listingDataFieldToLocation, "4");
		listingDataForRideShareOfferWithMissingAttributeFromLocation.put(Constants.listingDataFieldTravelDateAndTime, new Date().getTime()+100000);
		
		listingDataForRideShareOfferWithMissingAttributeToLocation=new JSONObject();
		listingDataForRideShareOfferWithMissingAttributeToLocation.put(Constants.listingDataFieldListingType, Constants.listingTypeNameRideSharing);
		listingDataForRideShareOfferWithMissingAttributeToLocation.put(Constants.listingDataFieldCreateDate, new Date().getTime());
		listingDataForRideShareOfferWithMissingAttributeToLocation.put(Constants.listingDataFieldDescription, "1");
		listingDataForRideShareOfferWithMissingAttributeToLocation.put(Constants.listingDataFieldTitle, "2");
		listingDataForRideShareOfferWithMissingAttributeToLocation.put(Constants.listingDataFieldLocation, "3");
		listingDataForRideShareOfferWithMissingAttributeToLocation.put(Constants.listingDataFieldFromLocation, "4");
		listingDataForRideShareOfferWithMissingAttributeToLocation.put(Constants.listingDataFieldTravelDateAndTime, new Date().getTime()+100000);
		
		listingDataForRideShareOfferWithMissingAttributeTravelDateAndTime=new JSONObject();
		listingDataForRideShareOfferWithMissingAttributeTravelDateAndTime.put(Constants.listingDataFieldListingType, Constants.listingTypeNameRideSharing);
		listingDataForRideShareOfferWithMissingAttributeTravelDateAndTime.put(Constants.listingDataFieldCreateDate, new Date().getTime());
		listingDataForRideShareOfferWithMissingAttributeTravelDateAndTime.put(Constants.listingDataFieldDescription, "1");
		listingDataForRideShareOfferWithMissingAttributeTravelDateAndTime.put(Constants.listingDataFieldTitle, "2");
		listingDataForRideShareOfferWithMissingAttributeTravelDateAndTime.put(Constants.listingDataFieldLocation, "3");
		listingDataForRideShareOfferWithMissingAttributeTravelDateAndTime.put(Constants.listingDataFieldFromLocation, "4");
		listingDataForRideShareOfferWithMissingAttributeTravelDateAndTime.put(Constants.listingDataFieldToLocation, "5");
		
		listingDataForPurchaseRequestWithMissingAttributeCondition=new JSONObject();
		listingDataForPurchaseRequestWithMissingAttributeCondition.put(Constants.listingDataFieldListingType, Constants.listingTypeNamePurchaseRequest);
		listingDataForPurchaseRequestWithMissingAttributeCondition.put(Constants.listingDataFieldCreateDate, new Date().getTime());
		listingDataForPurchaseRequestWithMissingAttributeCondition.put(Constants.listingDataFieldDescription, "1");
		listingDataForPurchaseRequestWithMissingAttributeCondition.put(Constants.listingDataFieldTitle, "2");
		listingDataForPurchaseRequestWithMissingAttributeCondition.put(Constants.listingDataFieldLocation, "3");
		
		listingDataForPurchaseRequestWithNotExistingCondition=new JSONObject();
		listingDataForPurchaseRequestWithNotExistingCondition.put(Constants.listingDataFieldListingType, Constants.listingTypeNamePurchaseRequest);
		listingDataForPurchaseRequestWithNotExistingCondition.put(Constants.listingDataFieldCreateDate, new Date().getTime());
		listingDataForPurchaseRequestWithNotExistingCondition.put(Constants.listingDataFieldDescription, "1");
		listingDataForPurchaseRequestWithNotExistingCondition.put(Constants.listingDataFieldTitle, "2");
		listingDataForPurchaseRequestWithNotExistingCondition.put(Constants.listingDataFieldLocation, "3");
		listingDataForPurchaseRequestWithNotExistingCondition.put(Constants.listingDataFieldCondition, "Gibt es nicht");
		
		listingDataForReturningRecreationRequestWithMissingAttributeRegularity=new JSONObject();
		listingDataForReturningRecreationRequestWithMissingAttributeRegularity.put(Constants.listingDataFieldListingType, Constants.listingTypeNameReturningRecreationRequest);
		listingDataForReturningRecreationRequestWithMissingAttributeRegularity.put(Constants.listingDataFieldCreateDate, new Date().getTime());
		listingDataForReturningRecreationRequestWithMissingAttributeRegularity.put(Constants.listingDataFieldDescription, "1");
		listingDataForReturningRecreationRequestWithMissingAttributeRegularity.put(Constants.listingDataFieldTitle, "2");
		listingDataForReturningRecreationRequestWithMissingAttributeRegularity.put(Constants.listingDataFieldLocation, "3");
		listingDataForReturningRecreationRequestWithMissingAttributeRegularity.put(Constants.listingDataFieldFreeTimeActivityCategory, Constants.allFreeTimeActivityCategories.get(0));
		listingDataForReturningRecreationRequestWithMissingAttributeRegularity.put(Constants.listingDataFieldActivityLocation, "4");
		
		listingDataForReturningRecreationRequestWithNotExistingRegularity=new JSONObject();
		listingDataForReturningRecreationRequestWithMissingAttributeRegularity.put(Constants.listingDataFieldListingType, Constants.listingTypeNameReturningRecreationRequest);
		listingDataForReturningRecreationRequestWithMissingAttributeRegularity.put(Constants.listingDataFieldCreateDate, new Date().getTime());
		listingDataForReturningRecreationRequestWithMissingAttributeRegularity.put(Constants.listingDataFieldDescription, "1");
		listingDataForReturningRecreationRequestWithMissingAttributeRegularity.put(Constants.listingDataFieldTitle, "2");
		listingDataForReturningRecreationRequestWithMissingAttributeRegularity.put(Constants.listingDataFieldLocation, "3");
		listingDataForReturningRecreationRequestWithMissingAttributeRegularity.put(Constants.listingDataFieldFreeTimeActivityCategory, Constants.allFreeTimeActivityCategories.get(0));
		listingDataForReturningRecreationRequestWithMissingAttributeRegularity.put(Constants.listingDataFieldActivityLocation, "4");
		listingDataForReturningRecreationRequestWithMissingAttributeRegularity.put(Constants.listingDataFieldRegularity, "Gibt es nicht");
		
		listingDataForReturningRecreationRequestWithMissingAttributeCategory=new JSONObject();
		listingDataForReturningRecreationRequestWithMissingAttributeCategory.put(Constants.listingDataFieldListingType, Constants.listingTypeNameReturningRecreationRequest);
		listingDataForReturningRecreationRequestWithMissingAttributeCategory.put(Constants.listingDataFieldCreateDate, new Date().getTime());
		listingDataForReturningRecreationRequestWithMissingAttributeCategory.put(Constants.listingDataFieldDescription, "1");
		listingDataForReturningRecreationRequestWithMissingAttributeCategory.put(Constants.listingDataFieldTitle, "2");
		listingDataForReturningRecreationRequestWithMissingAttributeCategory.put(Constants.listingDataFieldLocation, "3");
		listingDataForReturningRecreationRequestWithMissingAttributeCategory.put(Constants.listingDataFieldActivityLocation, "4");
		listingDataForReturningRecreationRequestWithMissingAttributeCategory.put(Constants.listingDataFieldRegularity, Constants.allRegularityOptions.get(0));
		
		listingDataForReturningRecreationRequestWithNotExistingCategory=new JSONObject();
		listingDataForReturningRecreationRequestWithNotExistingCategory.put(Constants.listingDataFieldListingType, Constants.listingTypeNameReturningRecreationRequest);
		listingDataForReturningRecreationRequestWithNotExistingCategory.put(Constants.listingDataFieldCreateDate, new Date().getTime());
		listingDataForReturningRecreationRequestWithNotExistingCategory.put(Constants.listingDataFieldDescription, "1");
		listingDataForReturningRecreationRequestWithNotExistingCategory.put(Constants.listingDataFieldTitle, "2");
		listingDataForReturningRecreationRequestWithNotExistingCategory.put(Constants.listingDataFieldLocation, "3");
		listingDataForReturningRecreationRequestWithNotExistingCategory.put(Constants.listingDataFieldFreeTimeActivityCategory, "Gibt es nicht");
		listingDataForReturningRecreationRequestWithNotExistingCategory.put(Constants.listingDataFieldActivityLocation, "4");
		listingDataForReturningRecreationRequestWithNotExistingCategory.put(Constants.listingDataFieldRegularity, Constants.allRegularityOptions.get(0));
		
		listingDataForRideShareRequestWithMissingAttributeFromLocation=new JSONObject();
		listingDataForRideShareRequestWithMissingAttributeFromLocation.put(Constants.listingDataFieldListingType, Constants.listingTypeNameRideSharing);
		listingDataForRideShareRequestWithMissingAttributeFromLocation.put(Constants.listingDataFieldCreateDate, new Date().getTime());
		listingDataForRideShareRequestWithMissingAttributeFromLocation.put(Constants.listingDataFieldDescription, "1");
		listingDataForRideShareRequestWithMissingAttributeFromLocation.put(Constants.listingDataFieldTitle, "2");
		listingDataForRideShareRequestWithMissingAttributeFromLocation.put(Constants.listingDataFieldLocation, "3");
		listingDataForRideShareRequestWithMissingAttributeFromLocation.put(Constants.listingDataFieldToLocation, "4");
		listingDataForRideShareRequestWithMissingAttributeFromLocation.put(Constants.listingDataFieldTravelDateAndTime, new Date().getTime()+100000);
		
		listingDataForRideShareRequestWithMissingAttributeToLocation=new JSONObject();
		listingDataForRideShareRequestWithMissingAttributeToLocation.put(Constants.listingDataFieldListingType, Constants.listingTypeNameRideSharing);
		listingDataForRideShareRequestWithMissingAttributeToLocation.put(Constants.listingDataFieldCreateDate, new Date().getTime());
		listingDataForRideShareRequestWithMissingAttributeToLocation.put(Constants.listingDataFieldDescription, "1");
		listingDataForRideShareRequestWithMissingAttributeToLocation.put(Constants.listingDataFieldTitle, "2");
		listingDataForRideShareRequestWithMissingAttributeToLocation.put(Constants.listingDataFieldLocation, "3");
		listingDataForRideShareRequestWithMissingAttributeToLocation.put(Constants.listingDataFieldFromLocation, "4");
		listingDataForRideShareRequestWithMissingAttributeToLocation.put(Constants.listingDataFieldTravelDateAndTime, new Date().getTime()+100000);
	}
	
	//These are all Test that try out persistNewListing with valid input
	@Test
	public void createNewWithCorrectValuesAndNoExtraFields() throws WrongFormatException, ListingNotFoundException{
		long newId=persistenceAdapter.persistNewListing(correctListingDataForSellItemCreateWithoutExtraFields, 0);
		SellItem newListing=(SellItem) persistenceAdapter.getListingById(newId);
		assertEquals(newId,newListing.getListingId());
		assertEquals(Constants.listingTypeNameSellItem,newListing.getType());
		assertEquals(Constants.allItemConditions.get(0),newListing.getItemCondition());
		assertEquals(correctListingDataForSellItemCreateWithoutExtraFields.getLong(Constants.listingDataFieldCreateDate),newListing.getCreateDate().getTime(),60000);
		assertEquals("1",newListing.getDescription());
		assertEquals("2",newListing.getTitle());
		assertEquals("3",newListing.getLocation());
		assertEquals((double) 0,newListing.getPrice(),0.001);
		assertEquals(Constants.listingKindOffering,newListing.getKind());
		assertTrue(newListing.isActive());
		assertNull(newListing.getExpiryDate());
		assertNull(newListing.getPicture());
		assertEquals((long)0,newListing.getOwner());
	}
	
	@Test
	public void createNewWithCorrectValuesAndAllOptionalFieldsPlusOneAdditionalFieldFromTheFieldsListOfAnotherListingTypeThatShouldBeIgnored() throws WrongFormatException, ListingNotFoundException{
		long newId=persistenceAdapter.persistNewListing(correctListingDataForSellItemCreateWithAllOptionalFieldsPlusOneAdditionalFieldFromTheFieldsListOfAnotherListingTypeThatShouldBeIgnored, 0);
		SellItem newListing=(SellItem) persistenceAdapter.getListingById(newId);
		assertEquals(newId,newListing.getListingId());
		assertEquals(Constants.listingTypeNameSellItem,newListing.getType());
		assertEquals(Constants.allItemConditions.get(1),newListing.getItemCondition());
		assertEquals(correctListingDataForSellItemCreateWithAllOptionalFieldsPlusOneAdditionalFieldFromTheFieldsListOfAnotherListingTypeThatShouldBeIgnored.getLong(Constants.listingDataFieldCreateDate),newListing.getCreateDate().getTime(),60000);
		assertEquals("1",newListing.getDescription());
		assertEquals("2",newListing.getTitle());
		assertEquals("3",newListing.getLocation());
		assertEquals((double) 0,newListing.getPrice(),0.001);
		assertEquals(Constants.listingKindOffering,newListing.getKind());
		assertTrue(newListing.isActive());
		assertEquals(correctListingDataForSellItemCreateWithAllOptionalFieldsPlusOneAdditionalFieldFromTheFieldsListOfAnotherListingTypeThatShouldBeIgnored.getLong(Constants.listingDataFieldDeadLine), newListing.getExpiryDate().getTime(),60000);
		assertNull(newListing.getPicture());
		assertEquals((long)0,newListing.getOwner());
	}
	
	@Test
	public void createNewWithCorrectValuesAndNoOptionalFieldExceptIsActiveAndPictureWhichShouldBeIgnored() throws WrongFormatException, ListingNotFoundException{
		long newId=persistenceAdapter.persistNewListing(correctListingDataForServiceOfferCreateWithNoOptionalFieldsExceptIsActiveAndPictureWhichShouldBeIgnored, 0);
		ServiceOffering newListing=(ServiceOffering) persistenceAdapter.getListingById(newId);
		assertEquals(newId,newListing.getListingId());
		assertEquals(Constants.listingTypeNameServiceOffering,newListing.getType());
		assertEquals(correctListingDataForServiceOfferCreateWithNoOptionalFieldsExceptIsActiveAndPictureWhichShouldBeIgnored.getLong(Constants.listingDataFieldCreateDate),newListing.getCreateDate().getTime(),60000);
		assertEquals("1",newListing.getDescription());
		assertEquals("2",newListing.getTitle());
		assertEquals("3",newListing.getLocation());
		assertEquals((double) 0,newListing.getPrice(),0.001);
		assertEquals(Constants.listingKindOffering,newListing.getKind());
		assertFalse(newListing.isActive());
		assertNull(newListing.getPicture());
		assertEquals((long)0,newListing.getOwner());
	}
	
	@Test
	public void createNewWithcorrectListingDataForRideShareOfferCreateWithNoOptionalFields() throws WrongFormatException, ListingNotFoundException{
		long newId=persistenceAdapter.persistNewListing(correctListingDataForRideShareOfferCreateWithNoOptionalFields, 0);
		RideSharing newListing=(RideSharing) persistenceAdapter.getListingById(newId);
		assertEquals(newId,newListing.getListingId());
		assertEquals(Constants.listingTypeNameRideSharing,newListing.getType());
		assertEquals(correctListingDataForRideShareOfferCreateWithNoOptionalFields.getLong(Constants.listingDataFieldCreateDate),newListing.getCreateDate().getTime(),600000);
		assertEquals(correctListingDataForRideShareOfferCreateWithNoOptionalFields.getLong(Constants.listingDataFieldTravelDateAndTime),newListing.getTravelDateAndTime().getTime(),60000);
		assertEquals("1",newListing.getDescription());
		assertEquals("2",newListing.getTitle());
		assertEquals("3",newListing.getLocation());
		assertEquals("4",newListing.getFromLocation());
		assertEquals("5",newListing.getToLocation());
		assertEquals(Constants.listingKindOffering,newListing.getKind());
		assertTrue(newListing.isActive());
		assertNull(newListing.getExpiryDate());
		assertEquals(0,newListing.getJourneyStops().size());
		assertEquals((long)0,newListing.getOwner());
	}
	
	@Test
	public void createNewWithcorrectListingDataForRideShareOfferCreateWithAllOptionalFields() throws WrongFormatException, ListingNotFoundException{
		long newId=persistenceAdapter.persistNewListing(correctListingDataForRideShareOfferCreateWithAllOptionalFields, 0);
		RideSharing newListing=(RideSharing) persistenceAdapter.getListingById(newId);
		assertEquals(newId,newListing.getListingId());
		assertEquals(Constants.listingTypeNameRideSharing,newListing.getType());
		assertEquals(correctListingDataForRideShareOfferCreateWithAllOptionalFields.getLong(Constants.listingDataFieldCreateDate),newListing.getCreateDate().getTime(),600000);
		assertEquals(correctListingDataForRideShareOfferCreateWithAllOptionalFields.getLong(Constants.listingDataFieldTravelDateAndTime),newListing.getTravelDateAndTime().getTime(),600000);
		assertEquals("1",newListing.getDescription());
		assertEquals("2",newListing.getTitle());
		assertEquals("3",newListing.getLocation());
		assertEquals("4",newListing.getFromLocation());
		assertEquals("5",newListing.getToLocation());
		assertEquals(Constants.listingKindOffering,newListing.getKind());
		assertTrue(newListing.isActive());
		assertNull(newListing.getExpiryDate());
		assertEquals("6",newListing.getJourneyStops().get(0));
		assertEquals("7",newListing.getJourneyStops().get(1));
		assertEquals((long)0,newListing.getOwner());
	}
	
	@Test
	public void createNewWithCorrectListingDataForBorrowRequestCreateWithNoOptionalFields() throws WrongFormatException, ListingNotFoundException{
		long newId=persistenceAdapter.persistNewListing(correctListingDataForBorrowRequestCreateWithNoOptionalFields, 0);
		BorrowRequest newListing=(BorrowRequest) persistenceAdapter.getListingById(newId);
		assertEquals(newId,newListing.getListingId());
		assertEquals(Constants.listingTypeNameBorrowRequest,newListing.getType());
		assertEquals(correctListingDataForBorrowRequestCreateWithNoOptionalFields.getLong(Constants.listingDataFieldCreateDate),newListing.getCreateDate().getTime(),60000);
		assertEquals("1",newListing.getDescription());
		assertEquals("2",newListing.getTitle());
		assertEquals("3",newListing.getLocation());
		assertNull(newListing.getBorrowFromDate());
		assertNull(newListing.getBorrowToDate());
		assertEquals(Constants.listingKindRequest,newListing.getKind());
		assertTrue(newListing.isActive());
		assertNull(newListing.getExpiryDate());
		assertNull(newListing.getPicture());
		assertEquals((long)0,newListing.getOwner());
	}
	
	@Test
	public void createNewWithCorrectListingDataForBorrowRequestCreateWithAllOptionalFieldsInBorrowRequest() throws WrongFormatException, ListingNotFoundException{
		long newId=persistenceAdapter.persistNewListing(correctListingDataForBorrowRequestCreateWithAllOptionalFieldsInBorrowRequest, 0);
		BorrowRequest newListing=(BorrowRequest) persistenceAdapter.getListingById(newId);
		assertEquals(newId,newListing.getListingId());
		assertEquals(Constants.listingTypeNameBorrowRequest,newListing.getType());
		assertEquals(correctListingDataForBorrowRequestCreateWithAllOptionalFieldsInBorrowRequest.getLong(Constants.listingDataFieldCreateDate),newListing.getCreateDate().getTime(),60000);
		assertEquals("1",newListing.getDescription());
		assertEquals("2",newListing.getTitle());
		assertEquals("3",newListing.getLocation());
		assertEquals(correctListingDataForBorrowRequestCreateWithAllOptionalFieldsInBorrowRequest.getLong(Constants.listingDataFieldBorrowFromDate),newListing.getBorrowFromDate().getTime(),60000);
		assertEquals(correctListingDataForBorrowRequestCreateWithAllOptionalFieldsInBorrowRequest.getLong(Constants.listingDataFieldBorrowToDate),newListing.getBorrowToDate().getTime(),60000);
		assertEquals(Constants.listingKindRequest,newListing.getKind());
		assertTrue(newListing.isActive());
		assertNull(newListing.getExpiryDate());
		assertNull(newListing.getPicture());
		assertEquals((long)0,newListing.getOwner());
	}
	
	@Test
	public void createNewWithCorrectListingDataForPurchaseRequestCreateWithNewConditionAndNoPicture() throws WrongFormatException, ListingNotFoundException{
		long newId=persistenceAdapter.persistNewListing(correctListingDataForPurchaseRequestCreateWithNewConditionAndNoPicture, 0);
		PurchaseRequest newListing=(PurchaseRequest) persistenceAdapter.getListingById(newId);
		assertEquals(newId,newListing.getListingId());
		assertEquals(Constants.listingTypeNamePurchaseRequest,newListing.getType());
		assertEquals(Constants.allItemConditions.get(0),newListing.getItemCondition());
		assertEquals(correctListingDataForPurchaseRequestCreateWithNewConditionAndNoPicture.getLong(Constants.listingDataFieldCreateDate),newListing.getCreateDate().getTime(),60000);
		assertEquals("1",newListing.getDescription());
		assertEquals("2",newListing.getTitle());
		assertEquals("3",newListing.getLocation());
		assertEquals(Constants.listingKindRequest,newListing.getKind());
		assertTrue(newListing.isActive());
		assertNull(newListing.getExpiryDate());
		assertNull(newListing.getPicture());
		assertEquals((long)0,newListing.getOwner());
	}
	
	@Test
	public void createNewWithCorrectListingDataForPurchaseRequestCreateWithUsedConditionAndAPicture() throws WrongFormatException, ListingNotFoundException{
		long newId=persistenceAdapter.persistNewListing(correctListingDataForPurchaseRequestCreateWithUsedConditionAndAPicture, 0);
		PurchaseRequest newListing=(PurchaseRequest) persistenceAdapter.getListingById(newId);
		assertEquals(newId,newListing.getListingId());
		assertEquals(Constants.listingTypeNamePurchaseRequest,newListing.getType());
		assertEquals(Constants.allItemConditions.get(1),newListing.getItemCondition());
		assertEquals(correctListingDataForPurchaseRequestCreateWithUsedConditionAndAPicture.getLong(Constants.listingDataFieldCreateDate),newListing.getCreateDate().getTime(),60000);
		assertEquals("1",newListing.getDescription());
		assertEquals("2",newListing.getTitle());
		assertEquals("3",newListing.getLocation());
		assertEquals(Constants.listingKindRequest,newListing.getKind());
		assertTrue(newListing.isActive());
		assertNull(newListing.getExpiryDate());
		assertNull(newListing.getPicture());
		assertEquals((long)0,newListing.getOwner());
	}
	
	@Test
	public void createNewWithCorrectListingDataForReturningRecreationRequestCreateWithNoOptionalField() throws WrongFormatException, ListingNotFoundException{
		long newId=persistenceAdapter.persistNewListing(correctListingDataForReturningRecreationRequestCreateWithNoOptionalField, 0);
		ReturningRecreationRequest newListing=(ReturningRecreationRequest) persistenceAdapter.getListingById(newId);
		assertEquals(newId,newListing.getListingId());
		assertEquals(Constants.listingTypeNameReturningRecreationRequest,newListing.getType());
		assertEquals(correctListingDataForReturningRecreationRequestCreateWithNoOptionalField.getLong(Constants.listingDataFieldCreateDate),newListing.getCreateDate().getTime(),60000);
		assertEquals("1",newListing.getDescription());
		assertEquals("2",newListing.getTitle());
		assertEquals("3",newListing.getLocation());
		assertEquals(Constants.listingKindRequest,newListing.getKind());
		assertEquals(Constants.allFreeTimeActivityCategories.get(0),newListing.getCategory());
		assertEquals("4",newListing.getActivityLocation());
		assertEquals(Constants.allRegularityOptions.get(0),newListing.getRegularity());
		assertTrue(newListing.isActive());
		assertNull(newListing.getExpiryDate());
		assertNull(newListing.getPicture());
		assertEquals((long)0,newListing.getOwner());
	}
	
	@Test
	public void createNewWithCorrectListingDataForReturningRecreationRequestCreateWithAllOptionalFields() throws WrongFormatException, ListingNotFoundException{
		long newId=persistenceAdapter.persistNewListing(correctListingDataForReturningRecreationRequestCreateWithAllOptionalFields, 0);
		ReturningRecreationRequest newListing=(ReturningRecreationRequest) persistenceAdapter.getListingById(newId);
		assertEquals(newId,newListing.getListingId());
		assertEquals(Constants.listingTypeNameReturningRecreationRequest,newListing.getType());
		assertEquals(correctListingDataForReturningRecreationRequestCreateWithAllOptionalFields.getLong(Constants.listingDataFieldCreateDate),newListing.getCreateDate().getTime(),60000);
		assertEquals(correctListingDataForReturningRecreationRequestCreateWithAllOptionalFields.getLong(Constants.listingDataFieldStartDate),newListing.getStartDate().getTime(),60000);
		assertEquals(correctListingDataForReturningRecreationRequestCreateWithAllOptionalFields.getLong(Constants.listingDataFieldEndDate),newListing.getEndDate().getTime(),60000);
		assertEquals("1",newListing.getDescription());
		assertEquals("2",newListing.getTitle());
		assertEquals("3",newListing.getLocation());
		assertEquals(Constants.listingKindRequest,newListing.getKind());
		assertEquals(Constants.allFreeTimeActivityCategories.get(0),newListing.getCategory());
		assertEquals("4",newListing.getActivityLocation());
		assertEquals(Constants.allRegularityOptions.get(1),newListing.getRegularity());
		assertTrue(newListing.isActive());
		assertNull(newListing.getExpiryDate());
		assertNull(newListing.getPicture());
		assertEquals((long)0,newListing.getOwner());
	}
	
	@Test
	public void createNewWithCorrectListingDataForSingleRecreationRequestCreateWithNoOptionalField() throws WrongFormatException, ListingNotFoundException{
		long newId=persistenceAdapter.persistNewListing(correctListingDataForSingleRecreationRequestCreateWithNoOptionalField, 0);
		SingleRecreationRequest newListing=(SingleRecreationRequest) persistenceAdapter.getListingById(newId);
		assertEquals(newId,newListing.getListingId());
		assertEquals(Constants.listingTypeNameSingleRecreationRequest,newListing.getType());
		assertEquals(correctListingDataForSingleRecreationRequestCreateWithNoOptionalField.getLong(Constants.listingDataFieldCreateDate),newListing.getCreateDate().getTime(),60000);
		assertEquals("1",newListing.getDescription());
		assertEquals("2",newListing.getTitle());
		assertEquals("3",newListing.getLocation());
		assertEquals(Constants.listingKindRequest,newListing.getKind());
		assertEquals(Constants.allFreeTimeActivityCategories.get(0),newListing.getCategory());
		assertEquals("4",newListing.getActivityLocation());
		assertTrue(newListing.isActive());
		assertNull(newListing.getExpiryDate());
		assertNull(newListing.getPicture());
		assertEquals((long)0,newListing.getOwner());
	}
	
	@Test
	public void createNewWithCorrectListingDataForSingleRecreationRequestCreateWithAllOptionalFields() throws WrongFormatException, ListingNotFoundException{
		long newId=persistenceAdapter.persistNewListing(correctListingDataForSingleRecreationRequestCreateWithAllOptionalFields, 0);
		SingleRecreationRequest newListing=(SingleRecreationRequest) persistenceAdapter.getListingById(newId);
		assertEquals(newId,newListing.getListingId());
		assertEquals(Constants.listingTypeNameSingleRecreationRequest,newListing.getType());
		assertEquals(correctListingDataForSingleRecreationRequestCreateWithAllOptionalFields.getLong(Constants.listingDataFieldCreateDate),newListing.getCreateDate().getTime(),60000);
		assertEquals(correctListingDataForSingleRecreationRequestCreateWithAllOptionalFields.getLong(Constants.listingDataFieldHappeningDate),newListing.getHappeningDate().getTime(),60000);
		assertEquals("1",newListing.getDescription());
		assertEquals("2",newListing.getTitle());
		assertEquals("3",newListing.getLocation());
		assertEquals(Constants.listingKindRequest,newListing.getKind());
		assertEquals(Constants.allFreeTimeActivityCategories.get(0),newListing.getCategory());
		assertEquals("4",newListing.getActivityLocation());
		assertTrue(newListing.isActive());
		assertNull(newListing.getExpiryDate());
		assertNull(newListing.getPicture());
		assertEquals((long)0,newListing.getOwner());
	}
	
	@Test
	public void createNewWithcorrectListingDataForRideShareRequestCreateWithNoOptionalFields() throws WrongFormatException, ListingNotFoundException{
		long newId=persistenceAdapter.persistNewListing(correctListingDataForRideShareRequestCreateWithNoOptionalField, 0);
		RideShareRequest newListing=(RideShareRequest) persistenceAdapter.getListingById(newId);
		assertEquals(newId,newListing.getListingId());
		assertEquals(Constants.listingTypeNameRideShareRequest,newListing.getType());
		assertEquals(correctListingDataForRideShareRequestCreateWithNoOptionalField.getLong(Constants.listingDataFieldCreateDate),newListing.getCreateDate().getTime(),600000);
		assertEquals("1",newListing.getDescription());
		assertEquals("2",newListing.getTitle());
		assertEquals("3",newListing.getLocation());
		assertEquals("4",newListing.getFromLocation());
		assertEquals("5",newListing.getToLocation());
		assertEquals(Constants.listingKindRequest,newListing.getKind());
		assertTrue(newListing.isActive());
		assertNull(newListing.getExpiryDate());
		assertEquals((long)0,newListing.getOwner());
	}
	
	@Test
	public void createNewWithcorrectListingDataForRideShareRequestCreateWithAllOptionalFields() throws WrongFormatException, ListingNotFoundException{
		long newId=persistenceAdapter.persistNewListing(correctListingDataForRideShareRequestCreateWithAllOptionalFields, 0);
		RideShareRequest newListing=(RideShareRequest) persistenceAdapter.getListingById(newId);
		assertEquals(newId,newListing.getListingId());
		assertEquals(Constants.listingTypeNameRideShareRequest,newListing.getType());
		assertEquals(correctListingDataForRideShareRequestCreateWithAllOptionalFields.getLong(Constants.listingDataFieldCreateDate),newListing.getCreateDate().getTime(),600000);
		assertEquals(correctListingDataForRideShareRequestCreateWithAllOptionalFields.getLong(Constants.listingDataFieldTravelDateAndTime),newListing.getTravelDateAndTime().getTime(),600000);
		assertEquals("1",newListing.getDescription());
		assertEquals("2",newListing.getTitle());
		assertEquals("3",newListing.getLocation());
		assertEquals("4",newListing.getFromLocation());
		assertEquals("5",newListing.getToLocation());
		assertEquals(Constants.listingKindRequest,newListing.getKind());
		assertTrue(newListing.isActive());
		assertNull(newListing.getExpiryDate());
		assertEquals((long)0,newListing.getOwner());
	}
	
	
	@Test(expected=WrongFormatException.class)
	public void createNewWithListingDataWithWrongTypeOfOneRequiredField() throws WrongFormatException{
		persistenceAdapter.persistNewListing(listingDataWithWrongTypeOfOneRequiredField, 0);
	}
	
	@Test(expected=WrongFormatException.class)
	public void createNewWithListingDataForSellItemWithAnNotExistingListingType() throws WrongFormatException{
		persistenceAdapter.persistNewListing(listingDataForSellItemWithAnNotExistingListingType, 0);
	}
	
	@Test(expected=WrongFormatException.class)
	public void createNewWithListingDataForSellItemWithMissingAttributeListingType() throws WrongFormatException{
		persistenceAdapter.persistNewListing(listingDataForSellItemWithMissingAttributeListingType, 0);
	}
	
	@Test(expected=WrongFormatException.class)
	public void createNewWithListingDataForSellItemWithMissingAttributeCreateDate() throws WrongFormatException{
		persistenceAdapter.persistNewListing(listingDataForSellItemWithMissingAttributeCreateDate, 0);
	}
	
	@Test(expected=WrongFormatException.class)
	public void createNewWithListingDataForSellItemWithAnExistingListingTypeWhichIsNotSellItem() throws WrongFormatException{
		persistenceAdapter.persistNewListing(listingDataForSellItemWithAnExistingListingTypeWhichIsNotSellItem, 0);
	}
	
	@Test(expected=WrongFormatException.class)
	public void createNewWithListingDataForSellItemWithMissingAttributeDescription() throws WrongFormatException{
		persistenceAdapter.persistNewListing(listingDataForSellItemWithMissingAttributeDescription, 0);
	}
	
	@Test(expected=WrongFormatException.class)
	public void createNewWithListingDataForSellItemWithMissingAttributeLocation() throws WrongFormatException{
		persistenceAdapter.persistNewListing(listingDataForSellItemWithMissingAttributeLocation, 0);
	}
	
	@Test(expected=WrongFormatException.class)
	public void createNewWithListingDataForSellItemWithMissingAttributeTitle() throws WrongFormatException{
		persistenceAdapter.persistNewListing(listingDataForSellItemWithMissingAttributeTitle, 0);
	}
	
	@Test(expected=WrongFormatException.class)
	public void createNewWithListingDataForSellItemWithMissingAttributePrice() throws WrongFormatException{
		persistenceAdapter.persistNewListing(listingDataForSellItemWithMissingAttributePrice, 0);
	}
	
	@Test(expected=WrongFormatException.class)
	public void createNewWithListingDataForSellItemWithMissingAttributeCondition() throws WrongFormatException{
		persistenceAdapter.persistNewListing(listingDataForSellItemWithMissingAttributeCondition, 0);
	}
	
	@Test(expected=WrongFormatException.class)
	public void createNewWithListingDataForSellItemWithNotExistingCondition() throws WrongFormatException{
		persistenceAdapter.persistNewListing(listingDataForSellItemWithNotExistingCondition, 0);
	}
	
	@Test(expected=WrongFormatException.class)
	public void createNewWithListingDataWithWrongTypeOfOneOptionalField() throws WrongFormatException{
		persistenceAdapter.persistNewListing(listingDataWithWrongTypeOfOneOptionalField, 0);
	}
	
	@Test(expected=WrongFormatException.class)
	public void createNewWithListingDataForServiceOfferWithMissingAttributePrice() throws WrongFormatException{
		persistenceAdapter.persistNewListing(listingDataForServiceOfferWithMissingAttributePrice, 0);
	}
	
	@Test(expected=WrongFormatException.class)
	public void createNewWithListingDataForRideShareOfferWithMissingAttributeFromLocation() throws WrongFormatException{
		persistenceAdapter.persistNewListing(listingDataForRideShareOfferWithMissingAttributeFromLocation, 0);
	}
	
	@Test(expected=WrongFormatException.class)
	public void createNewWithListingDataForRideShareOfferWithMissingAttributeToLocation() throws WrongFormatException{
		persistenceAdapter.persistNewListing(listingDataForRideShareOfferWithMissingAttributeToLocation, 0);
	}
	
	@Test(expected=WrongFormatException.class)
	public void createNewWithListingDataForRideShareOfferWithMissingAttributeTravelDateAndTime() throws WrongFormatException{
		persistenceAdapter.persistNewListing(listingDataForRideShareOfferWithMissingAttributeTravelDateAndTime, 0);
	}
	
	@Test(expected=WrongFormatException.class)
	public void createNewWithListingDataForPurchaseRequestWithMissingAttributeCondition() throws WrongFormatException{
		persistenceAdapter.persistNewListing(listingDataForPurchaseRequestWithMissingAttributeCondition, 0);
	}
	
	@Test(expected=WrongFormatException.class)
	public void createNewWithListingDataForPurchaseRequestWithNotExistingCondition() throws WrongFormatException{
		persistenceAdapter.persistNewListing(listingDataForPurchaseRequestWithNotExistingCondition, 0);
	}
	
	@Test(expected=WrongFormatException.class)
	public void createNewWithListingDataForReturningRecreationRequestWithMissingAttributeRegularity() throws WrongFormatException{
		persistenceAdapter.persistNewListing(listingDataForReturningRecreationRequestWithMissingAttributeRegularity, 0);
	}
	
	@Test(expected=WrongFormatException.class)
	public void createNewWithListingDataForReturningRecreationRequestWithNotExistingRegularity() throws WrongFormatException{
		persistenceAdapter.persistNewListing(listingDataForReturningRecreationRequestWithNotExistingRegularity, 0);
	}
	
	@Test(expected=WrongFormatException.class)
	public void createNewWithListingDataForReturningRecreationRequestWithMissingAttributeCategory() throws WrongFormatException{
		persistenceAdapter.persistNewListing(listingDataForReturningRecreationRequestWithMissingAttributeCategory, 0);
	}
	
	@Test(expected=WrongFormatException.class)
	public void createNewWithListingDataForReturningRecreationRequestWithNotExistingCategory() throws WrongFormatException{
		persistenceAdapter.persistNewListing(listingDataForReturningRecreationRequestWithNotExistingCategory, 0);
	}
	
	@Test(expected=WrongFormatException.class)
	public void createNewWithListingDataForRideShareRequestWithMissingAttributeFromLocation() throws WrongFormatException{
		persistenceAdapter.persistNewListing(listingDataForRideShareRequestWithMissingAttributeFromLocation, 0);
	}
	
	@Test(expected=WrongFormatException.class)
	public void createNewWithListingDataForRideShareRequestWithMissingAttributeToLocation() throws WrongFormatException{
		persistenceAdapter.persistNewListing(listingDataForRideShareRequestWithMissingAttributeToLocation, 0);
	}
	
	@Test(expected=ListingNotFoundException.class)
	public void testGetListingByIdWithNotExistingId() throws ListingNotFoundException{
		persistenceAdapter.getListingById(-1);
	}
	
	@Test(expected=ListingNotFoundException.class)
	public void testDeleteListingWithalidId() throws ListingNotFoundException, WrongFormatException{
		long newId=persistenceAdapter.persistNewListing(correctListingDataForSellItemCreateWithoutExtraFields, 0);
		try{
			persistenceAdapter.deleteListingById(newId);
		}catch(ListingNotFoundException e){
			fail();
		}
		persistenceAdapter.getListingById(newId);
	}
	
	@Test(expected=ListingNotFoundException.class)
	public void testDeleteListingByIdWithNotExistingId() throws ListingNotFoundException{
		persistenceAdapter.deleteListingById(-1);
	}
	
	@Test
	public void testIsOwnerOfListingWithExpectedResultTrue() throws WrongFormatException, ListingNotFoundException{
		long newId=persistenceAdapter.persistNewListing(correctListingDataForSellItemCreateWithoutExtraFields, 0);
		assertTrue(persistenceAdapter.isOwnerOfListing(newId, 0));
	}
	
	@Test
	public void testIsOwnerOfListingWithExpectedResultFalse() throws WrongFormatException, ListingNotFoundException{
		long newId=persistenceAdapter.persistNewListing(correctListingDataForSellItemCreateWithoutExtraFields, 0);
		assertTrue(persistenceAdapter.isOwnerOfListing(newId, 1));
	}

}
