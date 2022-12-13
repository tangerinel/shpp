const udp = require('dgram');

const host = '127.0.0.1';
const port = 3002;
const msg = 'Hi! I am udp client';
let client = udp.createSocket('udp4');


client.send(msg, port, host, () => {
    console.log('Data sent !');
    console.time('Time requested');
});

client.on('message', function (data) {
    console.log('Data received from server : ' + data.toString());
    console.log('Received the same as sent: ' + (data.toString() === msg));
    client.close(() => {
        console.log('connection closed');
        console.timeEnd('Time requested');
    });
});

