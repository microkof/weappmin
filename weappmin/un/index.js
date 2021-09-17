const fs = require('fs-extra');
const searchFiles = require('../utils/searchFiles');
const minify = require('../utils/minify');
const { green, yellow, cyan } = require('colorette');

module.exports = async function (ext, size) {
  if (size < 10) {
    console.log(yellow('你筛选的文件大小 ' + size + ' KB 数值过小，请输入 >= 10 的值。程序退出。'));
    process.exit(1);
  }
  try {
    fs.statSync('./unpackage/');
  } catch (e) {
    console.log(yellow('./unpackage/ 目录不存在，请先从 HBuilder 运行项目。程序退出。'));
    process.exit(1);
  }
  console.log(green('检索 ./unpackage/ 目录下符合扩展名：' + ext + '，大小 >= ' + size + ' KB 的代码文件：'));
  const files = searchFiles('./unpackage/', ext, size);
  if (!files.length) {
    console.log(yellow('./unpackage/ 目录下找不到扩展名：' + ext + '，大小 >= ' + size + ' KB 的文件。程序退出。'));
    process.exit(1);
  } else {
    console.log(cyan('检索到 ' + files.length + ' 个符合条件的代码文件。'));
  }
  console.log(green('压缩 ./unpackage/ 代码文件任务开始：'));
  for (let file of files) {
    await minify(file);
  }
  console.log(green('压缩文件任务完成。程序退出。'));
};
