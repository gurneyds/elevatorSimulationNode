'use strict';

var ElevatorState = require("./ElevatorState");
var events = require('events');
var eventEmitter = new events.EventEmitter();

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
	this.state = ElevatorState.STOPPED;
	this.tripCount = 0;
}

// Service the elevator
Elevator.prototype.service = function() {
	this.tripCount = 0;
}

Elevator.prototype.doWork = function(pickupFloor, destinationFloor) {
	var that = this;

	// Close the door, open the door
	return this._openDoor(false)
		.then(function() {return that._moveToFloor(pickupFloor)})
		.then(function() {return that._openDoor(true)})
		.then(function() {return that._waitForPassengers()})
		.then(function() {return that._openDoor(false)})
		.then(function() {return that._moveToFloor(destinationFloor)})
		.then(function() {
			that.tripCount++;
			that.state = ElevatorState.STOPPED;

			console.log("waiting for the next request");

			// Notify listeners that the elevator is ready for another request
			//eventEmitter.emit('elevator');
		});
}

Elevator.prototype._openDoor = function(shouldOpen) {
	var that = this;
	return new Promise(function(resolve, reject){
		that.state = shouldOpen ? ElevatorState.DOORS_OPENING : ElevatorState.DOORS_CLOSING;

		var message = shouldOpen ? "open" : "close";

		// TODO - maybe emit an event here? Then a listener could choose to display what is happening?

		console.log("Starting to " + message + " door");
		setTimeout(function(message) {
			resolve(message);
			console.log("Door is now " + message);
			// TODO - maybe emit an event here? Then a listener could choose to display what is happening?
		}.bind(null, message), that.doorTime);
	});
}

Elevator.prototype._moveToFloor = function(floorNum) {
	var moveTime = 0;
	var deltaFloors = this.currentFloor - floorNum; // Determine how many floors we need to travel
	this.state = deltaFloors > 0 ? ElevatorState.MOVING_UP : ElevatorState.MOVING_DOWN;
	moveTime = Math.abs(deltaFloors * this.floorTravelTime);

	var that = this;
	return new Promise(function(resolve, reject){
		console.log("Starting to move to floor " + floorNum);
		setTimeout(function(floorNum) {
			that.state = ElevatorState.STOPPED;
			that.currentFloor = floorNum;
			resolve(floorNum);
			console.log("Arrived at floor " + floorNum);
			// TODO - maybe emit an event here? Then a listener could choose to display what is happening?
		}.bind(null, floorNum), moveTime);
	});
}

Elevator.prototype._waitForPassengers = function() {
	var that = this;
	this.state = ElevatorState.WAITING_FOR_PASSENGERS;
	return new Promise(function(resolve, reject){
		console.log("Waiting for passengers to load/unload");
		setTimeout(function(floorNum) {
			that.state = ElevatorState.STOPPED;
			resolve();
			console.log("Done waiting for passengers");
			// TODO - maybe emit an event here? Then a listener could choose to display what is happening?
		}, that.passengerTime);
	});
}

module.exports = {
	Elevator:Elevator
}
