package BackendServer.Listings;

/**This non-persistent class is a container for search-statistics
 * @author Florian Kutz
 *
 */
public class ListingSearchStatistics {
	
	private int price_min;
	private int price_max;
	private int count;
	private int pages;
	public int getPrice_min() {
		return price_min;
	}
	public void setPrice_min(int price_min) {
		this.price_min = price_min;
	}
	public int getPrice_max() {
		return price_max;
	}
	public void setPrice_max(int price_max) {
		this.price_max = price_max;
	}
	public int getCount() {
		return count;
	}
	public void setCount(int count) {
		this.count = count;
	}
	public int getPages() {
		return pages;
	}
	public void setPages(int pages) {
		this.pages = pages;
	}

}
