package BackendServer.User.Service;

import java.util.Iterator;
import java.util.List;
import java.util.Set;

import org.hibernate.mapping.Collection;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import BackendServer.Employee.Entities.Employee;
import BackendServer.Employee.Repositories.EmployeeRepository;

public class MyUserDetailsServiceImpl implements UserDetailsService {

	@Autowired
	private EmployeeRepository employeeRepository;
	
	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		Iterator<Employee> userIterator=employeeRepository.findAll().iterator();
		Employee actualemployee;
		Employee foundemployee=null;
		while(userIterator.hasNext()){
			actualemployee=userIterator.next();
			if(actualemployee.getUsername().equals(username)){
				foundemployee=actualemployee;
			}
		}
		if(foundemployee!=null){
			return foundemployee;
		}else{
			throw new UsernameNotFoundException(username);
		}
	}

}
