/*
 * @Author: HxB
 * @Date: 2023-04-27 15:16:18
 * @LastEditors: DoubleAm
 * @LastEditTime: 2024-06-25 18:38:25
 * @Description: 主路由组件入口
 * @FilePath: \web_base\src\router\AppRouter\index.tsx
 */
import React from 'react';
import { HashRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { AliveScope } from 'react-activation';
import HandlerLoading from '@components/HandlerLoading';
import { selectors } from '@store/all';
import RouterListener from './RouterListener';
import RouterView from './RouterView';

type AppRouterProps = {
  routes: any;
  basename?: string;
  defaultRoute?: string;
  language?: string;
};

const AppRouter: React.FC<AppRouterProps> = (props: any) => {
  return (
    <HashRouter basename={props.basename ?? ''}>
      <RouterListener />
      <AliveScope>
        <RouterView routes={props.routes} defaultRoute={props.defaultRoute ?? '/'} />
      </AliveScope>
      {props.isLoading && <HandlerLoading />}
    </HashRouter>
  );
};

export default connect(selectors.loading)(AppRouter);
