'use strict';

var controller = require('./Controller');

function runSimulator() {
    // Configure the Controller
    controller.init(5, 3);

    // Get user input and send commands
    console.log("user input");
    controller.sendElevator(1, 2);

    // Display the state of each elevator
    console.log("display user input");
}

// Run the simulator
runSimulator();
