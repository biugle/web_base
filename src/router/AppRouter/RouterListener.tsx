/*
 * @Author: HxB
 * @Date: 2023-04-27 15:24:56
 * @LastEditors: DoubleAm
 * @LastEditTime: 2023-04-27 15:24:56
 * @Description: 路由监听组件
 * @FilePath: \web_base\src\router\AppRouter\RouterListener.tsx
 */
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import XCall from 'js-xcall';

class RouterListener extends Component<any, any> {
  private _cancelHistoryListener: any;

  constructor(props: any) {
    super(props);
  }

  componentDidMount() {
    // 进入路由的时候监听路由的变化 如果路由发生变化则进行相应操作
    this._cancelHistoryListener = this.props.history.listen((location) => {
      console.log(location);
      if (this.props.location.pathname !== location.pathname) {
        console.log(`路由发生了变化: 上一条：${this.props.location.pathname} 下一条：${location.pathname}`);
        XCall.existEvent('routerChange') &&
          XCall.dispatch('routerChange', this.props.location.pathname, location.pathname);
      }
    });
  }

  componentWillUnmount() {
    // 离开路由页面的时候，清除监听。
    this._cancelHistoryListener();
  }

  render() {
    return <></>;
  }
}

export default withRouter(RouterListener);
