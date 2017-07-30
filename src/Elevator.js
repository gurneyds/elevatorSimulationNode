'use strict';

var ElevatorState = require("./ElevatorState");
var events = require('events');
var eventEmitter = new events.EventEmitter();
var Timer = require('timer.js');

var floorTravelTimer = new Timer();
var doorMoveTimer = new Timer();
var waitForPassengersTimer = new Timer();

function Elevator(name, maxTrips, floorTravelTime, doorTime, passengerTime) {
	// Configuration information
	this.name = name || 'elevator';
	this.maxTrips = maxTrips || 100;
	this.floorTravelTime = floorTravelTime || 300;
	this.doorTime = doorTime || 200;
	this.passengerTime = passengerTime || 3;

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

Elevator.prototype.myPromise = function(value, delay) {
	var that = this;
	return new Promise(function(resolve, reject){
		setTimeout(function(value) {
			console.log(value);
			resolve(value);
		}.bind(null, value), delay);
	});
}

Elevator.prototype.doWork = function(pickupFloor, destinationFloor) {
	console.log('Elevator doWork called pickupFloor:' + pickupFloor + " destinationFloor:" + destinationFloor);

	var that = this;

	// Close the door, open the door
	return this._openDoor(false)
		.then(function() {return that._moveToFloor(pickupFloor)})
		.then(function() {return that._openDoor(true)})
		.then(function() {return that._openDoor(false)})
		.then(function() {return that._moveToFloor(destinationFloor)})
		.then(function() {
			that.tripCount++;

			// Notify listeners that the elevator is ready for another request
			//	eventEmitter.emit('elevator');
		});
}

Elevator.prototype._openDoor = function(shouldOpen) {
	var that = this;
	return new Promise(function(resolve, reject){
		that.state = shouldOpen ? ElevatorState.DOORS_OPENING : ElevatorState.DOORS_CLOSING;

		var message = shouldOpen ? "open" : "close";

		// TODO - maybe emit an event here? Then a listener could choose to display what is happening?

		setTimeout(function(message) {
			resolve(message);
			console.log("door is now " + message);
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
		setTimeout(function(floorNum) {
			that.state = ElevatorState.STOPPED;
			that.currentFloor = floorNum;
			resolve(floorNum);
			console.log("now at floor " + floorNum);
			// TODO - maybe emit an event here? Then a listener could choose to display what is happening?
		}.bind(null, floorNum), moveTime);
	});
}

module.exports = {
	Elevator:Elevator
}
