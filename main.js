// Create a tray icon
var tray = new nw.Tray({ title: '', icon: 'img/paws-menu-bar-white.png' });
tray.on('click', () => {
  console.log('CLICK')
})
const zmq = require("zeromq/v5-compat")
const sudo = require('sudo-prompt');

// Socket to talk to server

const subscriber = zmq.socket('sub');
subscriber.subscribe('world');

subscriber.on('message', function (data) {
  console.log(data.toString())
});

subscriber.connect("tcp://localhost:3026")
const options = {
  name: 'nwjs',
  icns: '/Applications/nwjs.app/Contents/Resources/app.icns', // (optional)
};
sudo.exec('dist/tester', options, () => {});
// sudo.exec('python3 ./tester.py', options, () => {});