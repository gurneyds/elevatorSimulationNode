'use strict';

var ElevatorStateEnum = {
	STOPPED: 1,
	DOORS_OPENING: 2,
	DOORS_CLOSING: 3,
	MOVING_UP: 4,
	MOVING_DOWN: 5,
	OUT_OF_SERVICE: 6
};

module.exports = ElevatorStateEnum;
