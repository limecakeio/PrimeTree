package BackendServer.Security.Configuration;

import java.io.IOException;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.web.filter.GenericFilterBean;

public class JSessionIdSetterFilter extends GenericFilterBean {

	@Override
	public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
			throws IOException, ServletException {
//		CustomRequest editableRequest=new CustomRequest((HttpServletRequest) request);
//		System.out.println("JSessionIdSetterFilter.doFilter()");
//		if(editableRequest.getSession(false)==null){
//			System.out.println("JSessionId is null");
//			System.out.println("api_key is " + editableRequest.getHeader("api_key"));
//			//The JSessionId might be lost because the client is swagger or the client isn't logged in yet
//			if(editableRequest.getHeader("api_key")!=null){
//				/*It seems like the client is logged in but lost the JSessionId. No Proble! Let's set it manually*/
//				editableRequest.addHeader("Cookie", "JSESSIONID="+ ((HttpServletRequest)request).getHeader("api_key"));
//			}else{
//				//The client isn't logged in yet. Do nothing!
//			}
//		}
		System.out.println("JSessionIdSetterFilter.doFilter()");
		HttpSession session = ((HttpServletRequest) request).getSession();
		if (request.getParameter("JSESSIONID") != null) {
			System.out.println("JSessionId is null");
		    Cookie userCookie = new Cookie("JSESSIONID", ((HttpServletRequest) request).getHeader("api_key"));
		    ((HttpServletResponse) response).addCookie(userCookie);
		} else {
			System.out.println("JSessionId is " + request.getParameter("JSESSIONID"));
		    String sessionId = session.getId();
		    Cookie userCookie = new Cookie("JSESSIONID", sessionId);
		    ((HttpServletResponse) response).addCookie(userCookie);
		}
	    ((HttpServletResponse) response).addHeader("api_key", ((HttpServletRequest) request).getSession().getId());
		chain.doFilter(request, response); 
	}

}
