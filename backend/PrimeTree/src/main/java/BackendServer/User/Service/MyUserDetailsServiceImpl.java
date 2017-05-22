package BackendServer.User.Service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import BackendServer.ClientDatabaseAccess.Entities.EmployeeData;
import BackendServer.ClientDatabaseAccess.Repositories.EmployeeDataRepository;
import BackendServer.User.User;
import BackendServer.UserData.Entities.UserData;
import BackendServer.UserData.Repositories.UserDataRepository;

public class MyUserDetailsServiceImpl implements UserDetailsService {

	@Autowired
	protected EmployeeDataRepository employeeDataRepository;
	
	@Autowired
	protected UserDataRepository userDataRepository;
	
	@Override
	public User loadUserByUsername(String username) throws UsernameNotFoundException {
		EmployeeData employeeData=employeeDataRepository.findByLogin(username);
		if(employeeData==null){
			throw new UsernameNotFoundException("No user with username " + username + " can be found");
		}
		UserData userData=userDataRepository.findOne(employeeData.getId());
		if(userData==null){
			System.out.println("Neuer Nutzer");
			userData=new UserData();
			userData.setId(employeeData.getId());
			userData.setInAdminRole(false);
			userDataRepository.save(userData);
		}
		User user=new User(employeeData, userData);
		return user;
	}
	
	private List<GrantedAuthority> getGrantedAuthorities(User user){
        List<GrantedAuthority> authorities = new ArrayList<GrantedAuthority>();
        authorities.add(new SimpleGrantedAuthority("USER"));
        if(user.isAdmin()){
        	authorities.add(new SimpleGrantedAuthority("ADMIN"));
        }
        return authorities;
    }

}
