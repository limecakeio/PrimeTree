package BackendServer.Security.Configuration;

import javax.servlet.Filter;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.security.web.authentication.AuthenticationFailureHandler;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.authentication.logout.LogoutSuccessHandler;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;

import BackendServer.User.Service.MyUserDetailsServiceImpl;
import BackendServer.User.Service.UserManager;
import BackendServer.User.Service.UserManagerImpl;

/**This class configures Spring Security
 * @author Florian Kutz
 *
 */
@Configuration
@EnableWebSecurity
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {
	
	@Autowired
    private AuthenticationProvider authenticationProvider;
	@Autowired
	MyLoginSuccessHandler mySuccessHandler;
	@Autowired
	private AuthenticationFailureHandler myFailureHandler;
	@Autowired
	private LogoutSuccessHandler logoutSuccessHandler;
	@Autowired
	private AuthenticationEntryPoint authenticationEntryPoint;


	@Override
    protected void configure(HttpSecurity http) throws Exception {
		System.out.println("configure(HttpSecurity http)");
		
		http.addFilterBefore(new MyUsernamePasswordAuthenticationFilter(authenticationManager()), UsernamePasswordAuthenticationFilter.class);
		
//		http.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);
		http.addFilterBefore(jSessionIdSetterFilter(),UsernamePasswordAuthenticationFilter.class);
		
		  http.csrf().disable()
            .authorizeRequests()
            	.antMatchers(HttpMethod.OPTIONS, "/**").permitAll()
            	.antMatchers("/user/login").anonymous()
                .antMatchers("/", "/home").permitAll()
                .antMatchers("/listings/inactive").hasAuthority("ADMIN")
                .antMatchers("/users").hasAuthority("ADMIN")
                .antMatchers("/user/{id}/admin").hasAuthority("ADMIN")
                .anyRequest().authenticated()
            .and()
            	.exceptionHandling().authenticationEntryPoint(authenticationEntryPoint)//.accessDeniedHandler(accessDeniedHandler)
            .and()
//            	.addFilterAt(new MyUsernamePasswordAuthenticationFilter(), UsernamePasswordAuthenticationFilter.class)
            	.formLogin()
                .loginPage("/login")
                .permitAll()
                .loginProcessingUrl("/user/login")
                .permitAll()
                .successHandler(mySuccessHandler)
                .failureHandler(myFailureHandler)
                .and()
            .logout()
            .logoutRequestMatcher(new AntPathRequestMatcher("/user/logout"))
            	.permitAll()
                .logoutSuccessHandler(logoutSuccessHandler)
                ;
    }

	@Bean
    public JSessionIdSetterFilter jSessionIdSetterFilter() {
		return new JSessionIdSetterFilter();
	}

	@Autowired
    public void configureGlobal(AuthenticationManagerBuilder auth) throws Exception {
        auth.authenticationProvider(authenticationProvider);
    }
    
    /**The AuthenticationProvider is a DaoAuthenticationProvider with the UserDetailsservice MyUserDetsailsService
     * @return The DaoAthenticationProider
     */
    @Bean
    public AuthenticationProvider authenticationProvider(){
    	DaoAuthenticationProvider authenticationProvider =new DaoAuthenticationProvider();
    	authenticationProvider.setUserDetailsService(userDetailsService());
    	return authenticationProvider;
    }
    
    @Bean
    public UserDetailsService userDetailsService(){
    	return new MyUserDetailsServiceImpl();
    }
    
    @Bean
    MyLoginSuccessHandler mysuccessHandler(){
    	return new MyLoginSuccessHandler();
    }
    
    @Bean
    AuthenticationFailureHandler authenticationFailureHandler(){
    	return new MyLoginFailureHandler();
    }
    
    @Bean
    LogoutSuccessHandler logoutSuccessHandler(){
    	return new MyLogoutSuccessHandler();
    }
    
    @Bean
    AuthenticationEntryPoint authenticationEntryPoint(){
    	return new MyAuthenticationEntryPoint();
    }
}