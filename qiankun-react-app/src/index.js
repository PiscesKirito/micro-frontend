import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from "react-router-dom";
import './index.css';
import App from './App';

let instance
function render(props) {
  const { container } = props
  instance = ReactDOM.createRoot(container ? container.querySelector('#react-app') : document.querySelector('#react-app'))
  instance.render(
    <BrowserRouter basename={window.__POWERED_BY_QIANKUN__ ? '/app-react' : '/'}>
      <App />
    </BrowserRouter>
  );
}

if(!window.__POWERED_BY_QIANKUN__) {
  render({})
}

export async function bootstrap(props) {
  console.log("React子应用Bootstrap");
  console.log(props.user)
}

export async function mount(props) {
  console.log("React子应用Mount");
  console.log(props.user)
  render(props);
}

export async function unmount(props) {
  console.log("React子应用Unmount");
  instance.unmount()
}