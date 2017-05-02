package BackendServer.Accounts.Repositories;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import BackendServer.Account.Entities.User;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

}