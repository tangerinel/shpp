const { toNamespacedPath } = require("path");

function readHttpLikeInput(){
    var fs = require("fs");
    var res = "";
    var buffer = Buffer.alloc ? Buffer.alloc(1) : new Buffer(1);
    let was10 = 0;
    for(;;){ 
        try { fs.readSync(0 /*stdin fd*/, buffer, 0, 1); } catch (e) {break; /* windows */}
        if(buffer[0] === 10 || buffer[0] === 13) {
            if (was10 > 10) 
                break;
            was10++;
        } else 
           was10 = 0;
        res += new String(buffer);
    }

    return res;
}

function parseTcpStringAsHttpRequest(string) { 
    let tcp = string.split('\n');
    let rawHeaders = tcp.filter(line => line.includes(':')).map(header => header.split(':'));
    let headers = {};
    for(let header of rawHeaders){
        headers[header[0]] = header[1].trim()
    }

    return { 
      method: tcp[0].split(' ')[0], 
      uri :tcp[0].split(' ')[1] , 
      headers:  headers, 
      body :tcp[rawHeaders.length + 2], 
    }; 
  }

let contents = readHttpLikeInput();
http = parseTcpStringAsHttpRequest(contents); 
console.log(JSON.stringify(http, undefined, 2));
