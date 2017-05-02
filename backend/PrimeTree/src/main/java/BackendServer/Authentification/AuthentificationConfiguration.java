package BackendServer.Authentification;

import java.util.Arrays;
import java.util.EnumSet;

import javax.servlet.SessionTrackingMode;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.security.web.session.HttpSessionEventPublisher;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

@Configuration
@EnableWebSecurity
public class AuthentificationConfiguration extends WebSecurityConfigurerAdapter{
	
	/**A dummy configuration of the AuthenticationManagerBuilder*/
//	@Override
	@Autowired
    protected void configureGlobal(/*final**/ AuthenticationManagerBuilder auth) throws Exception {
        auth.inMemoryAuthentication().withUser("Schramm").password("bbaum").roles("USER");
        auth.inMemoryAuthentication().withUser("Knauber").password("review").roles("ADMIN");
	}
	
	/**The HttpSecurity configuration of the whole BackendServer*/
	@Override
    protected void configure(final HttpSecurity http) throws Exception {
        http
			.authorizeRequests()
			.antMatchers("/listing")//.permitAll()//
			//.hasAnyRole()
			.access("hasRole('ROLE_ADMIN')")
//		.and()
//			.cors()
		.and()
			.formLogin()
			//.loginPage("/authentification/login")
//			.permitAll()
//		.and()
//			.logout()
//			.logoutUrl("/authentification/logout")
//			.invalidateHttpSession(true)
			;
	}
	
//	@Bean
//	CorsConfigurationSource corsConfigurationSource(){
//		CorsConfiguration corsConfig=new CorsConfiguration();
//		corsConfig.setAllowedOrigins(Arrays.asList("141.19.174/bitka/"));
//		corsConfig.setAllowedMethods(Arrays.asList("GET", "POST"));
//		UrlBasedCorsConfigurationSource source= new UrlBasedCorsConfigurationSource();
//		source.registerCorsConfiguration("/**", corsConfig);
//		return source;
//	}

}
