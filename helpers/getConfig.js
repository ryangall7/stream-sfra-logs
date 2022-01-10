
module.exports = function(file = './dw.json'){
  var fs = require('fs');
  var obj = JSON.parse(fs.readFileSync(file, 'utf8'));

  return obj;
}
