/*
 * @Author: HxB
 * @Date: 2023-04-27 15:07:07
 * @LastEditors: DoubleAm
 * @LastEditTime: 2024-06-26 10:38:04
 * @Description: 路由配置文件
 * @FilePath: \web_base\src\router\index.ts
 */
import { sleep } from 'js-xxx';
import { lazy } from 'react';
import { RouteConfig } from '@_custom/types/router';

const routes: RouteConfig[] = [
  {
    name: 'App',
    path: '/',
    redirect: '/home',
    exact: true,
  },
  {
    name: 'Home',
    path: '/home',
    // roles: ['admin'],
    exact: true,
    component: lazy(async () => import('@pages/Home')),
  },
  {
    name: 'ListDemo',
    path: '/list_demo',
    // roles: ['admin'],
    exact: true,
    component: lazy(async () => import('@pages/ListDemo')),
  },
  {
    path: '/login',
    name: 'Login',
    // component: lazy(() => import('@pages/Login')),
    component: lazy(() => import('@pages/LoginRwd')),
    exact: true,
    meta: {
      title: '登录',
      icon: 'HeartTwoTone',
      keepAlive: true,
    },
  },
  {
    path: '*', // 不设置 null，兼容一些第三方组件（例如缓存组件）。
    name: '404',
    component: lazy(async () => {
      await sleep(3500); // 模拟异步加载，展示加载动画。
      return import('@pages/404');
    }),
    exact: true,
  },
];

export default routes;
