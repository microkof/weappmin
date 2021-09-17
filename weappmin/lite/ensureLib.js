const fs = require('fs-extra');

module.exports = function (libName) {
  const pkgJson = fs.readJsonSync('./package.json');
  if (pkgJson.dependencies && pkgJson.dependencies[libName]) {
    return true;
  } else {
    return false;
  }
};
