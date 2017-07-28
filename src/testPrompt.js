var prompt = require('prompt');

var schema = {
    properties: {
        command: {
            pattern:/[1-3]/,
            message: 'Unknown command, must be 1, 2 or 3',
            required:true
        },
        pickupFloor: {
            pattern2:/[1-10]/,
            description: 'Pickup floor #',
            message: 'Pickup floor must be 1 thru 10',
            required:true
        },
        destinationFloor: {
            pattern2:/[1-10]/,
            description: "Destination floor #",
            message: 'Destination floor #',
            required:true
        }
    }
};

prompt.start();
prompt.get(schema, function (err, result) {
   //
   // Log the results.
   //
   console.log('Command-line input received:');
   console.log('  username: ' + result.name);
   console.log('  email: ' + result.password);
 });
