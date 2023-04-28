/*
 * @Author: HxB
 * @Date: 2023-04-27 15:16:18
 * @LastEditors: DoubleAm
 * @LastEditTime: 2023-05-08 16:23:38
 * @Description: 路由守卫子组件
 * @FilePath: \web_base\src\router\AppRouter\AuthRouteDom.tsx
 */
import React, { Component } from 'react';
import { Redirect, withRouter } from 'react-router-dom';
import KeepAlive from 'react-activation';
import { DEV_ROLES, IS_DEV } from '@_custom/config';
import store, { actions } from '@store/all';

class AuthRoute extends Component<any, any> {
  constructor(props: any) {
    super(props);
  }

  render() {
    const { path, roles } = this.props;

    // alert(JSON.stringify(this.props));

    // 用户角色，全局状态管理可自行引入 redux 。
    const userRoles = IS_DEV ? (!DEV_ROLES || !DEV_ROLES.length ? undefined : DEV_ROLES) : undefined;

    // 用户已登录，还想去登录页面。禁止
    if (userRoles && path === '/login') {
      return <Redirect to="/home" />;
    }

    const $AuthRouteDom =
      // https://github.com/CJY0208/react-activation/issues/18
      !this.props.routes && this.props?.meta?.keepAlive ? (
        <KeepAlive
          cacheKey={this.props.name}
          id={this.props.path}
          key={this.props.path}
          name={this.props.path}
          when={() => [this.props?.meta?.keepAlive ?? false, this.props?.meta?.keepAlive ?? false]}
        >
          <this.props.component {...this.props} routes={this.props.routes} />
        </KeepAlive>
      ) : (
        <this.props.component {...this.props} routes={this.props.routes} />
      );

    // 如果路由无需校验 不管
    if (!roles) {
      return $AuthRouteDom;
    }

    // 用户未登录，且路由需要校验，则跳转到登录页。
    if (!userRoles) {
      return <Redirect to="/login" />;
    }

    // 路由需要校验，且用户已登录。有权限进入，无权限 404 。
    if (roles?.some((role: any) => userRoles?.includes(role))) {
      return $AuthRouteDom;
    } else {
      return <Redirect to="/404" />;
    }
  }
}

export default withRouter(AuthRoute);
