const { defineConfig } = require('@vue/cli-service')
const { name } = require('./package.json')
module.exports = defineConfig({
  transpileDependencies: true
})
module.exports = {
  publicPath: "./", //基本路径
  outputDir: "dist", //构建时的输出目录
  assetsDir: "static", //放置静态资源的目录
  indexPath: "index.html", //html 的输出路径
  filenameHashing: true, //文件名哈希值
  lintOnSave: true, //是否在保存的时候使用 `eslint-loader` 进行检查。

  //组件是如何被渲染到页面中的？ （ast：抽象语法树；vDom：虚拟DOM）
  //template ---> ast ---> render ---> vDom ---> 真实的Dom ---> 页面
  //runtime-only：将template在打包的时候，就已经编译为render函数
  //runtime-compiler：在运行的时候才去编译template
  runtimeCompiler: false,

  transpileDependencies: [], //babel-loader 默认会跳过 node_modules 依赖。
  productionSourceMap: false, //是否为生产环境构建生成 source map？

  configureWebpack: {
    output: {
      // 把子应用打包成 umd 库格式
      library: `${name}-[name]`,
      libraryTarget: "umd",
      chunkLoadingGlobal: `webpackJsonp_${name}`,
    },
  },
  devServer: {
    headers: {
      'Access-Control-Allow-Origin': '*'
    }
  },
}