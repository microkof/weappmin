const fs = require('fs-extra');
const path = require('path');

module.exports = function () {
  console.log('v' + fs.readJsonSync(path.join(__dirname, '../package.json')).version);
};
