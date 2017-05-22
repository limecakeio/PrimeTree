package BackendServer.User.Service;

import java.util.List;

import BackendServer.ClientDatabaseAccess.Entities.EmployeeData;
import BackendServer.Exceptions.FavouriteNotFoundException;
import BackendServer.Exceptions.UserNotFoundException;
import BackendServer.Listings.SimpleMethods;
import BackendServer.User.User;
import BackendServer.UserData.Entities.UserData;

public class UserManagerImpl extends MyUserDetailsServiceImpl implements UserManager {

	@Override
	public int[] getFavouriteList(String username) {
		List<Integer> favouritesAsList=userDataRepository.findOne(this.loadUserByUsername(username).getId()).getFavouriteList();
		Integer[] favouritesAsIntegerArray=new Integer[favouritesAsList.size()];
		favouritesAsList.toArray(favouritesAsIntegerArray);
		return SimpleMethods.parseIntegerArrayToIntArray(favouritesAsIntegerArray);
	}

	@Override
	public User loadUserById(long userId) throws UserNotFoundException{
		EmployeeData employeeData=employeeDataRepository.findOne((long) userId);
		UserData userData=userDataRepository.findOne((long) userId);
		if(userData==null || employeeData==null){
			throw new UserNotFoundException("No user or employee with id " + userId);
		}
		return new User(employeeData, userData);
	}

	@Override
	public void addFavourite(long userId, int listingId) throws UserNotFoundException {
		this.loadUserById(userId).addFavourite(listingId);
	}

	@Override
	public void removeFavourite(long userId, long listingId) throws UserNotFoundException, FavouriteNotFoundException {
		this.loadUserById(userId).removeFavourite(listingId);
	}

	@Override
	public User[] getAllUsers() {
		UserData[] allUserDatas=SimpleMethods.parseObjectArrayToUserDataArray(userDataRepository.findAll().toArray());
		EmployeeData[] allMatchingEmployeeDatas=new EmployeeData[allUserDatas.length];
		for(int index=0;index<allUserDatas.length;index++){
			allMatchingEmployeeDatas[index]=employeeDataRepository.findOne(allUserDatas[index].getId());
		}
		User[] allUsers=new User[allUserDatas.length];
		for(int index=0;index<allUserDatas.length;index++){
			allUsers[index]=new User(allMatchingEmployeeDatas[index], allUserDatas[index]);
		}
		return allUsers;
	}

	@Override
	public void setIsAdminOnUser(int userId, boolean b) {
		UserData dataOfEditedUser=userDataRepository.findOne((long) userId);
		dataOfEditedUser.setInAdminRole(b);
		userDataRepository.save(dataOfEditedUser);
	}

}
