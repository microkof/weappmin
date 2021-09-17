const fs = require('fs-extra');
const terser = require('terser');
const csso = require('csso');
const { cyan } = require('colorette');

module.exports = async function (filePath) {
  const fileContent = fs.readFileSync(filePath, 'utf8');
  const beforeSize = Math.ceil(fs.statSync(filePath).size / 1024) + ' KB';
  let minified = '';
  switch (filePath.match('.[a-z]+$')[0]) {
    case '.js':
      minified = await terser.minify(fileContent);
      fs.writeFileSync(filePath, minified.code, 'utf8');
      break;
    default:
      minified = await csso.minify(fileContent);
      fs.writeFileSync(filePath, minified.css, 'utf8');
      break;
  }
  const afterSize = Math.ceil(fs.statSync(filePath).size / 1024) + ' KB';
  console.log(cyan(filePath + '\t' + beforeSize + '\t->\t' + afterSize));
};
