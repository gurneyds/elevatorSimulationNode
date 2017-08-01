'use strict';

var MovementEnum = {
	STOPPED: 1,
	MOVING_UP: 2,
	MOVING_DOWN: 3,
	describe: function(status) {
	    if(status === 1) { return "Stopped"; }
	    else if(status === 2) { return "Moving up"; }
	    else if(status === 3) { return "Moving down"; }
	    else { return "unknown"; }
	}
};

module.exports = MovementEnum;
