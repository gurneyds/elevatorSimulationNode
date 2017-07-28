'use strict';

var ElevatorState = require("./elevatorState");

// State data for a given elevator
var data = {};

function elevator(name, maxTrips) {
    data.name = name || 'elevator';
    data.tripCount = 0;
    data.currentFloor = 0;
    data.state = elevatorState.STOPPED;
    data.maxTrips = maxTrips || 100;
}

// Service the elevator
function serviceElevator() {
    data.tripCount = 0;
}

function doWork(pickupFloor, destinationFloor) {
    // Close the doors

    // Set the status to moving up or down

    // Go to pickup floor
    _moveToPickupFloor();

    // Open the doors

    // Close the doors

    // Go to destination floor
    _moveToDestinationFloor();

    // Open the doors

    // Increment the trip count
    state.tripCount++;
}

function _moveToPickupFloor() {
    // Move 1 floor at a time in case there is a change of plans
}

function _moveToDestinationFloor() {
    // Move 1 floor at a time in case there is a change of plans
}

module.exports = {
    service,
    doWork
}
