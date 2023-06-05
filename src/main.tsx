/*
 * @Author: Leo He
 * @Date: 2023-04-27 15:32:55
 * @LastEditors: DoubleAm
 * @LastEditTime: 2023-06-06 16:21:50
 * @Description: 主文件入口
 * @FilePath: \web_base\src\main.tsx
 */
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConfigProvider, message, notification } from 'antd';
import '@_custom/css/reset.css';
import '@_custom/css/app.less';
import '@_custom/css/styles.less';
import store from '@store/all';
import routes from './router';
import modules from './modules.config';
import App from './App';
import { IS_DEV } from './_custom/config';

notification.config({
  placement: 'topRight',
  top: 30,
  duration: 3,
  rtl: false,
});

message.config({
  top: 60,
  duration: 2,
  maxCount: 3,
  rtl: true,
});

initServiceWorker();

ReactDOM.render(
  <Provider store={store}>
    <ConfigProvider input={{ autoComplete: 'off' }}>
      <App routes={[...modules, ...routes]} />
    </ConfigProvider>
  </Provider>,
  document.getElementById('root'),
);

function unregisterServiceWorker() {
  return new Promise<void>((resolve) => {
    navigator.serviceWorker.getRegistrations().then((registrations) => {
      if (registrations && registrations.length) {
        Promise.all(registrations.map((registration) => registration.unregister()))
          .then((success) => {
            console.log('All Service Workers unregistered successfully!', success);
            resolve();
          })
          .catch((error) => {
            console.log('Service Worker unregister failed!', error);
          });
      } else {
        console.log('No Service Worker registered!');
      }
      resolve();
    });
  });
}

function registerServiceWorker() {
  // @ts-ignore
  const swFilePath = './service_worker.js';
  console.log({ swFilePath });
  navigator.serviceWorker
    .register(swFilePath)
    .then((registration) => {
      console.log('ServiceWorker registration successful!', registration.scope);
      navigator.serviceWorker.ready.then((serviceWorkerRegistration) => {
        console.log({ serviceWorkerRegistration }, '注册缓存服务成功');
        // 在这里处理缓存逻辑
      });
    })
    .catch((error) => {
      console.log('ServiceWorker registration failed!', error);
    });
}

function initServiceWorker() {
  if ('serviceWorker' in navigator) {
    if (IS_DEV) {
      unregisterServiceWorker();
    } else {
      window.addEventListener('load', () => {
        unregisterServiceWorker().then(() => {
          registerServiceWorker();
        });
      });
    }
  }
}
