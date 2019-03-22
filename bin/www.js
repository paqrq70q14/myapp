


var app = require('../app.js');
const http = require('http');

var port = "3500";

// Create Server
var server = http.createServer(app);

// Listen 
server.listen(port, function(err){
    console.log("http://localhost:3500");
   
});

