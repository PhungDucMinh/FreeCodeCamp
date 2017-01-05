var fs = require("fs");
var http = require("http");
var map = require("through2-map");
var url = require("url");

var portNumber = process.argv[2];

var server = http.createServer((request, response) => {
    if(request.method === 'GET'){
        console.log("GET");
        var currentTime = new Date();
        response.writeHead(200, {'Content-Type': 'application/json'});
        if(url.parse(request.url, true).pathname === "/api/parsetime") {
            
            response.write(JSON.stringify({
                hour: currentTime.getHours(),
                minute: currentTime.getMinutes(),
                second: currentTime.getSeconds()
            }));
        }
        else if(url.parse(request.url, true).pathname === "/api/unix"){
                response.write(JSON.stringify({
                    unixtime: currentTime.toUTCString(),
            }));
        }
    }
});

server.listen(portNumber);
//server.close();