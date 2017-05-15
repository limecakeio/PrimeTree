package BackendServer.Employee.Config;
import java.util.HashMap;
import javax.sql.DataSource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;
import org.springframework.context.annotation.PropertySource;
import org.springframework.core.env.Environment;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.jdbc.datasource.DriverManagerDataSource;
import org.springframework.orm.jpa.JpaTransactionManager;
import org.springframework.orm.jpa.LocalContainerEntityManagerFactoryBean;
import org.springframework.orm.jpa.vendor.HibernateJpaVendorAdapter;
import org.springframework.transaction.PlatformTransactionManager;

/**This class defines all beans required for the entity "Employee"
 * It is neccessary because the entity "employee lies in a different database than listing and user and needs to
 * get its properties defined like this. This class is inspired by this tutorial for accessing multiple databases 
 * in one Spring-Application using JPA: http://www.baeldung.com/spring-data-jpa-multiple-databases*/
@Configuration
@PropertySource({ "classpath:application.properties" })
@EnableJpaRepositories(
		basePackages = "BackendServer.Employee.Repositories",
		entityManagerFactoryRef = "employeeEntityManager", 
	    transactionManagerRef = "employeeTransactionManager"
		)
public class EmployeeBeanCollection {
	
	@Autowired
    private Environment env;
    
    @Bean
    @Primary
    public LocalContainerEntityManagerFactoryBean employeeEntityManager() {
    	
    	System.out.println("employeeEntityManager() aufgerufen");
    	
        LocalContainerEntityManagerFactoryBean em
          = new LocalContainerEntityManagerFactoryBean();
        em.setDataSource(employeeDataSource());
        em.setPackagesToScan(
          new String[] { "BackendServer.Employee.Entities" });
        em.setPersistenceUnitName("Employee");
 
        HibernateJpaVendorAdapter vendorAdapter
          = new HibernateJpaVendorAdapter();
        em.setJpaVendorAdapter(vendorAdapter);
        HashMap<String, Object> properties = new HashMap<String, Object>();
        properties.put("hibernate.hbm2ddl.auto",
          env.getProperty("employee.hbm2ddl.auto"));
        properties.put("hibernate.dialect",
          env.getProperty("hibernate.dialect"));
        em.setJpaPropertyMap(properties);
 
        return em;
    }
 
    @Primary
    @Bean
    public DataSource employeeDataSource() {
    	
    	System.out.println("employeeDataSource() aufgerufen");
  
        DriverManagerDataSource dataSource
          = new DriverManagerDataSource();
        dataSource.setDriverClassName(
          env.getProperty("jdbc.driverClassName"));
        dataSource.setUrl(env.getProperty("employee.jdbc.url"));
        dataSource.setUsername(env.getProperty("employee.jdbc.user"));
        dataSource.setPassword(env.getProperty("employee.jdbc.pass"));
 
        return dataSource;
    }
 
    @Primary
    @Bean
    public PlatformTransactionManager employeeTransactionManager() {
    	
    	System.out.println("employeeTransactionManager() aufgerufen");
  
        JpaTransactionManager transactionManager
          = new JpaTransactionManager();
        transactionManager.setEntityManagerFactory(
        	employeeEntityManager().getObject());
        return transactionManager;
    }
    
    
    
}
    