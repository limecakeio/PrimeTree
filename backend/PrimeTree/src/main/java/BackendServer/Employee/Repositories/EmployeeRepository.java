package BackendServer.Employee.Repositories;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import BackendServer.Employee.Entities.Employee;
@Repository
public interface EmployeeRepository extends JpaRepository<Employee, Long> {

}