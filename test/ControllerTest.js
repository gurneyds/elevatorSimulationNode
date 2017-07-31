var expect  = require('chai').expect;
var controller = require('../src/Controller');

describe("Controller tests", function(){
	before(function(done){
		controller.init(1, 4, 10, 1, 1, 1); // Use a very small wait time to speed up the tests
		controller.sendElevator(2, 3).then(function(data){
			done();
		}, function(data){
			done();
		})
	});

	it("send elevator 1 floor", function() {
		// Now look at the state of the elevators for verification
		expect(controller.getElevators()[0].currentFloor === 3).to.be.true;
	});

	it("validates the configuration inputs", function() {
		expect(function() {controller.init(0)}).to.throw("Invalid number of floors, must be 1-100");
		expect(function() {controller.init(101)}).to.throw("Invalid number of floors, must be 1-100");
		expect(function() {controller.init(1, 0)}).to.throw("Invalid number of elevators, must be 1-10");
		expect(function() {controller.init(1, 11)}).to.throw("Invalid number of elevators, must be 1-10");
		expect(function() {controller.init(1, 1, 0)}).to.throw("Invalid maximum trips, must be a positive number");
		expect(function() {controller.init(1, 1, -1)}).to.throw("Invalid maximum trips, must be a positive number");
		expect(function() {controller.init(1, 1, 1, -1)}).to.throw("Invalid floor travel time, must be 0-60000");
		expect(function() {controller.init(1, 1, 1, 60001)}).to.throw("Invalid floor travel time, must be 0-60000");
		expect(function() {controller.init(1, 1, 1, 1, -1)}).to.throw("Invalid door time, must be 0-60000");
		expect(function() {controller.init(1, 1, 1, 60000, 60001)}).to.throw("Invalid door time, must be 0-60000");
		expect(function() {controller.init(1, 1, 1, 1, 1, -1)}).to.throw("Invalid passenger time, must be 0-60000");
		expect(function() {controller.init(1, 1, 1, 60000, 60000, 60001)}).to.throw("Invalid passenger time, must be 0-60000");
	});

	it("validates send request inputs", function() {
		controller.init(1, 4);
		expect(function() {controller.sendElevator().to.throw("Invalid pickup floor, must be between 1 - number of floors")})
		expect(function() {controller.sendElevator(0).to.throw("Invalid pickup floor, must be between 1 - number of floors")})
		expect(function() {controller.sendElevator(5).to.throw("Invalid pickup floor, must be between 1 - number of floors")})

		expect(function() {controller.sendElevator(1).to.throw("Invalid destination floor, must be between 1 - number of floors")})
		expect(function() {controller.sendElevator(0).to.throw("Invalid destination floor, must be between 1 - number of floors")})
		expect(function() {controller.sendElevator(5).to.throw("Invalid destination floor, must be between 1 - number of floors")})
	});
})