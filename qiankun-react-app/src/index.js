import './public-path'
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from "react-router-dom";
import './index.css';
import App from './App';

let instance
function render(props, user) {
  const { container } = props
  instance = ReactDOM.createRoot(container ? container.querySelector('#react-app') : document.querySelector('#react-app'))
  instance.render(
    <BrowserRouter basename={window.__POWERED_BY_QIANKUN__ ? '/app-react/' : '/'}>
      <App user={user}/>
    </BrowserRouter>
  );
}

if(!window.__POWERED_BY_QIANKUN__) {
  render({})
}

export async function bootstrap(props) {
  console.log("React子应用Bootstrap");
}

export async function mount(props) {
  console.log("React子应用Mount");
  const user = window.localStorage.getItem('sao_user')
  let username
  if (user) {
    username = JSON.parse(user).username
    render(props, username);
  } else {
    render(props, {})
  }
}

export async function unmount(props) {
  console.log("React子应用Unmount");
  instance.unmount()
}