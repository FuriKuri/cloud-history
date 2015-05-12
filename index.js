var https = require('https');
var fs = require('fs');
var Hapi = require('hapi');
var jwt = require('jsonwebtoken');

var server = new Hapi.Server();
server.connection({ 
  port: 8080,
  tls: {
    key: fs.readFileSync(process.env.KEYSTORE),
    cert: fs.readFileSync(process.env.CERTSTORE),
    passphrase: process.env.PASSPHRASE,
    requestCert: false,
    rejectUnauthorized: false
  }
});

// Add the route
server.route({
  method: 'PUT',
  path:'/common', 
  handler: function (request, reply) {
    var token = request.headers.authorization.split(' ')[1];
    jwt.verify(token, process.env.TOKEN_PASSPHRASE, function(err, decoded) {
      if (err) throw err;
      reply('hello world');
    });
  }
});

// Start the server
server.start();
console.log('Server started');

var token = jwt.sign({ user: 'furi' }, process.env.TOKEN_PASSPHRASE);
console.log('Token: ' + token);
