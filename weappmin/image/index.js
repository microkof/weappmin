const searchFiles = require('../utils/searchFiles');
const imagemin = require('../utils/imagemin');
const { green, yellow, cyan } = require('colorette');

module.exports = async function (dir) {
  console.log(green('检索 ' + dir + ' 目录下的图片文件：'));
  const files = searchFiles(dir, '.jpg,.jpeg,.png,.svg');
  if (!files.length) {
    console.log(yellow(dir + ' 目录下找不到图片文件。程序退出。'));
    process.exit(1);
  } else {
    console.log(cyan('检索到 ' + files.length + ' 个符合条件的图片文件。'));
  }
  console.log(green('压缩 ' + dir + ' 图片文件任务开始：'));
  for (let file of files) {
    await imagemin(file);
  }
  console.log(green('压缩文件任务完成。如果压缩没有效果，说明高保真前提下已经没有压缩余地，如需进一步压缩请换用其他工具。程序退出。'));
};
