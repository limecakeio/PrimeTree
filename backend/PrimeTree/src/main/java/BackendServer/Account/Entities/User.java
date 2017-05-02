package BackendServer.Account.Entities;

import java.util.Collection;
import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import BackendServer.Security.Configuration.LoginChecker;

@Entity
@Table(name="User")
public class User implements UserDetails,LoginChecker{

	@Id
    @GeneratedValue(strategy=GenerationType.AUTO)
	private Long id;
	
	@Column(unique=true)
	private String username;
	
	private String name;
	private String surname;
	private String email;
	private String password;
	private Set<Role> roles;
	private boolean isLoggedin;
	
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getSurname() {
		return surname;
	}
	public void setSurname(String surname) {
		this.surname = surname;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public Set<Role> getRole() {
		return roles;
	}
	public void setRole(Set<Role> role) {
		this.roles = role;
	}
	@Override
	public boolean isLoggedIn() {
		
		return isLoggedin;
	}
	@Override
	public void login() {
		isLoggedin=true;
		
	}
	@Override
	public void logout() {
		isLoggedin=false;
		
	}
	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		
		return roles;
	}
	@Override
	public String getUsername() {
		// TODO Auto-generated method stub
		return username;
	}
	@Override
	public boolean isAccountNonExpired() {
		// TODO Auto-generated method stub
		return false;
	}
	@Override
	public boolean isAccountNonLocked() {
		// TODO Auto-generated method stub
		return false;
	}
	@Override
	public boolean isCredentialsNonExpired() {
		// TODO Auto-generated method stub
		return false;
	}
	@Override
	public boolean isEnabled() {
		// TODO Auto-generated method stub
		return true;
	}
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public Set<Role> getRoles() {
		return roles;
	}
	public void setRoles(Set<Role> roles) {
		this.roles = roles;
	}
	public boolean isLoggedin() {
		return isLoggedin;
	}
	public void setLoggedin(boolean isLoggedin) {
		this.isLoggedin = isLoggedin;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	
	
}
