'use strict';

var MovementEnum = require("./MovementEnum");
var events = require('events');

function Elevator(name, maxTrips, floorTravelTime, doorTime, passengerTime) {
	// Configuration information
	this.name = name || 'elevator';
	this.maxTrips = maxTrips || 100;
	this.floorTravelTime = floorTravelTime || 5000;
	this.doorTime = doorTime || 2000;
	this.passengerTime = passengerTime || 3000;

	// Dynamic state information
	this.tripCount = 0;
	this.currentFloor = 1;
	this.destinationFloor = 1;
	this.movementState = MovementEnum.STOPPED;
}

// Service the elevator
Elevator.prototype.service = function() {
	this.tripCount = 0;
};

Elevator.prototype.estimateTime = function(pickupFloor) {
	// If the elevator is stopped, get the time to move to the pickup floor
	if(this.movementState === MovementEnum.STOPPED) {
		return this._estimateTimeToFloor(this.currentFloor, pickupFloor);
	} else {
		// Calculate the time to finish the current trip
		var finishTrip = this._estimateTimeToFloor(this.currentFloor, this.destinationFloor);
		var toPickupFloor = this._estimateTimeToFloor(this.destinationFloor, pickupFloor);
		return finishTrip + toPickupFloor;
	}
};

// Helper method
Elevator.prototype._estimateTimeToFloor = function(pickupFloor, destinationFloor) {
	var deltaFloors = Math.abs(pickupFloor - destinationFloor);
	var floorTransitionTime = deltaFloors * this.floorTravelTime;
	var doorTime = (deltaFloors * this.doorTime) * 2;  // Open and close the door
	var passengerWaitTime = deltaFloors * this.passengerTime;
	return floorTransitionTime + doorTime + passengerWaitTime;
};

Elevator.prototype.doWork = function(pickupFloor, destinationFloor) {
	var that = this;
	this.destinationFloor = destinationFloor;

	// Close the door, open the door
	return this._openDoor(false)
		.then(function() {return that._moveToFloor(pickupFloor)})
		.then(function() {return that._openDoor(true)})
		.then(function() {return that._waitForPassengers()})
		.then(function() {return that._openDoor(false)})
		.then(function() {return that._moveToFloor(destinationFloor)})
		.then(function() {
			that.tripCount++;
			that.movementState = MovementEnum.STOPPED;

			console.log("waiting for the next request");

			return new Promise(function(resolve){
				resolve("done servicing the elevator request");
			})
		});
};

Elevator.prototype._openDoor = function(shouldOpen) {
	var that = this;
	return new Promise(function(resolve){
		var message = shouldOpen ? "open" : "close";

		console.log("Starting to " + message + " door");
		setTimeout(function(message) {
			resolve(message);
			console.log("Door is now " + message);
		}.bind(null, message), that.doorTime);
	});
};

Elevator.prototype._moveToFloor = function(floorNum) {
	var moveTime = 0;
	var deltaFloors = this.currentFloor - floorNum; // Determine how many floors we need to travel
	this.movementState = deltaFloors > 0 ? MovementEnum.MOVING_UP : MovementEnum.MOVING_DOWN;
	moveTime = Math.abs(deltaFloors * this.floorTravelTime);

	var that = this;
	return new Promise(function(resolve){
		console.log("Starting to move to floor " + floorNum);
		setTimeout(function(floorNum) {
			that.state = MovementEnum.STOPPED;
			that.currentFloor = floorNum;

			// Resolve the promise
			resolve(floorNum);
			console.log("Arrived at floor " + floorNum);
		}.bind(null, floorNum), moveTime);
	});
};

Elevator.prototype._waitForPassengers = function() {
	var that = this;
	return new Promise(function(resolve){
		console.log("Waiting for passengers to load/unload");
		setTimeout(function() {
			that.state = MovementEnum.STOPPED;

			// Resolve the promise
			resolve();
			console.log("Done waiting for passengers");
		}, that.passengerTime);
	});
};

Elevator.prototype.showStatus = function() {
	console.log("Name:" + this.name);
	console.log("Current floor:" + this.currentFloor);
	console.log("Destination floor:" + this.destinationFloor);
	console.log("Movement status:" + MovementEnum.describe(this.movementState));
	console.log("Trip count:" + this.tripCount);
};

module.exports = {
	Elevator:Elevator
};
