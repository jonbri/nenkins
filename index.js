var http = require('http')
var exec = require('child_process').exec;
http.createServer(function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/plain'});

    exec("ls", function(error, stdout, stderr) {
        res.end('stdout: ' + stdout);
    });
}).listen(3123);
console.log('Running on port 3123...');