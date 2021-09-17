const fs = require('fs-extra');
const { yellow } = require('colorette');

module.exports = function () {
  let isUniApp = false;
  let isNative = false;
  try {
    if (fs.readFileSync('./pages.json', 'utf8')) {
      isUniApp = true;
    }
  } catch (err) {}
  try {
    if (fs.readFileSync('./app.json', 'utf8')) {
      isNative = true;
    }
  } catch (err) {}
  if (isUniApp) {
    return 'uni-app';
  } else if (isNative) {
    return 'native';
  } else {
    console.error(yellow('本项目既不是 uni-app 小程序项目，也不是原生小程序项目。程序退出。'));
    process.exit(1);
  }
};
