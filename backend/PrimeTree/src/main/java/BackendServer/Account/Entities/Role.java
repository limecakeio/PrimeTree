package BackendServer.Account.Entities;

import javax.persistence.*;

import org.springframework.security.core.GrantedAuthority;

import java.util.Set;

@Entity
@Table(name = "role")
public class Role implements GrantedAuthority{
    private Long id;
    private String name;
    private Set<User> user;

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    @ManyToMany(mappedBy = "roles")
    public Set<User> getUsers() {
        return user;
    }

    public void setUsers(Set<User> users) {
        this.user = users;
    }

	@Override
	public String getAuthority() {
		// TODO Auto-generated method stub
		return name;
	}
}