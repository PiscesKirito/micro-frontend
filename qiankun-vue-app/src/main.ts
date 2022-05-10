/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import "./public-path.js";
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

function render(props: any) {
  const { container } = props;
  console.log("渲染子应用");
  console.log(props);
  createApp(App)
    .use(store)
    .use(router)
    .mount(container ? container.querySelector("#vue-app") : "#vue-app");
}

if ((window as any).__POWERED_BY_QIANKUN__) {
  __webpack_public_path__ = (window as any).__INJECTED_PUBLIC_PATH_BY_QIANKUN__;
}

if (!(window as any).__POWERED_BY_QIANKUN__) {
  render({});
}

export async function bootstrap(props: any) {
  console.log("Vue子应用Bootstrap");
}

export async function mount(props: any) {
  console.log("Vue子应用Mount");
  render(props);
}

export async function unmount(props: any) {
  console.log("Vue子应用Unmount");
}
