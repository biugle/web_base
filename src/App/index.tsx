/*
 * @Author: HxB
 * @Date: 2023-04-27 15:38:29
 * @LastEditors: DoubleAm
 * @LastEditTime: 2023-04-27 15:54:49
 * @Description: 主组件
 * @FilePath: \web_base\src\views\App\index.tsx
 */
import React, { Component } from 'react';
import AppLoading from '@components/AppLoading';
import './style.less';
import AppRouter from '@router/AppRouter';

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
