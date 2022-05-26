/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import './public-path'
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

let instance: any

function render(props: any) {
  const { container } = props;
  instance = createApp(App)
    .use(store)
    .use(router)
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
}

export async function mount(props: any) {
  console.log("Vue子应用Mount");
  (window as any).__VUE_DEVTOOLS_HOOK_REPLAY__ = false
  const user = window.localStorage.getItem('sao_user')
  if (user) {
    store.commit('setUser', JSON.parse(user).username)
  }
  render(props);
}

export async function unmount(props: any) {
  console.log("Vue子应用Unmount");
  (window as any).__VUE_DEVTOOLS_HOOK_REPLAY__ = false
  instance.unmount()
  instance = null
}
