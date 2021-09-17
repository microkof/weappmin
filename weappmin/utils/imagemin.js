const fs = require('fs-extra');
const path = require('path');
const imagemin = require('imagemin');
const imageminMozjpeg = require('imagemin-mozjpeg');
const imageminOptipng = require('imagemin-optipng');
const imageminSvgo = require('imagemin-svgo');
const { cyan, yellow } = require('colorette');

module.exports = async function (filePath) {
  const beforeSize = Math.ceil(fs.statSync(filePath).size / 1024) + ' KB';
  try {
    await imagemin([filePath], {
      glob: false,
      destination: path.resolve(filePath, '../'),
      plugins: [imageminMozjpeg(), imageminOptipng(), imageminSvgo()],
    });
    const afterSize = Math.ceil(fs.statSync(filePath).size / 1024) + ' KB';
    console.log(cyan(filePath + '\t' + yellow(beforeSize + '\t->\t' + afterSize)));
  } catch (err) {
    console.log(yellow(filePath + ' 压缩失败'));
  }
};
