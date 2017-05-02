package BackendServer.Authentification;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import javax.websocket.Session;

import org.json.JSONObject;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

import BackendServer.Exceptions.WrongFormatException;

@Controller
@RequestMapping(value = "/authentification")
public class AuthentificationRESTController {
	
//	@CrossOrigin
	@RequestMapping(value = "/login", method=RequestMethod.POST)
    public @ResponseBody String login(@RequestBody String body, HttpServletRequest req){
		return "/login";
    }
	
//	@CrossOrigin
	@RequestMapping(value = "/logout", method=RequestMethod.POST)
    public @ResponseBody void logout(@RequestBody String body, HttpServletRequest req){
		return;
    }

}
