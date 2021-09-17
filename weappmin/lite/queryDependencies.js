const fs = require('fs');
const path = require('path');
const usingComponents2Nodemodules = require('./usingComponents2Nodemodules');

function fileContentList(cPath) {
  cPath = usingComponents2Nodemodules(cPath);
  if (/index\.js$/.test(cPath)) {
    // 为了让 query 函数逻辑简单，这里做批量替换成 ../
    return [fs.readFileSync(cPath, 'utf8').replace(/\.\//g, '../')];
  } else {
    return fs.readdirSync(cPath).reduce((total, fName) => {
      // 不考虑组件含子目录的情况，因为子目录的文件都属于资源文件，不依赖其他组件
      if (fs.lstatSync(path.join(cPath, fName)).isFile()) {
        return total.concat(fs.readFileSync(path.join(cPath, fName), 'utf8'));
      } else {
        return total;
      }
      // 个别组件有子目录，子目录的文件要检索 ../../ 特征，为了让 query 函数逻辑简单，这里做批量替换成 ../
      // else {
      //   return fs.readdirSync(path.join(cPath, fName)).map((fName) => {
      //     return fs.readFileSync(path.join(cPath, fName), 'utf8').replace(/\.\.\/\.\.\//g, '../');
      //   });
      // }
    }, []);
  }
}

function query(components, tempDependencies) {
  if (!tempDependencies) {
    tempDependencies = [];
  }

  let newDependencies = [
    ...new Set(
      (tempDependencies.length ? tempDependencies : components).reduce((total1, cPath) => {
        return total1.concat(
          fileContentList(cPath).reduce((total2, content) => {
            if (/\.\.\/[a-z\d\-\_]+/.test(content)) {
              return total2.concat(
                content.match(/\.\.\/[a-z\d\-_]+/g).map((v) => path.join(cPath, v).replace(/\\/g, '/'))
              );
            } else {
              return total2;
            }
          }, [])
        );
      }, [])
    ),
  ];
  const union = [...new Set(tempDependencies.concat(newDependencies).sort())];
  if (String(union) !== String(tempDependencies)) {
    tempDependencies = union;
    return query(newDependencies, tempDependencies);
  } else {
    return union;
  }
}

module.exports = function (libs) {
  for (let lib in libs) {
    for (let platform in libs[lib].platforms) {
      libs[lib].platforms[platform].dependencies = query(libs[lib].platforms[platform].components);
    }
  }
  return libs;
};
