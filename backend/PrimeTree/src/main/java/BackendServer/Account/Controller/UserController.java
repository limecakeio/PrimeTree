package BackendServer.Account.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RequestMethod;
import BackendServer.Account.Entities.User;
import BackendServer.Accounts.Repositories.UserRepository;
@Controller
@RequestMapping(value = "/user")
public class UserController {

	
	@Autowired
	UserRepository userRepository;
	
	
	
	@RequestMapping(method=RequestMethod.GET, value ="/getall")
	public @ResponseBody List<User> getAllUser(){

		return userRepository.findAll();
		
	}
	
	
	
	
}
