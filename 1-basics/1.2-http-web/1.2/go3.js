
function readHttpLikeInput() {
    var fs = require("fs");
    var res = "";
    var buffer = Buffer.alloc ? Buffer.alloc(1) : new Buffer(1);
    let was10 = 0;
    for (; ;) {
        try { fs.readSync(0 /*stdin fd*/, buffer, 0, 1); } catch (e) { break; /* windows */ }
        if (buffer[0] === 10 || buffer[0] === 13) {
            if (was10 > 10)
                break;
            was10++;
        } else
            was10 = 0;
        res += new String(buffer);
    }

    return res;
}


let contents = readHttpLikeInput();

function outputHttpResponse(statusCode, statusMessage, headers, body) {
    console.log(
        `HTTP/1.1 ${statusCode} ${statusMessage}
Date: ${new Date().toUTCString()}
Server: Apache/2.2.14 (Win32)
Content-Length: ${(''+body).length}
Connection: Closed
Content-Type: text/html; charset=utf-8
        
${body}`
        );
}

function processHttpRequest($method, $uri, $headers, $body) {
    if (!$uri.startsWith('/sum')) {
        outputHttpResponse(404, 'Not Found', $headers, 'not found');
    } else if (!(/\?nums=/).test($uri)|| $method !== 'GET') {
        outputHttpResponse(400, 'Bad Request', $headers, 'not found');
    } else {
        let initialValue = 0;
        let sumOfNums = $uri.slice(10).split(',').reduce((a, b) => +a + +b, initialValue)
        outputHttpResponse(200,'OK', $headers, sumOfNums)
    }

}

function parseTcpStringAsHttpRequest(string) {
    let tcp = string.split('\n');
    let rawHeaders = tcp.filter(line => line.includes(':')).map(header => header.split(':'));
    let headers = {};
    for (let header of rawHeaders) {
        headers[header[0]] = header[1].trim()
    }
    return {
        method: tcp[0].split(' ')[0],
        uri: tcp[0].split(' ')[1],
        headers: headers,
        body: tcp[rawHeaders.length + 2],
    };
}

http = parseTcpStringAsHttpRequest(contents);
processHttpRequest(http.method, http.uri, http.headers, http.body);