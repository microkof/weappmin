# weappmin

## 项目介绍

本项目是 weappmin 的开发/测试环境，weappmin 代码本体在 ./weappmin 目录。

**如果你不做二次开发，只想使用 weappmin，请直接看下方 weappmin 使用说明。**

## weappmin 使用说明

weappmin 本体的 README.md 见 [./weappmin/README.md](./weappmin/README.md)。

或直接访问 [https://www.npmjs.com/package/weappmin](https://www.npmjs.com/package/weappmin)，也可以看到同样说明文档。

本 README 的其余内容可以不看。

## 项目目录和文件介绍

- ./ ：根目录，weappmin 的测试目录，模仿 uni-app 项目目录或者原生项目目录

- ./weappmin ：weappmin 代码本体

- ./testfiles.zip ：测试文件压缩包，解压到项目根目录之后：

  - ./otherdir ：模拟 ./static 之外的目录

  - ./pages ：模拟原生项目的 pages 目录

  - ./static ：模拟 ./static 目录

  - ./unpackage ：模拟 uni-app 项目生成的临时文件夹目录

  - ./app.json ：模拟原生项目的 app.json

  - ./pages.json : 模拟 uni-app 项目的 pages.json

## 安装小程序第三方组件库，以便测试

```sh
yarn
```

## 安装 weappmin 本体的依赖包

```sh
cd weappmin
yarn --ignore-scripts
```

## 开发模式

`node weappmin/bin/weappmin -参数`

## 在测试项目中临时安装

`yarn add -D <weappmin 本体存放路径> --ignore-scripts`