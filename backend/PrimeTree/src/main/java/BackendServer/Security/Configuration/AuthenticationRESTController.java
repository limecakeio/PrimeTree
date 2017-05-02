package BackendServer.Security.Configuration;

import javax.annotation.security.PermitAll;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import javax.websocket.Session;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

import BackendServer.Exceptions.WrongFormatException;

@Controller
@RequestMapping(value = "/authentication")
public class AuthenticationRESTController {
	
	@Autowired
	UserDetailsService userDetailsService;
	
	@RequestMapping(value = "/isloggedin", method=RequestMethod.GET)
	@PermitAll()
    public ResponseEntity<Boolean> isLoggedIn(){
		LoginChecker userLoginChecker=userDetailsService.loadUserByUsername(arg0)
		return new ResponseEntity<>(true, HttpStatus.OK);//true must be replaced!
	}
	
}
