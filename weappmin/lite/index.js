const { yellow, green, cyan } = require('colorette');
const checkEnv = require('../utils/checkEnv');
const fetchUsingComponents = require('./fetchUsingComponents');
const ensureLib = require('./ensureLib');
const queryDependencies = require('./queryDependencies');
const copyComponents = require('./copyComponents');

module.exports = function () {
  const env = checkEnv();
  let libs = fetchUsingComponents(env);

  for (let lib in libs) {
    if (Object.values(libs[lib].platforms).length && !ensureLib(lib)) {
      console.error(
        yellow('检测到项目未安装 ' + green(lib) + ' 组件库，请先运行 ' + cyan('yarn add ' + lib) + ' 进行安装。程序退出。')
      );
      process.exit(1);
    }
  }

  libs = queryDependencies(libs);

  copyComponents(libs);
};
