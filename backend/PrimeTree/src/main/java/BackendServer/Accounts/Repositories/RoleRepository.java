package BackendServer.Accounts.Repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import BackendServer.Account.Entities.Role;

public interface RoleRepository extends JpaRepository<Role, Long>{
}