/*
 * @Author: HxB
 * @Date: 2023-04-27 15:24:56
 * @LastEditors: DoubleAm
 * @LastEditTime: 2023-05-23 14:06:52
 * @Description: 路由渲染组件
 * @FilePath: \web_base\src\router\AppRouter\RouterView.tsx
 */
import { Redirect, Route, Switch } from 'react-router-dom';
import React, { Suspense } from 'react';
import RouterLoading from '@common/RouterLoading';
import AuthRouteDom from './AuthRouteDom';

const RouterView = (props: any) => {
  const { routes } = props;

  return (
    <Suspense fallback={<RouterLoading />}>
      <Switch>
        {routes.map((route: any) => {
          return route.redirect ? (
            <Route key={route.path} exact={route.exact} path={route.path}>
              <Redirect to={route.redirect} />
            </Route>
          ) : (
            <Route
              key={route.path}
              exact={route.exact && !route.routes?.length}
              path={route.path}
              render={(routeProps) => {
                return <AuthRouteDom {...route} {...routeProps} />;
              }}
            />
          );
        })}
        {props.defaultRoute && <Redirect to={props.defaultRoute} />}
      </Switch>
    </Suspense>
  );
};

export default RouterView;
