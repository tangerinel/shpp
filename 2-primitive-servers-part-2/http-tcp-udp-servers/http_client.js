const http = require('http');
const payload = "Nice to meet you, http!";

const options = {
    hostname: '127.0.0.1',
    port: 3000,
    method: 'POST'
};


let reqPost = http.request(options, res => {
    console.time('Request: '); //Begin to count the time
    res.on('data', (msg) => {
        console.log("Data sent is the same as the data  recived: " + (msg.toString() === payload));
    });

    res.on('end', () => {
        console.log('No more data in response.');
        console.timeEnd('Request: ');
    });

});
reqPost.write(payload);
reqPost.end();