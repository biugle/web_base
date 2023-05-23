/*
 * @Author: HxB
 * @Date: 2023-05-23 11:30:39
 * @LastEditors: DoubleAm
 * @LastEditTime: 2023-05-23 18:32:18
 * @Description: 模块配置文件
 * @FilePath: \web_base\src\modules.config.ts
 */

import { ModuleConfig } from '@_custom/types/modules';
import { lazy } from 'react';

const modules: ModuleConfig[] = [
  {
    name: 'AboutModule',
    path: '/about',
    meta: {
      title: '系统介绍',
      description: '系统介绍模块',
    },
    component: lazy(() => import('@modules/AboutModule')),
  },
  {
    name: 'SettingsModule',
    path: '/settings',
    icon: 'SettingTwoTone',
    // roles: ['admin'],
    meta: {
      title: '系统配置',
      description: '系统配置模块',
      keepAlive: true,
    },
    component: lazy(() => import('@modules/SettingsModule')),
  },
];

export default modules;
