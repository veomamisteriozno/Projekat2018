/*
 * PAGE ACTIONS
 */
/**
 * Makes page ready for use
 */
$(document).ready(function(e) {	
	//TODO: dodati poziv da se skloni sta ne treba za tog korisnika
	//reset form
	resetAddRestaurantForm();
	//fill table with restaurants
	loadAllRestaurants();  
});

/**
 * Loads all existing restaurants and puts them in table
 */
function loadAllRestaurants(){
	 $.ajax({
			url: "http://localhost:8080/projekat/rest/vehicles", //TODO: url za sve restorane
			type:"GET",			
			success: function(restaurants) {
				for (let restaurant of restaurants) {
					var tr = createTableRow(restaurant);
					$('#restaurantsTable').append(tr);
				}		
			}
	}); 
}


/*
 * ACTIONS FOR ADD/EDIT FORM ON LEFT SIDE
 */

/**
 * Clears values of fields in form and sets titles and buttons
 */
function resetAddRestaurantForm(){
	var form = $("#addRestaurant");	
	//reset visible fields
	form[0].reset();
	//reset hidden field with id	
	form.find('[name="id"]').val("");	
	//change title and button in form to show that editing is happening
	$('#title').empty().append("Add restaurant");
	$('#addRestaurantSubmit').empty().append("Add");
}

/**
 * Action for submiting form on the left side
 * If hidden field has value, it's editing, if field is empty it's adding new restaurant
 */
function sumbitAddRestaurantForm(){
	event.preventDefault();//stop form from submitting
	//get values of fields
	var form = $("#addRestaurant");	
	var id = form.find('[name="id"]').val();
	var name = form.find('[name="name"]').val();
	var address = form.find('[name="address"]').val();
	var category = form.find('[name="category"]').val();
	
	//TODO: validacija podataka za restoran
	
	if( id.length == 0){
		//there is no id so add new restaurant
		$.post({
			url: "http://localhost:8080/projekat/rest/vehicles/add", //TODO: url za dodavnje restorana
			data: JSON.stringify({id:id}), //TODO: json za restoran
			contentType: 'application/json',
			success: function(restaurant) {	
				//reset form
				resetAddRestaurantForm();
				//add new row to table
				var tr = createTableRow(restaurant);
				$('#restaurantsTable').append(tr);
				
			},
			error: function(message) {
				alert(message);
			}
		});
	}
	else{
		//there is id, so edit existing restaurant
		$.put({
			url: "http://localhost:8080/projekat/rest/vehicles/add", //TODO: url za uredjivanje restorana
			data: JSON.stringify({id:id}), //TODO: json za restoran
			contentType: 'application/json',
			success: function(restaurant) {	
				//reset form
				resetAddRestaurantForm();
				//replace row in table
				var tr = createTableRow(restaurant);
				$('tr#' + restaurant.id).replaceWith(tr);				
			},
			error: function(message) {
				alert(message);
			}
		});
	}
	
}

/*
 * ACTIONS FOR TABLE
 */
/**
 * Creats table row for one restaurant
 */
function createTableRow(restaurant){
	//TODO: proveri nazive polja u restoranu, ja sam stavljala id, name, address i category
	//create row and cells
	var tr = $('<tr id="' + restaurant.id + '"></tr>');
	
	//cells with info
	var nameTd = $('<td>' + restaurant.name + '</td>');
	var addressTd = $('<td>' + restaurant.address + '</td>');
	var categoryTd = $('<td>' + restaurant.category + '</td>');
	
	//cell with actions
	var actionsTd = $('<td></td>');
	var viewMenuLink = $('<a class="btn btn-default" href="#">Menu »</a>');
	var editLink = $('<a class="btn btn-default" href="#">Edit</a>');
	editLink.click(editRestaurantClick(restaurant));
	var deleteLink = $('<a class="btn btn-default" href="#">Delete</a>');
	deleteLink.click(deleteRestaurantClick(restaurant.id, tr));
	actionsTd.append(viewMenuLink).append(editLink).append(deleteLink);
	
	//append cells to row
	tr.append(nameTd).append(addressTd).append(categoryTd).append(actionsTd);
	return tr;
}

/**
 * Action for deleting restaurant
 */
function deleteRestaurantClick(restaurantID, tableRow){
	return function(){
		//ask server to delete restaurant	
		$.ajax({
		    type: 'DELETE',
		    url: "http://localhost:8080/ra110-2015/rest/userService/login",	 //TODO url za brisanje     
		    success: function() {
		    	//if deleting on server was succesful, remove table row
		    	$(tableRow).remove();		    	
			},
			error: function(message){
				//if deleting failed, show error message
				alert(message.responseText);
			}
		});
	}
}

/**
 * Action for clicking edit restaurant. Sets form on left side with current data
 */
function editRestaurantClick(restaurant){
	return function(){
		//change title and button in form to show that editing is happening
		$('#title').empty().append("Edit restaurant");
		$('#addRestaurantSubmit').empty().append("Save changes");
		
		//fill in form fields with current data
		var form = $("#addRestaurant");
		form.find('[name="id"]').val(restaurant.id);
		form.find('[name="name"]').val(restaurant.name);
		form.find('[name="address"]').val(restaurant.address);
		form.find('[name="category"]').val(restaurant.category);
	}
}