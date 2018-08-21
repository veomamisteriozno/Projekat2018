package beans;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;

public class User {
	public enum UserType {CUSTOMER, ADMIN, DELIVERER}; 
	private String username;
	private String password;
	private String firstName;
	private String surname;
	private String phoneNumber;
	private String email;
	private String date;
	private UserType userType;
	
	//TODO: dodati listu omiljenih restorana
	
	public User(){
		DateFormat df = new SimpleDateFormat("dd/MM/yyyy");  
		this.date = df.format(new Date());
		userType = UserType.CUSTOMER;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getFirstName() {
		return firstName;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	public String getSurname() {
		return surname;
	}

	public void setSurname(String surname) {
		this.surname = surname;
	}

	public String getPhoneNumber() {
		return phoneNumber;
	}

	public void setPhoneNumber(String phoneNumber) {
		this.phoneNumber = phoneNumber;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getDate() {
		return date;
	}

	public void setDate(String date) {
		this.date = date;
	}

	public UserType getUserType() {
		return userType;
	}

	public void setUserType(UserType userType) {
		this.userType = userType;
	}
}
