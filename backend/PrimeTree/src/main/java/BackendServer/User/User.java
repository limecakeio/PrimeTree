package BackendServer.User;

import java.util.Collection;
import java.util.LinkedList;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import BackendServer.ClientDatabaseAccess.Entities.EmployeeData;
import BackendServer.UserData.Entities.UserData;

public class User implements UserDetails {
	
	private EmployeeData employeeData;
	private UserData userData;
	
	public User(EmployeeData employeeData,UserData userData){
		this.employeeData=employeeData;
		this.userData=userData;
	}
	
	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		Collection<GrantedAuthority> collection = new LinkedList<GrantedAuthority>();
		collection.add(new SimpleGrantedAuthority("USER"));
		return collection;
	}

	@Override
	public String getPassword() {
		return "123";
	}

	@Override
	public String getUsername() {
		return employeeData.getLogin();
	}

	@Override
	public boolean isAccountNonExpired() {
		return true;
	}

	@Override
	public boolean isAccountNonLocked() {
		return true;
	}

	@Override
	public boolean isCredentialsNonExpired() {
		return true;
	}

	@Override
	public boolean isEnabled() {
		return true;
	}
	
	public boolean isAdmin(){
		return userData.isInAdminRole();
	}

}
