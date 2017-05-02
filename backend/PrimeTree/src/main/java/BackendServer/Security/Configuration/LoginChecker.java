package BackendServer.Security.Configuration;

public interface LoginChecker{
	
	public boolean isLoggedIn();
	public void login();
	public void logout();

}