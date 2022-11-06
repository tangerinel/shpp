
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
Content-Length: ${('' + body).length}
Connection: Closed
Content-Type: text/html; charset=utf-8
        
${body}`
    );
}

function processHttpRequest($method, $uri, $headers, $body) {
    const uriFormat = '/api/checkLoginAndPassword';
    const contentType = 'application/x-www-form-urlencoded';

    if ($method !== 'POST' || $uri !== uriFormat || $headers['Content-Type'] !== contentType) {
        outputHttpResponse(404, 'Not Found', $headers, 'not found')
        return;
    }
    let match = $body.match(/^login=(.*)&password=(.*)$/)
    let logAndPass = `${match[1]}:${match[2]}`
    try {
        let data = require("fs").readFileSync(__dirname + '/password.txt').toString().split('\r\n')
        if (data.indexOf(logAndPass) != -1) {
            outputHttpResponse(200, 'OK', $headers, "<h1 style=\"color:green\">FOUND</h1>")
            return;
        }
        outputHttpResponse(404, 'Not Found', $headers, 'not found')
    } catch (err) {
        outputHttpResponse(500, 'Internal Server Error', $headers, 'Internal Server Error')
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