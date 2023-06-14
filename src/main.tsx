/*
 * @Author: Leo He
 * @Date: 2023-04-27 15:32:55
 * @LastEditors: DoubleAm
 * @LastEditTime: 2023-06-14 15:28:35
 * @Description: 主文件入口
 * @FilePath: \web_base\src\main.tsx
 */
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConfigProvider, message, notification } from 'antd';
import '@_custom/css/reset.css';
import 'antd/dist/antd.css';
import '@_custom/css/app.less';
import '@_custom/css/styles.less';
import store from '@store/all';
import routes from './router';
import App from './App';

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
    <ConfigProvider input={{ autoComplete: 'off' }}>
      <App routes={routes} />
    </ConfigProvider>
  </Provider>,
  document.getElementById('root'),
);
