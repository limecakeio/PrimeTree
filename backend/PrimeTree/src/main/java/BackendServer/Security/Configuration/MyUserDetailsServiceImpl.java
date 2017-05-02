package BackendServer.Security.Configuration;

import java.util.Iterator;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import BackendServer.Account.Entities.User;
import BackendServer.Accounts.Repositories.UserRepository;

public class MyUserDetailsServiceImpl implements UserDetailsService {

	@Autowired
	private UserRepository userRepository;
	
	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		Iterator<User> userIterator=userRepository.findAll().iterator();
		User actualUser;
		User foundUser=null;
		while(foundUser!=null && userIterator.hasNext()){
			actualUser=userIterator.next();
			if(actualUser.getUsername().equals(username)){
				foundUser=actualUser;
			}
		}
		if(foundUser!=null){
			return foundUser;
		}else{
			throw new UsernameNotFoundException(username);
		}
	}

}
