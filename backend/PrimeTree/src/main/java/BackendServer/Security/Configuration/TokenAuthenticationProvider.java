//package BackendServer.Security.Configuration;
//
//import java.util.Optional;
//
//import javax.servlet.http.HttpServletRequest;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.security.authentication.AuthenticationProvider;
//import org.springframework.security.authentication.BadCredentialsException;
//import org.springframework.security.core.Authentication;
//import org.springframework.security.core.AuthenticationException;
//import org.springframework.security.core.token.Token;
//import org.springframework.security.core.token.TokenService;
//import org.springframework.security.web.authentication.preauth.PreAuthenticatedAuthenticationToken;
//import org.springframework.stereotype.Component;
//import org.springframework.web.context.request.RequestAttributes;
//import org.springframework.web.context.request.RequestContextHolder;
//import org.springframework.web.context.request.ServletRequestAttributes;
//
//import BackendServer.Listings.Constants;
//
//@Component
//public class TokenAuthenticationProvider implements AuthenticationProvider {
//
//    private TokenService tokenService;
//
//    public TokenAuthenticationProvider(TokenService tokenService) {
//        this.tokenService = tokenService;
//    }
//
//    @Override
//    public Authentication authenticate(Authentication authentication) throws AuthenticationException {
//        Optional token = (Optional) authentication.getPrincipal();
//        if (!token.isPresent() || token.get().isEmpty()) {
//            throw new BadCredentialsException("Invalid token");
//        }
//        if (!tokenService.contains(token.get())) {
//            throw new BadCredentialsException("Invalid token or token expired");
//        }
//        return tokenService.retrieve(token.get());
//    }
//
//    @Override
//    public boolean supports(Class<?> authentication) {
//        return authentication.equals(PreAuthenticatedAuthenticationToken.class);
//    }
//    
//}