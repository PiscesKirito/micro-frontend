import React from 'react';
import reactDom from 'react-dom';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from "react-router-dom";
import './index.css';
import App from './App';

function render(props) {
  const { container } = props
  ReactDOM.createRoot(container ? container.querySelector('#react-app') : document.querySelector('#react-app')).render(
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
}

export async function mount(props) {
  console.log("React子应用Mount");
  render(props);
}

export async function unmount(props) {
  console.log("React子应用Unmount");
  const { container } = props
  reactDom.unmountComponentAtNode(container ? container.querySelector('#react-app') : document.querySelector('#react-app'));
}