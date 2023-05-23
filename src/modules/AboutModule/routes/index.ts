/*
 * @Author: HxB
 * @Date: 2023-04-27 15:07:07
 * @LastEditors: DoubleAm
 * @LastEditTime: 2023-05-23 17:37:10
 * @Description: 路由配置文件
 * @FilePath: \web_base\src\modules\AboutModule\routes\index.ts
 */
import { lazy } from 'react';
import { RouteConfig } from '@_custom/types/router';

const routes: RouteConfig[] = [
  {
    name: 'AboutModule',
    path: '/',
    redirect: '/test_a',
    exact: true,
  },
  {
    name: 'TestA',
    path: '/test_a',
    exact: true,
    component: lazy(async () => import('@modules/AboutModule/views/TestA')),
  },
  {
    name: 'TestB',
    path: '/test_b',
    exact: true,
    component: lazy(async () => import('@modules/AboutModule/views/TestB')),
  },
];

export default routes;
