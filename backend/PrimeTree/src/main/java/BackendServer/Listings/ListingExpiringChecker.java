package BackendServer.Listings;

import BackendServer.Exceptions.ListingNotFoundException;
import BackendServer.Exceptions.WrongFormatException;
import BackendServer.Listings.Entities.Listing;

/**This thread deactivates all expired listings
 * 
 * @author Florian Kutz
 * */
public class ListingExpiringChecker extends Thread{
	
	PersistenceAdapter persistenceAdapter;
	int periodBetweenChecks;

	public ListingExpiringChecker(PersistenceAdapter persistenceAdapterImpl, int periodBetweenChecks) {
		this.persistenceAdapter=persistenceAdapterImpl;
		this.periodBetweenChecks=periodBetweenChecks;
		this.start();
	}
	
	/**This thread waits until periodBetweenChecks is over, calls checkExpiringOfListings(), and starts anew.*/
	public void run(){
		while(true){
			try {
				sleep(periodBetweenChecks);
			} catch (InterruptedException e) {
				e.printStackTrace();
				System.out.println(e.getMessage());
			}
			try {
				this.checkExpiringOfListings();
			} catch (ListingNotFoundException e1){
				e1.printStackTrace();
				System.out.println(e1.getMessage());
			}
		}
		
	}

	/**This thread checks all Listings of being expired and sets their active attribute*/
	private void checkExpiringOfListings() throws ListingNotFoundException {
//		System.out.println("checkExpiringDates");
		Listing[] allListings=persistenceAdapter.getListingArrayByIdArray(persistenceAdapter.getAllActiveListingIds());
		for(int i=0;i<allListings.length;i++){
			if(allListings[i].isActive()&&allListings[i].isExpired()){
				try {
					persistenceAdapter.edit(allListings[i].getListingId(), allListings[i].toJSON().accumulate(ConstantsAndSimpleMethods.listingDataFieldNameActive, false));
				} catch (WrongFormatException e) {
					System.out.println("Uncommon and unexpected error at deactivating expired Listing.");
				}
			}
//			System.out.println(allListings[i].getListingId() + " : " + allListings[i].isActive());
		}
	}

}
