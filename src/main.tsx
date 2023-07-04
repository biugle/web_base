/*
 * @Author: Leo He
 * @Date: 2023-04-27 15:32:55
 * @LastEditors: DoubleAm
 * @LastEditTime: 2023-05-23 16:33:00
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
import zhCN from 'antd/locale/zh_CN';
import dayjs from 'dayjs';
import routes from './router';
import modules from './modules.config';
import 'dayjs/locale/zh-cn';
import App from './App';

dayjs.locale('zh-cn');

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
      <App routes={[...modules, ...routes]} />
    </ConfigProvider>
  </Provider>,
  document.getElementById('root'),
);
