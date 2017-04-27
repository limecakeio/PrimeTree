package BackendServer.Authentification;

import java.util.EnumSet;

import javax.servlet.SessionTrackingMode;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.security.web.session.HttpSessionEventPublisher;

@Configuration
@EnableWebSecurity
public class AuthentificationConfiguration extends WebSecurityConfigurerAdapter{
	
	@Override
    protected void configure(final AuthenticationManagerBuilder auth) throws Exception {
        // @formatter:off
        auth.inMemoryAuthentication()
        .withUser("Schramm").password("bbaum").roles("USER")
        .and()
        .withUser("Knauber").password("Review").roles("ADMIN");
        // @formatter:on
	}
	
	@Override
    protected void configure(final HttpSecurity http) throws Exception {
        // @formatter:off
        http
        .csrf().disable()
        .authorizeRequests()
        .antMatchers("/authentification", "/login").permitAll()
        .antMatchers("/test").hasRole("ROLE_ADMIN")
        .antMatchers("/login").
        .anyRequest().authenticated()
        .and()
        .formLogin()
//         loginPage("/login.html")
//        .loginProcessingUrl("/login")
//        .successHandler(successHandler())
//        .failureUrl("/login.html?error=true")
        .and()
        .logout().deleteCookies("JSESSIONID")
        .and()
        .rememberMe().key("uniqueAndSecret").tokenValiditySeconds(86400)
        .and()
        .sessionManagement()
        .sessionFixation().migrateSession()
        .sessionCreationPolicy(SessionCreationPolicy.IF_REQUIRED)
        .invalidSessionUrl("/invalidSession.html")
        .maximumSessions(2)
        .expiredUrl("/sessionExpired.html");

        // @formatter:on
	}

//    private AuthenticationSuccessHandler successHandler() {
//        return new MySimpleUrlAuthenticationSuccessHandler();
//    }

    @Bean
    public HttpSessionEventPublisher httpSessionEventPublisher() {
        return new HttpSessionEventPublisher();
}

}
