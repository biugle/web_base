/*
 * @Author: HxB
 * @Date: 2023-04-27 14:42:28
 * @LastEditors: DoubleAm
 * @LastEditTime: 2023-04-27 15:10:54
 * @Description: RouterLoading 路由加载独立组件
 * @FilePath: \web_base\src\components\RouterLoading\index.tsx
 */
import React from 'react';
import './style.less';

const RouterLoading = () => {
  return (
    <div className="container" data-component="RouterLoading">
      <div className="circle"></div>
      <div className="circle"></div>
      <div className="circle"></div>
      <div className="circle"></div>
      <div className="circle"></div>
      <div className="circle"></div>
    </div>
  );
};

export default RouterLoading;
