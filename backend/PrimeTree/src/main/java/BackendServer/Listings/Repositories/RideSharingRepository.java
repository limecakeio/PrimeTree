package BackendServer.Listings.Repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import BackendServer.Listings.Entities.RideSharing;

/**This interface is a JpaRepository for the Entity RideSharing with no extra method
 * @author Florian Kutz
 *
 */
public interface RideSharingRepository extends JpaRepository<RideSharing, Long> {

}
