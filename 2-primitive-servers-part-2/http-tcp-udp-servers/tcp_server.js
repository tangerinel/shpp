const net = require('net');
const host = '127.0.0.1';
const port = 3001;
let server = net.createServer(function (socket) {
	socket.pipe(socket);
});

server.listen(port, host);