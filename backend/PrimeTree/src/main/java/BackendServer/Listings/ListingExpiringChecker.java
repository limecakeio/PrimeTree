package BackendServer.Listings;

import BackendServer.Exceptions.ListingNotFoundException;
import BackendServer.Listings.Entities.Listing;
import BackendServer.Listings.ObjectControllers.ListingObjectController;

public class ListingExpiringChecker extends Thread{
	
	PersistenceAdapter persistenceAdapter;
	int periodBetweenChecks;

	public ListingExpiringChecker(PersistenceAdapter persistenceAdapterImpl, int periodBetweenChecks) {
		this.persistenceAdapter=persistenceAdapterImpl;
		this.periodBetweenChecks=periodBetweenChecks;
		this.start();
	}
	
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
			} catch (ListingNotFoundException e1) {
				e1.printStackTrace();
				System.out.println(e1.getMessage());
			}
		}
		
	}

	private void checkExpiringOfListings() throws ListingNotFoundException {
		System.out.println("checkExpiringDates");
		Listing[] allListings=persistenceAdapter.getListingArrayByIdArray(persistenceAdapter.getAllActiveListings());
		for(int i=0;i<allListings.length;i++){
			allListings[i].setActive(!allListings[i].isExpired());
			System.out.println(allListings[i].getListingId() + " : " + allListings[i].isActive());
		}
	}

}
