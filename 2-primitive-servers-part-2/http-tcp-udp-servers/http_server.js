
const http = require('http');
const host = '127.0.0.1';
const port = 3000;
const server = http.createServer((req, res) => {
    let msg;
    req.on('data', data => {
        msg = data;
    });

    req.on('end', () => {
        res.end(msg);
    });

})
server.listen(port, host, () => {
    console.log(`server running on port ${port}`);
});

