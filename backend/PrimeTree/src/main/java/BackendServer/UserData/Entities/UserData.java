package BackendServer.UserData.Entities;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

/**This class represents the UserData-Entity in the userdb*/
@Entity
@Table(name = "UserData")
public class UserData {
	
	@Id
	private Long id;
	
	private boolean inAdminRole;
	
	public UserData(){}

	public UserData(Long id, boolean admin) {
		this.setId(id);
		this.setInAdminRole(admin);
	}

	public boolean isInAdminRole() {
		return inAdminRole;
	}

	public void setInAdminRole(boolean inAdminRole) {
		this.inAdminRole = inAdminRole;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}
}