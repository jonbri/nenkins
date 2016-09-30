var http = require('http')
var exec = require('child_process').exec;
http.createServer(function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/plain'});

    var sResponse,
        sFullCommand,
        aParts,
        sCommand,
        aArgs = [];

    aParts = req.url.split(/\//);
    aParts.shift();

    if (aParts[0] === '') {
        res.end('No command to run');
        return;
    }

    sCommand = aParts.shift();
    aArgs = aParts.slice(0);

    sFullCommand = sCommand + ' ' + aArgs.toString().replace(',',' ');

    // un-escape forward-slash characters
    sFullCommand = sFullCommand.replace(/%2F/g,'/');

    exec(sFullCommand, function(error, stdout, stderr) {
        sResponse = 'command: ' + sFullCommand;
        sResponse += '\n\rstderr:\n\r' + stderr;
        sResponse += '\n\rstdout:\n\r' + stdout;
        res.end(sResponse);
    });
}).listen(3123);
console.log('Running on port 3123...');