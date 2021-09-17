const libs = require('../lite/libs');

module.exports = function (str) {
  for (let lib in libs) {
    if (str.includes(lib)) {
      return str
        .replace(/\/(wx|my|swan|tt|ks)components/, './node_modules')
        .replace(/(\/[a-z\d\-_\.]+)$/, '/' + libs[lib].npmDir + '$1');
    }
  }
};
