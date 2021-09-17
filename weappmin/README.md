# weappmin

一款为压缩小程序容量而生的小程序代码精简压缩器。

A miniprogram reduction compressor.

## 软件功能

1. 精简小程序第三方组件库

   先说明两个概念：

   - 直接组件：usingComponents 字段里填写的组件

   - 依赖组件：直接组件依赖的其他组件

   weappmin 会精简第三方组件库中用不到的组件，只保留直接组件和它们的依赖组件，工作原理是：先从项目的多处 .json 文件中抓取 usingComponents 字段的直接组件，计算各个直接组件的依赖组件，之后从 `./node_modules/` 目录的第三方组件库拷贝必需的直接组件和依赖组件到 `./wxcomponents/`（也可能是其他`./xxcomponents/`）目录。

2. 压缩 uni-app 项目的 ./unpackage/ 下的 .js 和各家小程序平台的 CSS 文件，如 .wxss 文件

   由于小程序开发者工具在使用工具栏的“预览”功能时不压缩代码（原因估计是为了节省时间），可能导致代码容量超限，比如可能会遇到 `/common/vendor.js` 超容量的提示，为解决此问题，weappmin 提供压缩代码文件的功能，只针对 `./unpackage/dist/dev/` 目录下的 JS 和 CSS 文件。

3. 压缩 uni-app 或原生项目的 ./static/ （或其他目录）下的 .jpg/.jpeg/.png/.svg 文件

   高保真前提下压缩图片文件，属于常见需求，不多解释。

## 精简组件库功能的支持范围

- 支持的操作系统：Windows、MacOS

- 支持的开发模式：uni-app 小程序、原生小程序

- 支持的第三方组件库（如有组件库提供 ES6 和 ES5 双版本的，只取 ES5 版本）：

  - 微信小程序、QQ 小程序组件库：

    - [@vant/weapp](https://youzan.github.io/vant-weapp/#/quickstart) ☆☆☆☆☆ 推荐

    - [iview-weapp](https://weapp.iviewui.com/docs/guide/start) ☆☆

    - [kai-ui](https://www.npmjs.com/package/kai-ui) ☆☆

    - [mitoo-weapp](https://www.mitooui.com) ☆

    - [wuss-weapp](https://phonycode.github.io/wuss-weapp/quickstart.html) ☆☆☆

    - [wux-weapp](https://www.wuxui.com/#/) ☆☆☆☆ 推荐

  - 支付宝、淘宝、钉钉小程序组件库：

    - [mini-ali-ui](https://opendocs.alipay.com/mini/component-ext/ui-overview) ☆☆☆☆ 推荐

## weappmin 官方网站

[https://www.npmjs.com/package/weappmin](https://www.npmjs.com/package/weappmin)

## 安装 weappmin

强烈建议 yarn 仓库先切换成淘宝镜像再安装：`yarn config set registry https://registry.npm.taobao.org`

开始安装：`yarn add -D weappmin`

如果卡在安装 `mozjpeg` 上，你有两种选择：

1. 继续等待安装，5 分钟内有一定概率安装成功，一定概率安装失败

2. 当场结束安装，改用命令 `yarn add -D weappmin --ignore-scripts`，会立即安装成功

## 安装第三方组件库

`yarn add <第三方组件库名>`，例如 `yarn add @vue/weapp`。

请按照第三方组件库的要求做必要的配置。

### 注意事项一：不要使用“构建 npm”功能

绝对不要使用开发者工具的“构建 npm”功能，即使第三方组件库官方要求，也不要听从，只需做完 `yarn add <第三方组件库名>` 这一步即可。

### 注意事项二：遵守 uni-app 规范和 weappmin 规范去配置 usingComponents 字段

无论 uni-app 开发还是原生开发，usingComponents 字段的路径都统一按照 uni-app 的路径规范，见 (https://uniapp.dcloud.io/frame?id=小程序自定义组件支持)[https://uniapp.dcloud.io/frame?id=小程序自定义组件支持]。抄录如下：

| 平台                     | 存放目录       |
| ------------------------ | -------------- |
| 微信、QQ 小程序          | wxcomponents   |
| 支付宝、淘宝、钉钉小程序 | mycomponents   |
| 百度小程序               | swancomponents |
| 字节跳动小程序           | ttcomponents   |
| 快手小程序               | kscomponents   |

格式：`"<组件标签>": "/<平台目录>/<第三方组件库名>/<组件名>"`

例如：`"van-picker": "/wxcomponents/@vant/weapp/picker"`

解释：

- `/wxcomponents` 事实上只是 uni-app 官方规定的存放规范，不是原生项目的规范，但是，为统一起见，无论 uni-app 开发还是原生开发，你都应遵守上方表格规范。

- `/@vant/weapp` 是 weappmin 的规范，这里必须写成 `/<第三方组件库名>` 的格式，也就是照抄组件库名，以便 weappmin 识别组件库。注意，`@vant/weapp` 虽然中间有 `/`，但是它确实是组件库的名字。

- 没有 `/dist` 目录！不要写 `/dist` 目录！这是 weappmin 的规范！即使第三方组件库官方文档要求写 `/dist`，也不要听从！

- `/picker`是组件名，用到什么组件就如实写什么组件，从第三方组件库官方手册中抄写组件名；如果某组件库的官方手册要求写前缀，比如 `/w-picker`，要遵守官方手册要求。

### 注意事项三：不需要你事先拷贝直接组件到 /wxcomponents

请看清楚，不需要你来做，这是 weappmin 做的事。你只需要准确配置 usingComponents 字段。

## 开始使用 weappmin

准备工作完成之后，运行命令 `yarn weappmin -H` 或 `yarn weappmin --help` 查看帮助文档，根据提示开始使用。

## weappmin 的使用时机

- 每当增加、修改、删除了 usingComponents 字段的一个或多个组件后，都应执行 `yarn weappmin -L`

- 每当 uni-app 项目遇到开发者工具预览提示超容量时，应压缩 JS 和 CSS 文件，执行 `yarn weappmin -U` 或追加更多参数

- 依然提示超容量的话，应压缩静态图片文件，可执行 `yarn weappmin -I` 或追加更多参数

- 依然提示超容量的话，可考虑将静态图片文件换成网络资源等，不多讨论

## weappmin 的作者

杨亮

## Bug 和需求反馈

microkof@163.com
