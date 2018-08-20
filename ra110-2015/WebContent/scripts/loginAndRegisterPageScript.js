$(document).ready(function() {
	/*Login form*/
	$('#login').submit(function(event) {
		if(!(('#login').isValid)){ //check if form is valid
			event.preventDefault();//stop form from submitting
	        var form = $("#login");
	        var username = form.find('[name="username"]').val();
	        var password = form.find('[name="password"]').val();
	        
	        alert(username + " " + password);
	    }	
	});
	
	/*Register form*/
	$('#register').submit(function(event) {
		if(!(('#register').isValid)){ //check if form is valid
			event.preventDefault();//stop form from submitting
			var form = $("#register");
	        var username = form.find('[name="username"]').val();
	        var password = form.find('[name="password"]').val();
	        
	        alert("blah blah");
	    }
	});
});