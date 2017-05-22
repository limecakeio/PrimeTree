package BackendServer.User.Service;

import java.io.Serializable;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.PermissionEvaluator;
import org.springframework.security.core.Authentication;

import BackendServer.Exceptions.ListingNotFoundException;
import BackendServer.Listings.PersistenceAdapter;
import BackendServer.Listings.Repositories.CommentRepository;

public class MyPermissionEvaluator implements PermissionEvaluator {
	
	@Autowired
	PersistenceAdapter persistenceAdapter;

	@Autowired
	CommentRepository commentRepository;
	
	@Autowired
	UserManager userManager;
	
	@Override
	public boolean hasPermission(Authentication arg0, Object arg1, Object arg2) {
		return false;
	}

	@Override
	public boolean hasPermission(Authentication arg0, Serializable arg1, String arg2, Object arg3) {
		if(arg2.equals("listing")&&arg3.equals("owner")){
			try {
				return persistenceAdapter.isOwnerOfListing((Integer) arg1, userManager.loadUserByUsername(arg0.getName()).getId() );
			} catch (ListingNotFoundException e) {
				return true;
			}
		}else if(arg2.equals("listing")&&arg3.equals("reader")){
			try {
				return persistenceAdapter.getListingById((Long) arg1).isActive() ||
						persistenceAdapter.isOwnerOfListing((Integer) arg1, userManager.loadUserByUsername(arg0.getName()).getId());
			} catch (ListingNotFoundException e) {
				return true;
			}
		}else if(arg2.equals("comment")&&arg3.equals("author")){
			return commentRepository.findOne((Long) arg1).getAuthorId()==userManager.loadUserByUsername(arg0.getName()).getId();
		}else{
			return false;
		}
	}

}
