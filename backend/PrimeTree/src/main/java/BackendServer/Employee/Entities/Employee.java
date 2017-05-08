package BackendServer.Employee.Entities;

import java.util.Collection;
import java.util.LinkedList;
import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

@Entity
@Table(name="employee")
public class Employee implements UserDetails{

	@Id
    @GeneratedValue(strategy=GenerationType.AUTO)
	@Column(name="employeeid")
	private Long id;
	
	@Column(name="firstname")
	private String firstname;
	
	@Column(name="sirname")
	private String surname;
	
	@Column(name="email")
	private String email;
	
	@Column(name="imagelocation")
	private String imagelocation;
	
	@Column(name="locationId")
	private Long locationId;

	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		Collection<GrantedAuthority> collection=new LinkedList<GrantedAuthority>();
		collection.add(new SimpleGrantedAuthority("USER"));
		return collection;
	}

	@Override
	public String getPassword() {
		return "123";
	}

	@Override
	public String getUsername() {
		return firstname.charAt(0) + "." + surname;
//		return "user";
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
		return  true;
	}
	
	
}
