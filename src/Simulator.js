'use strict';

var controller = require('./Controller');
var prompt = require('prompt');

prompt.message = "-->";
prompt.delimiter = ":";

var schema = {
	properties: {
		command: {
			pattern:/[1-3]/,
			message: 'Unknown command, must be 1, 2 or 3',
			required:true
		}
	}
};

var floorRequestSchema = {
	properties: {
		pickupFloor: {
			pattern:/[1-10]/,
			description: 'Pickup floor #',
			type: 'integer',
			message: 'Pickup floor must be 1 thru 10',
			required:true
		},
		destinationFloor: {
			pattern:/[1-10]/,
			description: "Destination floor #",
			type: 'integer',
			message: 'Destination floor #',
			required:true
		}
	}
};
prompt.start();

function runSimulator() {
	// Configure the Controller - TODO - could ask the user for this information
	controller.init(5, 3);

	// Get user input and send commands
	getUserInput();
}

function displayUserOptions() {
	console.log("\n1. Request an elevator");
	console.log("2. Show elevator status");
	console.log("3. Quit\n");
}

function getUserInput() {
	// Show the user what they can do
	displayUserOptions();

	prompt.get(schema, function (err, result) {
		if(err) { console.log("An error occurred - sorry:" + err); }

		dispatchCommand(result.command);
	});
}

function dispatchCommand(command) {
	console.log('dispatchCommand called with:' + command);
	switch(command) {
		case '1':
			elevatorRequest();
			break;
		case '2':
			showElevators();
			getUserInput();
			break;
		case '3':
			prompt.stop();
			break;
		default:
			console.log('Unknown command');
			getUserInput();
	}
}

function elevatorRequest() {
	prompt.get(floorRequestSchema, function (err, result) {
		if(err) { console.log("An error occurred - sorry")}

		// Send the information to the controller
		var controllerPromise = controller.sendElevator(result.pickupFloor, result.destinationFloor);

		controllerPromise.then(function(data){
			console.log(data);
		}, function(data){
			console.log(data);
		});

		// Ask the user for the next command - even while the elevators are moving
		getUserInput();
	});
}

function showElevators() {
	controller.getElevators().forEach(function(elevator){
		console.log("-----------------------------------");
		elevator.showStatus();
		console.log("-----------------------------------");
	});
}

// Run the simulator
runSimulator();
