package BackendServer.Listings.Repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import BackendServer.Listings.Entities.ServiceOffering;

public interface ServiceOfferingRepository extends JpaRepository<ServiceOffering, Long> {

}
