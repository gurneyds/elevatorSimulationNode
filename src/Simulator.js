'use strict';
var prompt = require('prompt');

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

var controller = require('./Controller');

function runSimulator() {
    // Configure the Controller - TODO - could ask the user for this information
    controller.init(5, 3);

    // Show the user what they can do
    displayUserOptions();

    // Get user input and send commands
    getUserInput();
}

function displayUserOptions() {
    console.log("\n1. Request an elevator");
    console.log("2. Show elevator status");
    console.log("3. Quit\n");
}

function getUserInput() {
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
            break;
        case '3':
            rl.close();
            break;
        default:
            console.log('Unknown command');
    }
}

function showElevators() {
    console.log("\nshow elevator status here:");
}

function elevatorRequest() {
    prompt.get(floorRequestSchema, function (err, result) {
        if(err) { console.log("An error occurred - sorry")}
        console.log("Pickup:" + result.pickupFloor + " destination floor:" + result.destinationFloor);
    });
}

// Run the simulator
runSimulator();
