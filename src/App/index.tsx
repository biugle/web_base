/*
 * @Author: HxB
 * @Date: 2023-04-27 15:38:29
 * @LastEditors: DoubleAm
 * @LastEditTime: 2023-08-18 15:24:46
 * @Description: 主组件
 * @FilePath: \web_base\src\App\index.tsx
 */
import React, { Component } from 'react';
import AppLoading from '@components/AppLoading';
import './style.less';
import AppRouter from '@router/AppRouter';
import { log } from 'js-xxx';
import { connect } from 'react-redux';
import { selectors } from '@/store/all';

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
    function getRoutes(routes, userRoles) {
      userRoles = userRoles ?? [];
      const res = [];
      routes.forEach((r) => {
        if (r.routes) {
          const _data = getRoutes(r.routes ?? [], userRoles);
          if (_data.length > 0) {
            res.push({
              ...r,
              routes: _data,
            });
          }
          return;
        }
        if (!r.roles) {
          res.push(r);
          return;
        }
        if ([].concat(r.roles)?.some((role) => userRoles.includes(role))) {
          res.push(r);
          return;
        }
      });
      return res;
    }

    const { userRoles } = this.props;

    if (this.state.loading) {
      return <AppRouter routes={this.props.routes} />;
      // return <AppRouter routes={getRoutes(this.props.routes, userRoles)} />;
    }

    return <AppLoading />;
  }
}

export default connect((state, ownProps: any) => ({
  // ...selectors.user(state),
  routes: ownProps.routes, // 使用从属性传递过来的路由配置
}))(App);
