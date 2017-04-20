package BackendServer;

import javax.persistence.Entity;
import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;
import javax.persistence.PrimaryKeyJoinColumn;
import javax.persistence.Table;

import org.json.JSONException;
import org.json.JSONObject;

/**This sub-class of OfferingObjectController controlls all SellItem-Listings*/
public class SellItemObjectController extends OfferingObjectController {
	
	@Entity
	@Table(name="SellItem")
	@PrimaryKeyJoinColumn(referencedColumnName="id")
	public class SellItem extends Offering{
		private float price;

		public SellItem(JSONObject listingData, int creatorId) {
			super(listingData, creatorId);
			this.setPrice((float) (((float)listingData.getInt("price"))/100.0));
		}

		public float getPrice() {
			return price;
		}

		public void setPrice(float price) {
			this.price = price;
		}
	}
	
	protected final Class listingType=SellItem.class;

	@Override
	public int createAndPersistNewInstance(JSONObject listingData, int creatorId) throws WrongFormatException {
		try{
			EntityManagerFactory emfactory = Persistence.
				      createEntityManagerFactory( "Eclipselink_JPA" );
			EntityManager entitymanager = emfactory.
				      createEntityManager( );
			entitymanager.getTransaction( ).begin( );
			
			SellItem newInstance=new SellItem(listingData, creatorId);
			entitymanager.persist(newInstance);

		      entitymanager.getTransaction().commit();
		      entitymanager.close();
		      emfactory.close();
		      
			return newInstance.getListingId();
		}catch(JSONException e){
			throw new WrongFormatException(e.toString());
		}
	}

}
