package BackendServer.Listings.Repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import BackendServer.Listings.Entities.RideShareRequest;

/**This interface is a JpaRepository for the Entity RideShareRequest with no extra method
 * @author Florian Kutz
 *
 */
public interface RideShareRequestRepository extends JpaRepository<RideShareRequest, Long> {

}
