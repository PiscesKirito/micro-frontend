# kirito-world #

## 初始化项目 ##
``` sh
  npx create-react-app <project-name> --template redux-typescript
```
## 引入AntDesign ##
``` sh
  npm install antd --save
```

## 引入Sass ##
``` sh
  npm install sass
```

## 模块化路由 && 懒加载 ##
``` sh
  npm install --save react-router-dom
```

## 安装配置Axios ##
``` sh
    npm install axios
```

## 配置开发环境反向代理 ##
``` sh
    npm install http-proxy-middleware --save
```

## 优化项目结构 ##
``` pl
project
|------ node_modules                    // 资源包文件夹
|------ public
|       |------ favicon.ico             // 浏览器导航栏图标
|       |------ index.html              // 根网页
|       |------ index.css               // 根网页样式，全局样式
|
|------ src
|       |------ assets                  // 静态资源文件
|       |------ controllers             // 容器组件
|       |------ pages                   // 页面组件
|       |------ routes                  // 路由文件夹
|       |------ rudux                   // Redux文件夹
|       |       |------ slices          // Slice文件夹
|       |       |------ store.ts        // Redux入口
|       |------ services                // http请求文件夹
|       |------ App.tsx                 // App组件
|       |------ react-app-env.d.ts      
|
|------ .gitignore                      // git同步忽略目录
|------ package-lock.json
|------ package.json
|------ README.md
|------ tsconfig.json
```