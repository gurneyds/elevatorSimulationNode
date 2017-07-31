'use strict';
var Elevator = require('./Elevator').Elevator;
var events = require('events');
var eventEmitter = new events.EventEmitter();

// Setup the elevator listener
eventEmitter.on('elevator', elevatorListener);

// Controller for all of the elevators
function init(numFloors, numElevators, maxTrips, floorTravelTime, doorTime, passengerTime) {
	this.numFloors = numFloors || 4;
	this.numElevators = numElevators || 2;
	this.maxTrips = maxTrips || 100;
	this.floorTravelTime = floorTravelTime || 5000;
	this.doorTime = doorTime || 2000;
	this.passengerTime = passengerTime || 3000;

	// Do a sanity check on the inputs
	validateConfig(numFloors, numElevators, maxTrips, floorTravelTime, doorTime, passengerTime);

	this.elevators = [];

	// Create the elevators
	for(var i=0; i < this.numElevators; i++) {
		this.elevators.push(new Elevator("" + i, this.maxTrips, this.floorTravelTime, this.doorTime));
	}
}

function validateConfig(numFloors, numElevators, maxTrips, floorTravelTime, doorTime, passengerTime) {
	if(numFloors < 1 || numFloors > 100) { throw new Error("Invalid number of floors, must be 1-100")}
	if(numElevators < 1 || numElevators > 10) { throw new Error("Invalid number of elevators, must be 1-10")}
	if(maxTrips < 1) { throw new Error("Invalid maximum trips, must be a positive number")}
	if(floorTravelTime < 0 || floorTravelTime > 60000) { throw new Error("Invalid floor travel time, must be 0-60000")}
	if(doorTime < 0 || doorTime > 60000) { throw new Error("Invalid door time, must be 0-60000")}
	if(passengerTime < 0 || passengerTime > 60000) { throw new Error("Invalid passenger time, must be 0-60000")}
}

// Command to send an elevator to the given floor to travel either up or down
function sendElevator(pickupFloor, destinationFloor) {
	validateSendRequest(pickupFloor, destinationFloor, this.numFloors);

	console.log("Sending elevator to floor:" + pickupFloor + " with a destination of:" + destinationFloor);

	// TODO - Find the best elevator to handle the request

	// Command the elevator the fulfil the request
	var elevatorPromise = this.elevators[0].doWork(pickupFloor, destinationFloor);

	return new Promise(function(resolve, reject){
		elevatorPromise.then(
			function() {
				resolve("Done with request");
			},
			function() {
				reject("Error sending elevator");
			}
		);
	});
}

function validateSendRequest(pickupFloor, destinationFloor, numFloors) {
	if(!pickupFloor || pickupFloor < 1 || pickupFloor > numFloors) { throw new Error("Invalid pickup floor, must be between 1 - number of floors:" + numFloors)}
	if(!destinationFloor || destinationFloor < 1 || destinationFloor > numFloors) { throw new Error("Invalid destination floor, must be between 1 - number of floors")}
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
