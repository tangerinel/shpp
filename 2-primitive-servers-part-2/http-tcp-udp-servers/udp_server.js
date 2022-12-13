const udp = require('dgram');

const host = '127.0.0.1';
const port = 3002;

let server = udp.createSocket('udp4');

server.on('message', function (msg, info) {
    console.log('Data received from client : ' + msg.toString());
    server.send(msg, info.port, host);
});


server.bind(port, host);