const { cyan } = require('colorette');

const text = `参数列表：

\t-H, --help\t\t查看命令行帮助文档，例如 ${cyan('yarn weappmin -H')}
\t-V, --version\t\t打印 weappmin 版本，例如 ${cyan('yarn weappmin -V')}
\t-L, --lite\t\t精简小程序第三方组件库，例如 ${cyan('yarn weappmin -L')}
\t-U, --un\t\t压缩 uni-app 项目 ./unpackage/ 下的 .js 和 .wxss 等各家小程序平台 CSS 文件，例如 ${cyan('yarn weappmin -U --ext .js,.wxss --size 200')}
\t\t--ext .js,.wxss\t（可选）指定筛选特定扩展名的文件，多个扩展名用逗号分隔，文件类型限定于 .js 和 .wxss 等各家小程序平台 CSS 文件，默认值为 .js
\t\t--size 100\t（可选）指定筛选大于等于 XXX KB 的文件，数值不得小于 10，默认值为 100
\t-I, --image\t\t对项目的图片文件进行压缩，文件类型包括 .jpg,.jpeg,.png,.svg，例如 ${cyan('yarn weappmin -I --dir assets/img')}
\t\t--dir static\t（可选）指定检索目录，将对该目录的深层目录搜索图片文件，默认值为 static，多级目录写法例如 assets/img

注意事项：

\t由于对文件的修改会触发小程序开发者工具重编译，为避免混乱，以上命令不支持连缀。

使用文档：
`;

module.exports = function () {
  console.log(text);
  console.log(cyan('\thttps://www.npmjs.com/package/weappmin'));
};
