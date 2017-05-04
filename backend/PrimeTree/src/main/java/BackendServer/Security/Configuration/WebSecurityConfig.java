package BackendServer.Security.Configuration;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.core.userdetails.UserDetailsService;

import BackendServer.User.Service.MyUserDetailsServiceImpl;

import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;

@Configuration
@EnableWebSecurity
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {
	
	@Autowired
    private AuthenticationProvider authenticationProvider;
	@Autowired
	private UserDetailsService userDetailsService;

	@Override
    protected void configure(HttpSecurity http) throws Exception {
        http
            .authorizeRequests()
                .antMatchers("/", "/home").permitAll()
                .anyRequest().authenticated()
                .and()
            .formLogin()
                .loginPage("/login")
                .permitAll()
                .and()
            .logout()
                .permitAll();
    }

    @Autowired
    public void configureGlobal(AuthenticationManagerBuilder auth) throws Exception {
        auth.authenticationProvider(authenticationProvider);
//            .inMemoryAuthentication().withUser("admin").password("admin").roles("admin").and()
//                .withUser("user").password("user").roles("user");
    }
    
    @Bean
    public AuthenticationProvider authenticationProvider(){
    	DaoAuthenticationProvider authenticationProvider =new DaoAuthenticationProvider();
    	authenticationProvider.setUserDetailsService(userDetailsService);
    	return authenticationProvider;
    }
    
    @Bean
    public UserDetailsService userDetailsService(){
    	return new MyUserDetailsServiceImpl();
    }
}