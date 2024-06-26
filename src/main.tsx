/*
 * @Author: Leo He
 * @Date: 2023-04-27 15:32:55
 * @LastEditors: DoubleAm
 * @LastEditTime: 2024-06-26 11:02:27
 * @Description: 主文件入口
 * @FilePath: \web_base\src\main.tsx
 */
import React from 'react';
import ReactDOM from 'react-dom';
import { initDevtool } from '@sigi/devtool';
import { Provider } from 'react-redux';
import { ConfigProvider, message, notification } from 'antd';
import '@_custom/css/reset.css';
import 'antd/dist/antd.css';
import '@_custom/css/app.less';
import '@_custom/css/styles.less';
import moment from 'moment';
import store from '@store/all';
import zhCN from 'antd/es/locale/zh_CN';
import routes from './router';
import 'moment/dist/locale/zh-cn';
import App from './App';
import '@abraham/reflection';
import { IS_DEV } from './_custom/config';

/*
 * 兼容 sigi module.hot vite 环境报错
 */
// @ts-ignore
window.module = {
  hot: import.meta.hot,
};

// if (IS_DEV) {
//   initDevtool();
// }

// eslint-disable-next-line no-undef
console.log(_MODE_, module, processEnv);

moment.locale('zh-cn');

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

ReactDOM.render(
  <Provider store={store}>
    <ConfigProvider locale={zhCN} input={{ autoComplete: 'off' }}>
      <App routes={routes} />
    </ConfigProvider>
  </Provider>,
  document.getElementById('root'),
);
