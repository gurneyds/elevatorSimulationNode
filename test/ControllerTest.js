var assert = require('assert');
var controller = require('../src/Controller');

describe("Controller tests", function(){
	beforeEach(function(done) {
		controller.init(5, 4);
	})

	before(function(done){
		controller.sendElevator(2, 3).then(function(data){
			done();
		}, function(data){
			done();
		})
	});

	it("send elevator 1 floor", function() {
		// Now look at the state of the elevators for verification
	});

	afterEach(function(done) {
		console.log("in the afterEach function");
		done();
	})

})