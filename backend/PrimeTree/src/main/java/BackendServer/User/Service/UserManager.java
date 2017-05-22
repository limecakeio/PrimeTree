package BackendServer.User.Service;

import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import BackendServer.Exceptions.FavouriteNotFoundException;
import BackendServer.Exceptions.UserNotFoundException;
import BackendServer.User.User;

public interface UserManager extends UserDetailsService{
	
	public int[] getFavouriteList(String string);

	public void addFavourite(long userId, int listingId) throws UserNotFoundException;
	
	public void removeFavourite(long userId, long listingId) throws UserNotFoundException, FavouriteNotFoundException;
	
	public User loadUserById(long userId) throws UserNotFoundException;
	
	public User loadUserByUsername(String username) throws UsernameNotFoundException ;

	public User[] getAllUsers();

	public void setIsAdminOnUser(int userId, boolean b);
}
