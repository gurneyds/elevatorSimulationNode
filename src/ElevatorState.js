'use strict';

var ElevatorStateEnum = {
	STOPPED: 1,
	DOORS_OPENING: 2,
	DOORS_CLOSING: 3,
	MOVING_UP: 4,
	MOVING_DOWN: 5,
	WAITING_FOR_PASSENGERS: 6,
	OUT_OF_SERVICE: 7
};

module.exports = ElevatorStateEnum;
