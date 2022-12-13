const net = require('net');
const host = '127.0.0.1';
const port = 3001;
const msg = 'Hello, server! Love, Client.';

let client = new net.Socket();
client.connect(port, host, function () {
    console.time('Time requested: ')
    console.log('Connected');
    client.write(msg);
});

client.on('data', function (data) {
    console.log('sent to server: ' + msg);
    console.log('got from server: ' + data.toString())
    console.log('Received the same as sent: ' + (data.toString() === msg));
    client.destroy(); // kill client after server's response
});

client.on('close', function () {
    console.log('Connection closed');
    console.timeEnd('Time requested: ');
});