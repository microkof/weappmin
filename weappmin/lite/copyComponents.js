const fs = require('fs-extra');
const path = require('path');
const { green, cyan, magenta } = require('colorette');
const libs = require('../lite/libs');
const usingComponents2Nodemodules = require('./usingComponents2Nodemodules');

function copy(components) {
  components.forEach((c) => {
    fs.copySync(usingComponents2Nodemodules(c), '.' + c);
    console.log(cyan('\t* ' + c.match(/[a-z\-\d\.\_]+$/)[0]));
  });
}

module.exports = function (libs) {
  console.log(green('第三方组件库精简任务开始：'));

  for (let lib in libs) {
    for (let platform in libs[lib].platforms) {
      const usefulComponents = [
        ...new Set(libs[lib].platforms[platform].components.concat(libs[lib].platforms[platform].dependencies)),
      ];
      console.log(
        magenta(
          path.join('/node_modules', lib, libs[lib].npmDir).replace(/\\/g, '/') +
            '\t（' +
            fs.readdirSync(path.join('./node_modules', lib, libs[lib].npmDir)).length +
            ' 个子目录）' +
            '\t\t->\t' +
            path.join('/', platform, lib).replace(/\\/g, '/') +
            '\t（' +
            usefulComponents.length +
            ' 个子目录）：'
        )
      );
      fs.emptyDirSync(path.join(platform, lib));
      copy(usefulComponents);
    }
  }

  console.log(green('精简任务完成，如果没有触发 HBuilder 的重编译，请点击 HBuilder 控制台右上角的“重新运行”。程序退出。'));
};
