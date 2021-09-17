const fs = require('fs-extra');
const path = require('path');

module.exports = function search(dir, ext, size) {
  const result = fs.readdirSync(dir);
  return result.reduce((t, name) => {
    const fullPath = path.join(dir, name);
    if (fs.lstatSync(fullPath).isFile()) {
      let extIsMatched = true;
      let sizeIsMatched = true;
      if (ext) {
        if (name.includes('.')) {
          extIsMatched = ext.split(',').includes(name.match(/\.[a-z]+$/)[0]);
        } else {
          extIsMatched = false;
        }
      }
      if (size) {
        sizeIsMatched = fs.statSync(fullPath).size / 1024 > size;
      }

      if (extIsMatched && sizeIsMatched) {
        return t.concat(fullPath);
      } else {
        return t;
      }
    } else if (fs.lstatSync(fullPath).isDirectory()) {
      return t.concat(search(fullPath, ext, size));
    }
  }, []);
};
