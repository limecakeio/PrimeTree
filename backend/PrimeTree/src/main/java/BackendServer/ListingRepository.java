package BackendServer;

import org.springframework.data.repository.CrudRepository;

import BackendServer.Listing;

// This will be AUTO IMPLEMENTED by Spring into a Bean called userRepository
// CRUD refers Create, Read, Update, Delete

public interface ListingRepository extends CrudRepository<Listing, Long> {

}
