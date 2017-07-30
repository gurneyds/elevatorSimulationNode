'use strict';
var Elevator = require('./Elevator').Elevator;
var events = require('events');
var eventEmitter = new events.EventEmitter();

// Setup the elevator listener
eventEmitter.on('elevator', elevatorListener);

// Controller for all of the elevators
function init(numFloors, numElevators, maxTrips, floorTravelTime, doorTime) {
	this.numFloors = numFloors || 4;
	this.numElevators = numElevators || 2 > 10;
	this.maxTrips = maxTrips || 100;
	this.floorTravelTime = floorTravelTime || 20;
	this.doorTime = doorTime || 4;

	this.elevators = [];

	// Create the elevators
	for(var i=0; i < this.numElevators; i++) {
		this.elevators.push(new Elevator("" + i, this.maxTrips, this.floorTravelTime, this.doorTime));
	}
}

// Command to send an elevator to the given floor to travel either up or down
function sendElevator(pickupFloor, destinationFloor) {
	console.log("Sending elevator to floor:" + pickupFloor + " with a destination of:" + destinationFloor);

	// Find the best elevator to handle the request

	// Command the elevator the fulfil the request
	var elevatorPromise = this.elevators[1].doWork(pickupFloor, destinationFloor);

	return new Promise(function(resolve, reject){
		elevatorPromise.then(
			function(data) {
				resolve(data);
			},
			function(data) {
				reject(data);
			}
		);
	});
}

// Shows the state of each elevator
function showElevators() {
	console.log('Show elevator status here');
}

function getElevators() {
	return this.elevators;
}


function elevatorListener() {
	console.log("elevatorListener called");
}

module.exports = {
	init: init,
	sendElevator: sendElevator,
	showElevators: showElevators,
	getElevators: getElevators
}
