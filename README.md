# qiankun 微前端 React 主应用

## 主应用项目初始化

项目结构源于[React 项目](https://github.com/PiscesKirito/kirito-world)
未使用Vue作为主应用的理由：由于Vue 3.0发布时期尚短，Qiankun官方还未为Vue 3.0推出稳定版本的教程，为避免未知的错误，暂未采用Vue，或许在Qiankun 3.0版本中将会对Vue 3.0进行官方支持。

## 配置主应用微前端服务

### 安装 Qiankun

```shell
npm i qiankun -S
```

### 主应用-注册微前端子应用

`在函数组件的useEffect中如下写法，可以营造出componentDidMount()生命周期的效果，确保组件渲染完成，容器DOM已存在，再进行微前端子应用的渲染`

```ts
import { useEffect } from "react";
import { registerMicroApps, start } from "qiankun";

function Home() {
  useEffect(() => {
    // 注册Qiankun微前端子应用
    registerMicroApps([
      {
        name: "App1", // 子应用名称
        entry: "//localhost:8000", // 子应用地址
        container: "#qk_container", // 子应用渲染的容器DOM
        activeRule: "app1", // 子应用匹配的路由
        props: {}, // 子应用传递静态值
      },
    ]);
    start();
  });

  return (
    <div className="home">
      <div id="qk_container"></div>
    </div>
  );
}

export default Home;
```

### 主应用-路由配置

`在路由中确定此路由渲染的是容器DOM存在的组件`

```ts
const routes: RouteObject[] = [
  {
    path: "/",
    element: LazyLoad(<Home />),
  },
  {
    path: "/app1",
    element: LazyLoad(<Home />),
  },
];
```
## 配置子应用微前端服务
### 子应用-修改 webpack public path
`该文件将决定主应用是否能准确获取到子应用的静态资源文件`

`添加文件 src/public-path.ts`

```ts
if ((window as any).__POWERED_BY_QIANKUN__) {
  // eslint-disable-next-line no-undef
  __webpack_public_path__ = (window as any).__INJECTED_PUBLIC_PATH_BY_QIANKUN__;
}
```

### 子应用-入口文件改写

`React子应用 src/index.js`

```js
import "./public-path";
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import "./public-path";
import App from "./App";

let instance;
function render(props) {
  const { container } = props;
  instance = ReactDOM.createRoot(
    container
      ? container.querySelector("#react-app")
      : document.querySelector("#react-app")
  );
  instance.render(
    <BrowserRouter
      basename={window.__POWERED_BY_QIANKUN__ ? "/app-react" : "/"}
    >
      <App />
    </BrowserRouter>
  );
}

if (!window.__POWERED_BY_QIANKUN__) {
  render({});
}
// 初次挂载
export async function bootstrap(props) {
  console.log("React子应用Bootstrap");
}
// 每次加载
export async function mount(props) {
  console.log("React子应用Mount");
  render(props);
}
// 每次卸载
export async function unmount(props) {
  console.log("React子应用Unmount");
  instance.unmount();
}
```

`Vue子应用 src/main.ts`

```ts
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import "./public-path";
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

let instance: any;

function render(props: any) {
  const { container } = props;
  console.log("渲染子应用");
  instance = createApp(App).use(store).use(router);
  instance.mount(container ? container.querySelector("#vue-app") : "#vue-app");
}

if ((window as any).__POWERED_BY_QIANKUN__) {
  __webpack_public_path__ = (window as any).__INJECTED_PUBLIC_PATH_BY_QIANKUN__;
}

if (!(window as any).__POWERED_BY_QIANKUN__) {
  render({});
}

export async function bootstrap(props: any) {
  console.log("Vue子应用Bootstrap");
  console.log(props);
}

export async function mount(props: any) {
  console.log("Vue子应用Mount");
  (window as any).__VUE_DEVTOOLS_HOOK_REPLAY__ = false;
  render(props);
}

export async function unmount(props: any) {
  console.log("Vue子应用Unmount");
  (window as any).__VUE_DEVTOOLS_HOOK_REPLAY__ = false;
  instance.unmount();
  instance = null;
}
```

### 路由改写 ###
`这将影响子应用的路由导航是否会修改父应用原本的路由`

`React子应用`
```js
<BrowserRouter basename={window.__POWERED_BY_QIANKUN__ ? '/app-react/' : '/'}>
  <App user={user}/>
</BrowserRouter>
```

`Vue子应用`
```ts
const router = createRouter({
  // history: createWebHistory(process.env.BASE_URL),
  // eslint-disable-next-line
  history: createWebHistory((window as any).__POWERED_BY_QIANKUN__?'/app-vue/':'/'),
  routes,
});
```

### 修改webpack输出 && 利用webpack实现开发环境跨域 ###
`React子应用`

`安装react-app-rewired`
```sh
npm install react-app-rewired
```

`根目录下创建config-overrides.js`
```js
const { name } = require('./package');
module.exports = {
  webpack: (config) => {
    config.output.library = `${name}-[name]`;
    config.output.libraryTarget = 'umd';
    // Qiankun官方文档给出的jsonpFunction在webpack5.0时替换为chunkLoadingGlobal
    config.output.chunkLoadingGlobal = `webpackJsonp_${name}`; 
    config.output.globalObject = 'window';
    return config
  },
  devServer: (configFunction) => {
    return function(proxy, allowedHost) {
      const config = configFunction(proxy, allowedHost)
      config.headers = {
        'Access-Control-Allow-Origin': '*'
      }
      return config
    }
  }
}
```
`Vue子应用`

`修改vue.config.js`
```js
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
      // Qiankun官方文档给出的jsonpFunction在webpack5.0时替换为chunkLoadingGlobal
      chunkLoadingGlobal: `webpackJsonp_${name}`,
    },
  },
  devServer: {
    headers: {
      'Access-Control-Allow-Origin': '*'
    }
  },
}
```
## 父子应用通信 ##

### 方法1：Qiankun官网有给出GlobalState API用于父子组件传递监听，但其将在Qiankun 3.0版本中弃用 ###
`父应用中添加 src/actions`

```ts
import { initGlobalState } from "qiankun";
export const initialState = {
  value: "",
};
const actions = initGlobalState(initialState); //初始化全局数据

// 自定义一个获取state的方法下发到子应用（通过props）
actions.getGlobalState = (key) => {
  // 有key，表示取globalState下的某个子级对象
  // 无key，表示取全部
  return key ? initialState[key] : initialState;
};

actions.onGlobalStateChange((newState, prev) => {
  //监听全局状态
  for (let key in newState) {
    initialState[key] = newState[key];
  }
});

export default actions;
```

`子应用声明接收器 src/actions`

```ts
class Actions {
  // 默认值为空 Action
  actions = {
    onGlobalStateChange: function () {},
    setGlobalState: function () {},
    getGlobalState: function () {},
  };
  /**
   * 设置 actions
   */
  setActions(actions) {
    this.actions = actions;
  }

  //拿到入口文件中设置子应用的全局方法
  onGlobalStateChange(...args) {
    return this.actions.onGlobalStateChange(...args);
  }
  setGlobalState(...args) {
    return this.actions.setGlobalState(...args);
  }
  getGlobalState(...args) {
    return this.actions.getGlobalState(...args);
  }
}
const actions = new Actions();
export default actions;
```

`子应用接收Action 入口文件的mount生命周期中`

```ts
import actions from "./actions";

export async function mount(props) {
  actions.setActions(props); // 子项目的入口文件中设置子应用的全局state
  render(props);
}
```

### 方法2：通过在主应用中注册微前端子应用时的props ###

```ts
registerMicroApps([
  {
    name: "App1", // 子应用名称
    entry: "//localhost:8000", // 子应用地址
    container: "#qk_container", // 子应用渲染的容器DOM
    activeRule: "app1", // 子应用匹配的路由
    props: {}, // 子应用传递静态值
  },
]);
start();
```

### 方法3： 通过Storage传值 ###

## Nginx的配置 ##
### 部署·跨域 ###
推荐由[Nginx自动配置网站](https://nginxconfig.io/)自动生成nginx配置文件

`子应用-nginx.conf`
```sh
# security headers
add_header X-XSS-Protection        "1; mode=block" always;
add_header X-Content-Type-Options  "nosniff" always;
add_header Referrer-Policy         "no-referrer-when-downgrade" always;
add_header Content-Security-Policy "default-src 'self' http: https: ws: wss: data: blob: 'unsafe-inline' 'unsafe-eval'; frame-ancestors 'self';" always;
# 跨域设置
add_header Cache-Control no-cache;
add_header Access-Control-Allow-Origin *;
add_header Access-Control-Allow-Methods 'GET, POST, OPTIONS';
add_header Access-Control-Allow-Headers 'DNT,X-Mx-ReqToken,Keep-Alive,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Authorization';

if ($request_method = 'OPTIONS') {
    return 204;
}

location / {  
  try_files $uri /index.html;
} 

# . files
location ~ /\.(?!well-known) {
    deny all;
}
```

`若还想通过父应用的反向代理来实现访问子应用，还需配置父子应用容器的网段`