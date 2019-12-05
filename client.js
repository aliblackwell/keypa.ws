const zmq = require("zeromq/v5-compat")

console.log("Collecting updates from weather server…");

// Socket to talk to server
var subscriber = zmq.socket('sub');
subscriber.subscribe('world');

subscriber.on('message', function(data) {
  console.log(data.toString())
});

subscriber.connect("tcp://localhost:3003")