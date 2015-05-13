var https = require('https');
var fs = require('fs');
var Hapi = require('hapi');
var jwt = require('jsonwebtoken');
var handler = require('./lib/handler');

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
  path: '/common', 
  handler: handler.add
});

server.route({
  method: 'POST',
  path: '/renew',
  handler: handler.renew
});

server.route({
  method: 'GET',
  path: '/last',
  handler: handler.last
});

// Start the server
server.start();
console.log('Server started');

var token = jwt.sign({ user: 'furi' }, process.env.TOKEN_PASSPHRASE, {expiresInMinutes: 60 * 24 * 90});
console.log('Token: ' + token);