'use strict';

var ElevatorState = require("./ElevatorState");

function Elevator(name, maxTrips) {
    this.name = name || 'elevator';
    this.tripCount = 0;
    this.currentFloor = 0;
    this.state = ElevatorState.STOPPED;
    this.maxTrips = maxTrips || 100;
}

// Service the elevator
Elevator.prototype.service = function() {
    data.tripCount = 0;
}

Elevator.prototype.doWork = function(pickupFloor, destinationFloor) {
    console.log('Elevator doWork called');
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

Elevator.prototype._moveToPickupFloor = function() {
    // Move 1 floor at a time in case there is a change of plans
    console.log('Elevator _moveToPickupFloor called');
}

Elevator.prototype._moveToDestinationFloor = function() {
    // Move 1 floor at a time in case there is a change of plans
    console.log('Elevator _moveToDestinationFloor called');
}

module.exports = {
    Elevator
}
