package BackendServer.User;

import java.util.Collection;
import java.util.LinkedList;
import java.util.List;

import org.json.JSONObject;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import BackendServer.ClientDatabaseAccess.Entities.EmployeeData;
import BackendServer.Exceptions.FavouriteNotFoundException;
import BackendServer.Listings.Constants;
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
	
	public void addFavourite(Integer newFavourite){
		userData.addFavourite(newFavourite);
	}
	
	public List<Integer> getFavourites(){
		return userData.getFavourites();
	}

	public void removeFavourite(long listingId) throws FavouriteNotFoundException {
		userData.removeFavourite(listingId);
	}

	public long getId() {
		return employeeData.getId();
	}

	public String getPicture() {
		return employeeData.getFoto();
	}

	public JSONObject toJSON() {
		JSONObject userAsJSON=new JSONObject();
		userAsJSON.put(Constants.userFieldId, this.getId());
		userAsJSON.put(Constants.userFieldPicture, this.getPicture());
		userAsJSON.put(Constants.userFieldFirstName, this.getFirstName());
		userAsJSON.put(Constants.userFieldLastName, this.getLastName());
		userAsJSON.put(Constants.userFieldIsAdmin, this.isAdmin());
		userAsJSON.put(Constants.userFieldEMail, this.getEMail());
		userAsJSON.put(Constants.userFieldPhone, this.getPhoneNumber());
		userAsJSON.put(Constants.userFieldLocation, this.getLocation());
		userAsJSON.put(Constants.userFieldPosition, this.getPosition());
		
		return userAsJSON;
	}

	private String getPosition() {
		return employeeData.getSkillLevel();
	}

	private String getLocation() {
		return employeeData.getStandort().getOrtName();
	}

	private String getPhoneNumber() {
		return employeeData.getTelefonNummer();
	}

	private String getEMail() {
		return employeeData.geteMail();
	}

	private String getLastName() {
		return employeeData.getNachname();
	}

	public String getFirstName() {
		return employeeData.getVorname();
	}

}
