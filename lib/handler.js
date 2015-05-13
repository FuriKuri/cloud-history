var token = require('./token');
var history = require('./history');

function add(request, reply) {
  token.verify(request)
    .then(data => reply(data.user))
    .catch(data => reply(data.toString()));
}

function last(request, reply) {
  history.last(request.params.user, request.params.machine)
    .then(data => reply({ max: data }))
    .catch(data => reply(data.toString()));
}

function renew(request, reply) {
  token.create(request.params.user, request.params.machine)
    .then(data => reply({ token: data }))
    .catch(data => reply(data.toString()));
}

module.exports.add = add;
module.exports.renew = renew;
module.exports.last = last;