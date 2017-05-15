package BackendServer.Security.Configuration;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.web.access.AccessDeniedHandler;

/**This Class overrides the default AccessDeniedHandler so the Client isn't redirected to a html page by the BackendServer 
 * after a denied access*/
public class MyAccessDeniedHandler implements AccessDeniedHandler {

	@Override
	public void handle(HttpServletRequest request, HttpServletResponse response,
			AccessDeniedException accessDeniedException) throws IOException, ServletException {
		System.out.println("handle()");
		response.addHeader("Access-Control-Allow-Origin", request.getHeader("origin"));
		response.addHeader("Access-Control-Allow-Credentials", "true");
		response.addHeader("Access-Control-Allow-Headers", "x-authors");
		response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
		response.getWriter().write(accessDeniedException.getMessage());
	}

}
