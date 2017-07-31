var Elevator = require('../src/Elevator').Elevator;
var expect  = require('chai').expect;

describe("Elevator tests", function() {
	describe("Move to floor", function() {
		var elevator = new Elevator("South Elevator", this.maxTrips, this.floorTravelTime, this.doorTime);

		before(function (done) {
			this.timeout(0);
			elevator.doWork(2, 5).then(done, done);
		});
		it("should be on fifth floor", function () {
			// Now look at the state of the elevators for verification
			expect(elevator.currentFloor === 5).to.be.true;
		});
	});

	describe("Move to same floor", function() {
		var elevator = new Elevator("South Elevator", this.maxTrips, this.floorTravelTime, this.doorTime);

		before(function (done) {
			this.timeout(0);
			elevator.doWork(1, 1).then(done, done);
		});
		it("should stay on first floor", function () {
			// Now look at the state of the elevators for verification
			expect(elevator.currentFloor === 1).to.be.true;
		});
	})

});