/* command line arguments */
if ( ! process.argv[2] )
{
	console.log("Usage: " + process.argv[0] + " " + process.argv[1] + " <gateway ip> <room name>");
	process.exit(1);
}

var TCPConnected = require('./index.js');

var gateway = process.argv[2];
var room = process.argv[3];

Test = new TCPConnected(gateway);

Test.Init(function(error){
	if(!error){
		Test.GetState(function(error,system){
			Test.GetRoomStateByName(room, function(error,state,level){
				console.log("State: " + state + " at Level: " + level);
				if(state == 1){
					Test.TurnOffRoomByName(room, function(error){
						Test.GWEnd();
					});
				}else{
					Test.TurnOnRoomByName(room, function(error){
						Test.GWEnd();
					});
				}
			});
		});
	}else{
		console.log("There was an issue initializing the token");
	}
}, __dirname + "/config.json");
