package BackendServer.Listings.Repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import BackendServer.Listings.Entities.RideSharing;

public interface RideSharingRepository extends JpaRepository<RideSharing, Long> {

}
