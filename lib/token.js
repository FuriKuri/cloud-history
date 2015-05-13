var jwt = require('jsonwebtoken');

function verify(request) {
  var token = request.headers.authorization.split(' ')[1];
  return new Promise(function(resolve, reject) {
    jwt.verify(token, process.env.TOKEN_PASSPHRASE, function(err, decoded) {
      if (err) reject(err);
      else resolve(decoded);
    });
  });
}

function create(user, machine) {
  var token = jwt.sign(
    { user: user, machine: machine }, 
    process.env.TOKEN_PASSPHRASE, 
    { expiresInMinutes: 10 });
  return new Promise(function(resolve, reject) {
    resolve(token);
  });
}

module.exports.verify = verify;
module.exports.create = create;
