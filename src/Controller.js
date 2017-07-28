
var config = {};
var elevatorArray = [];

// Controller for all of the elevators
function init(numFloors, numElevators, maxTrips, floorTravelTime, doorTime) {
    config.numFloors = numFloors || 4;
    config.numElevators = numElevators || 2;
    config.maxTrips = maxTrips || 100;
    config.floorTravelTime = floorTravelTime || 20;
    config.doorTime = doorTime || 4;
}

// Command to send an elevator to the given floor to travel either up or down
function sendElevator(floor, direction) {
    // Find the best elevator to handle the request

    // Command the elevator the fulfil the request
}

// Shows the state of each elevator
function showElevators() {
    console.log('Show elevator status here');
}

module.export = {
    sendElevator,
    showElevators
}
