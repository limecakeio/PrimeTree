package BackendServer.Security.Configuration;

import java.util.EnumSet;

import javax.servlet.SessionTrackingMode;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.authentication.encoding.ShaPasswordEncoder;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.security.web.authentication.AuthenticationFailureHandler;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationFailureHandler;
import org.springframework.security.web.authentication.logout.LogoutSuccessHandler;
import org.springframework.security.web.session.HttpSessionEventPublisher;

import BackendServer.Account.Service.UserService;

@Configuration
@EnableWebSecurity
public class AuthenticationConfiguration extends WebSecurityConfigurerAdapter{
	
	private static final String ISLOGGEDIN_PATH="/authentication/isloggedin";

	@Autowired
	private UserDetailsService userDetailsService;
	@Autowired
	private AuthenticationEntryPoint authenticationEntryPoint;
	@Autowired
	private AuthenticationSuccessHandler authenticationSuccessHandler;
	@Autowired
	private AuthenticationFailureHandler authenticationFailureHandler;
	@Autowired
	private LogoutSuccessHandler logoutSuccessHandler;
	@Autowired
	private AuthenticationProvider authenticationProvider;
	
//	@Override
//    protected void configure(final AuthenticationManagerBuilder auth) throws Exception {
//        auth.inMemoryAuthentication()
//        .withUser("Schramm").password("bbaum").roles("USER")
//        .and()
//        .withUser("Knauber").password("Review").roles("USER").roles("ADMIN");
//	}
	
	@Override
    protected void configure(final HttpSecurity http) throws Exception {
        http
        .csrf().disable()
        .authenticationProvider(authenticationProvider)
        .exceptionHandling()
        .authenticationEntryPoint(authenticationEntryPoint)
        .and()
        .formLogin()
        .permitAll()
        .loginProcessingUrl(ISLOGGEDIN_PATH)
        .usernameParameter("username")
        .passwordParameter("password")
        .successHandler(authenticationSuccessHandler)
        .failureHandler(authenticationFailureHandler)
        .and()
        .logout()
        .permitAll()
        .logoutSuccessHandler(logoutSuccessHandler)
        ;
        
        http
        .authorizeRequests()
        .antMatchers("/listing").hasRole("ROLE_USER");
	}
	
	@Bean
	public AuthenticationEntryPoint authenticationEntryPoint(){
		return new MyAuthenticationEntryPoint();
	}
	
	@Bean
	public AuthenticationSuccessHandler authenticationSuccessHandler(){
		return new MyAuthenticationSuccessHandler();
	}
	
	@Bean
	public AuthenticationFailureHandler authenticationFailureHandler(){
		return new MyAuthenticationFailureHandler();
	}
	
	@Bean
	public LogoutSuccessHandler logoutSuccessHandler(){
		return new MyLogoutSuccessHandler();
	}
	
	@Bean
	public UserDetailsService userDetailsService(){
		return new MyUserDetailsServiceImpl();
	}
	
	@Bean
	public AuthenticationProvider authenticationProvider(){
		DaoAuthenticationProvider authenticationProvider=new DaoAuthenticationProvider();
		authenticationProvider.setUserDetailsService(userDetailsService);
		authenticationProvider.setPasswordEncoder(new ShaPasswordEncoder());
		return authenticationProvider;
	}

}
