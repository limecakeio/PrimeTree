package BackendServer;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Configurable;

/**This class defines all Constants relevant for the BackendServer as static fields*/
public class Constants {
	
	//The following Strings are the names of the required fields in all JSONObjects representing listingData
	public static final String
	listingDataFieldNameTitle="title",
	listingDataFieldNameDescription="listingDescription",
	//listingDataFieldNamePictures="pictures",
	//listingDataFieldNameDeadLine="deadLine",
	listingDataFieldNamePrice="price",
	listingDataFieldNameListingType="listingType";
	
}
