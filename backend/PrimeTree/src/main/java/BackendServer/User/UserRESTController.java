package BackendServer.User;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import BackendServer.Exceptions.FavouriteNotFoundException;
import BackendServer.Exceptions.UserNotFoundException;
import BackendServer.Listings.Constants;
import BackendServer.User.Service.UserManager;

@Controller
@RequestMapping(value = "")
public class UserRESTController {
	
	@Autowired
	UserManager userManager;
	
	@CrossOrigin
	@RequestMapping(value = "/user/{id}", method=RequestMethod.GET)
    public @ResponseBody String getUser(@PathVariable(value="id") final int userId, HttpServletRequest request, HttpServletResponse response){
		JSONObject result=new JSONObject();
		try {
			User foundUser=userManager.loadUserById(userId);
			result=foundUser.toJSON();
		} catch (UserNotFoundException thrownException) {
			response.setStatus(HttpServletResponse.SC_NOT_FOUND);
		}
		return result.toString();
	}
	
	@CrossOrigin
	@RequestMapping(value = "/users", method=RequestMethod.GET)
    public @ResponseBody String getUsers( HttpServletRequest request, HttpServletResponse response){
		JSONObject result=new JSONObject();
		User[] allUsers=userManager.getAllUsers();
		JSONArray allUsersAsJSON=new JSONArray(allUsers.length);
		for(int index=0;index<allUsers.length;index++){
			allUsersAsJSON.put(index, allUsers[index].toJSON());
		}
		result.put(Constants.responseFieldUsers, allUsersAsJSON);
		return result.toString();
	}
	
	@CrossOrigin
	@RequestMapping(value = "/user/favourites", method=RequestMethod.POST)
    public @ResponseBody void postFavourite(@RequestParam final int listingId, HttpServletRequest request, HttpServletResponse response) throws UsernameNotFoundException, UserNotFoundException{
		userManager.addFavourite(userManager.loadUserByUsername(SecurityContextHolder.getContext().getAuthentication().getName()).getId(), listingId); 
	}
	
	@CrossOrigin
	@RequestMapping(value = "/user/favourites", method=RequestMethod.DELETE)
    public @ResponseBody void deleteFavourite(@RequestParam final int listingId, HttpServletRequest request, HttpServletResponse response) throws UsernameNotFoundException, UserNotFoundException{
		try {
			userManager.removeFavourite(userManager.loadUserByUsername(SecurityContextHolder.getContext().getAuthentication().getName()).getId(), listingId); 
			} catch (FavouriteNotFoundException e) {
			response.setStatus(HttpServletResponse.SC_NOT_FOUND);
		}
	}
	
	@CrossOrigin
	@RequestMapping(value = "/user/favourites", method=RequestMethod.GET)
    public @ResponseBody String getFavourites(@RequestParam final int listingId, HttpServletRequest request, HttpServletResponse response) throws UsernameNotFoundException, UserNotFoundException{
		JSONObject result=new JSONObject();
		result.put(Constants.responseFieldFavouriteList, userManager.getFavouriteList(SecurityContextHolder.getContext().getAuthentication().getName()));
		return result.toString();		
	}
	
	@CrossOrigin
	@RequestMapping(value = "/user/{id}/admin", method=RequestMethod.POST)
    public @ResponseBody void declareAdmin(@PathVariable(value="id") final int userId, HttpServletRequest request, HttpServletResponse response){
		userManager.setIsAdminOnUser(userId, true);
	}
	
	@CrossOrigin
	@RequestMapping(value = "/user/{id}/admin", method=RequestMethod.DELETE)
    public @ResponseBody void deleteAdmin(@PathVariable(value="id") final int userId, HttpServletRequest request, HttpServletResponse response){
		userManager.setIsAdminOnUser(userId, false);
	}
	

}
