package BackendServer.Listings.Repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import BackendServer.Listings.Entities.SellItem;

@Repository
public interface SellItemRepository extends JpaRepository<SellItem, Long> {

}