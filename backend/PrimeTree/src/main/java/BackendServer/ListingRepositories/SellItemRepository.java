package BackendServer.ListingRepositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import BackendServer.ListingEntities.SellItem;

@Repository
public interface SellItemRepository extends JpaRepository<SellItem, Long> {

}