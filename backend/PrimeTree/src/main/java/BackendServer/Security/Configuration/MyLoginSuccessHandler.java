package BackendServer.Security.Configuration;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;

/**This Class overrides the default AuthenticationSuccessHandler so the Client isn't redirected to a html page by the BackendServer 
 * after a successful authentication.*/
public class MyLoginSuccessHandler implements AuthenticationSuccessHandler {

	@Override
	public void onAuthenticationSuccess(HttpServletRequest arg0, HttpServletResponse httpServletResponse, Authentication arg2)
			throws IOException, ServletException {
		System.out.println(SecurityContextHolder.getContext().getAuthentication().getName() + " hat sich mit Spring Security eingeloggt");
		httpServletResponse.addHeader("Access-Control-Allow-Origin", arg0.getHeader("origin"));
		httpServletResponse.addHeader("Access-Control-Allow-Credentials", "true");
		httpServletResponse.setStatus(HttpServletResponse.SC_OK);
		httpServletResponse.addHeader("Content-Type", "application/json");
		httpServletResponse.addHeader("api_key",arg0.getSession().getId());
	}

}
