package BackendServer.Listings;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class TestConfigRESTController {
	
	@Bean
	public ListingRESTController listingRESTController(){
		return new ListingRESTController();
	}

}
