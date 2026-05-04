package org.expense.dto;

import lombok.Data;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
@Data
public class RegisterRequest {
	
	
	 	@Email(message = "Invalid email")
	    @NotBlank(message = "Email required")
	    private String email;

	    @Size(
	            min = 6,
	            message = "Password must be at least 6 characters")
	    private String password;
	    
		 public String getEmail() {
			 return email;
		 }
		 public void setEmail(String email) {
			 this.email = email;
		 }
		 public String getPassword() {
			 return password;
		 }
		 public void setPassword(String password) {
			 this.password = password;
		 }
	 
	 
}
