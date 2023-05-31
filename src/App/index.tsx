/*
 * @Author: HxB
 * @Date: 2023-04-27 15:38:29
 * @LastEditors: DoubleAm
 * @LastEditTime: 2023-05-31 14:48:06
 * @Description: 主组件
 * @FilePath: \web_base\src\App\index.tsx
 */
import React, { Component } from 'react';
import AppLoading from '@components/AppLoading';
import './style.less';
import AppRouter from '@router/AppRouter';
import { log } from 'js-xxx';

class App extends Component<any, { loading: boolean }> {
  constructor(props: any) {
    super(props);
    this.state = {
      loading: false,
    };
  }

  componentDidMount() {
    window.onload = () => {
      setTimeout(() => {
        this.setState({ loading: true });
      }, 1500);
      log('模拟-页面加载完成'); // 不会被控制台清空
      // @ts-ignore
      window?.xIpc?.on('sendData', (e, ...args) => log(args));
    };
  }

  render() {
    if (this.state.loading) {
      return <AppRouter routes={this.props.routes} />;
    }

    return <AppLoading />;
  }
}

export default App;
