/*
 * PAGE ACTIONS
 */
/**
 * Makes page ready for use
 */
$(document).ready(function(e) {	
	//TODO: dodati poziv da se skloni sta ne treba za tog korisnika
	//reset form
	resetAddVehicleForm();
	//fill table with restaurants
	loadAllVehicles();  
});

/**
 * Loads all existing restaurants and puts them in table
 */
function loadAllVehciles(){
	 $.ajax({
			url: "http://localhost:8080/projekat/rest/vehicles", //TODO: url za sve vozila
			type:"GET",			
			success: function(vehciles) {
				for (let vehcile of vehciles) {
					var tr = createTableRow(vehcile);
					$('#vehiclesTable').append(tr);
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
function resetAddVehicleForm(){
	var form = $("#addVehicle");	
	//reset visible fields
	form[0].reset();
	//reset hidden field with id	
	form.find('[name="id"]').val("");	
	//change title and button in form to show that editing is happening
	$('#title').empty().append("Add vehicle");
	$('#addVehicleSubmit').empty().append("Add");
}

/**
 * Action for submiting form on the left side
 * If hidden field has value, it's editing, if field is empty it's adding new restaurant
 */
function sumbitAddRestaurantForm(){
	event.preventDefault();//stop form from submitting
	//get values of fields
	var form = $("#addVehicle");	
	var id = form.find('[name="id"]').val();
	var model = form.find('[name="model"]').val();
	var brand = form.find('[name="brand"]').val();
	var type = form.find('[name="type"]').val();
	var platesNumber = form.find('[name="platesNumber"]').val();
	var productionYear = form.find('[name="productionYear"]').val();
	var note = form.find('[name="note"]').val();
	//TODO: validacija podataka za vozilo
	
	if( id.length == 0){
		//there is no id so add new vehcile
		$.post({
			url: "http://localhost:8080/projekat/rest/vehicles/add", //TODO: url za dodavnje vozila
			data: JSON.stringify({id:id}), //TODO: json za vozilo
			contentType: 'application/json',
			success: function(vehicle) {	
				//reset form
				resetAddVehicleForm();
				//add new row to table
				var tr = createTableRow(vehicle);
				$('#vehiclesTable').append(tr);
				
			},
			error: function(message) {
				alert(message);
			}
		});
	}
	else{
		//there is id, so edit existing vehicle
		$.put({
			url: "http://localhost:8080/projekat/rest/vehicles/add", //TODO: url za uredjivanje vozila
			data: JSON.stringify({id:id}), //TODO: json za vozilo
			contentType: 'application/json',
			success: function(vehicle) {	
				//reset form
				resetAddVehicleForm();
				//replace row in table
				var tr = createTableRow(vehicle);
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
 * Creats table row for one vehcile
 */
function createTableRow(vehicle){
	//TODO: proveri nazive polja u vozilu
	//create row and cells
	var tr = $('<tr id="' + vehicle.id + '"></tr>');
	
	//cells with info
	var brandTd = $('<td>' + vehicle.brand + '</td>');
	var modelTd = $('<td>' + vehicle.model + '</td>');
	var typeTd = $('<td>' + vehicle.type + '</td>');
	var platesNumberTd = $('<td>' + vehicle.platesNumber+ '</td>');
	var productionYearTd = $('<td>' + vehicle.productionYear+ '</td>');
	var noteTd = $('<td>' + vehicle.note + '</td>');
	
	//cell with actions
	var actionsTd = $('<td></td>');
	var takeVehicleLink = $('<a class="btn btn-default" href="#">Take vehicle</a>');
	var editLink = $('<a class="btn btn-default" href="#">Edit</a>');
	editLink.click(editVehicleClick(vehicle));
	var deleteLink = $('<a class="btn btn-default" href="#">Delete</a>');
	deleteLink.click(deleteVehicleClick(vehicle.id, tr));
	actionsTd.append(takeVehicleLink ).append(editLink).append(deleteLink);
	
	//append cells to row
	tr.append(brandTd).append(modelTd).append(typeTd).append(platesNumberTd).append(productionYearTd).append(noteTd).append(actionsTd);
	return tr;
}

/**
 * Action for deleting restaurant
 */
function deleteVehcileClick(vehicleID, tableRow){
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
function editVehcileClick(vehicle){
	return function(){
		//change title and button in form to show that editing is happening
		$('#title').empty().append("Edit vehicle");
		$('#addVehcileSubmit').empty().append("Save changes");
		
		//fill in form fields with current data
		var form = $("#addVehcile");
		form.find('[name="id"]').val(vehicle.id);
		form.find('[name="model"]').val(vehicle.model);
		form.find('[name="brand"]').val(vehicle.brand);
		form.find('[name="type"]').val(vehcile.type);
		form.find('[name="platesNumber"]').val(vehicle.platesNumber);
		form.find('[name="productionYear"]').val(vehicle.productionYear);
		form.find('[name="note"]').val(vehicle.note);
	}
}