const fs = require('fs-extra');
const jsoncParser = require('jsonc-parser');
const { yellow, cyan } = require('colorette');
const libs = require('../lite/libs');
const searchFiles = require('../utils/searchFiles');

function fetchFromUniapp() {
  let pagesJson = {};

  try {
    pagesJson = jsoncParser.parse(fs.readFileSync('./pages.json', 'utf8'));
  } catch (err) {
    console.error(yellow('项目根目录的 pages.json 不是合法的 JSON 文件，请检查文件内容。程序退出。'));
    process.exit(1);
  }

  let usingComponents = [];

  if (pagesJson.pages) {
    pagesJson.pages.forEach((p) => {
      if (p.style && p.style.usingComponents) {
        usingComponents = usingComponents.concat(Object.values(p.style.usingComponents));
      }
    });
  }

  if (pagesJson.globalStyle && pagesJson.globalStyle.usingComponents) {
    usingComponents = usingComponents.concat(Object.values(pagesJson.globalStyle.usingComponents));
  }

  return [...new Set(usingComponents)];
}

function fetchFromNative() {
  const appJson = fs.readJsonSync('./app.json', 'utf8');

  let usingComponents = [];

  if (appJson.usingComponents) {
    usingComponents = usingComponents.concat(Object.values(appJson.usingComponents));
  }

  usingComponents = usingComponents.concat(
    searchFiles('./pages/', '.json').reduce((total, j) => {
      return total.concat(Object.values(fs.readJsonSync(j).usingComponents));
    }, [])
  );

  return [...new Set(usingComponents)];
}

module.exports = function (env) {
  let reg = new RegExp('/(wx|my|swan|tt|ks)components/(' + Object.keys(libs).join('|') + ')/[^/]+');
  let usingComponents = env === 'uni-app' ? fetchFromUniapp() : fetchFromNative();

  if (!usingComponents.some((c) => reg.test(c))) {
    console.error(
      yellow(
        '未检测到项目的 usingComponents 字段配置了受支持的组件库，请访问 ' +
          cyan('https://www.npmjs.com/package/weappmin') +
          ' 查阅说明文档，并检查 usingComponents 字段。程序退出。'
      )
    );
    process.exit(1);
  }

  usingComponents.forEach((c) => {
    if (reg.test(c)) {
      const matched = c.match(reg)[0];
      const lib = matched.split('/').slice(2, -1).join('/');
      const platform = matched.split('/')[1];
      if (!libs[lib].platforms[platform]) {
        libs[lib].platforms[platform] = {
          components: libs[lib].hasIndexJs ? ['/' + platform + '/' + lib + '/index.js'] : [],
          dependencies: [],
        };
      }
      libs[lib].platforms[platform].components.push(matched);
    }
  });

  return libs;
};
