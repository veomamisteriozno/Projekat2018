$(document).ready(function() {
	/*Login form submit*/
	$('#login').submit(function(event) {
		if(!(('#login').isValid)){ //check if form is valid
			event.preventDefault();//stop form from submitting
			
			//get values of fields
	        var form = $("#login");
	        var username = form.find('[name="username"]').val();
	        var password = form.find('[name="password"]').val();
	        
	        //send message to server to login in user
	        $.ajax({
    			url: "http://localhost:8080/ra110-2015/rest/userService/login",
    			type:"POST",
    			data: JSON.stringify({username: username, password: password}),	    			
    			contentType:"application/json",	
    			success: function() {
    				//if login is succesful move user to main page
    				window.location.replace("http://localhost:8080/ra110-2015");    		
    			},
    			error: function(message) {
    				//inform user if error ocurred (etc. wrong password or username)
    				alert(message);
				}
    		}); 
	    }	
	});
	
	/*Register form submit*/
	$('#register').submit(function(event) {
		if(!(('#register').isValid)){ //check if form is valid
			event.preventDefault();//stop form from submitting
			
			//get values of fields
			var form = $("#register");
	        var username = form.find('[name="username"]').val();
	        var password = form.find('[name="password"]').val();
	        var firstName = form.find('[name="firstName"]').val();
	        var surname = form.find('[name="surname"]').val();
	        var phoneNumber = form.find('[name="phoneNumber"]').val();
	        var email = form.find('[name="email"]').val();
	        
	        //TODO: validacija
	        
	        //send message to server to register user
	        $.ajax({
    			url: "http://localhost:8080/ra110-2015/rest/userService/register",
    			type:"PUT",
    			data: JSON.stringify({username: username, password: password, firstName: firstName, surname:surname, phoneNumber:phoneNumber, email:email}),	    			
    			contentType:"application/json",	
    			success: function() {
    				//if registration is succesful move user to main page
    				window.location.replace("http://localhost:8080/ra110-2015");    		
    			},
    			error: function(message) {
    				//inform user if error ocurred (etc. email our username are already taken)
    				alert(message);
				}
    		});
	    }
	});
});