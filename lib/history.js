var fs = require('fs');

function last(user, machine) {
  return new Promise(function(resolve, reject) {
    var fileStream = fs.createReadStream(process.evn.STORE_PATH + '/' + user + '_' + machine);
    fileStream.setEncoding('utf8');

    var buffer = '';
    var max = 0;
    fileStream.on('data', function(chunk) {
      buffer += chunk;
      var cmds = buffer.split('\n');
      buffer = cmds.pop();
      max = Math.max(
        max, 
        cmds.map(a => parseInt(a.split(':')[1]))
          .reduce((a, b) => Math.max(a, b)));
    });
     
    fileStream.on('end', function() {
      resolve(max);
    });
  });
}

module.exports.last = last;