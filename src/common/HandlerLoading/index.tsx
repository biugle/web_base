/*
 * @Author: HxB
 * @Date: 2023-04-27 14:42:28
 * @LastEditors: DoubleAm
 * @LastEditTime: 2023-04-27 14:56:37
 * @Description: HandlerLoading 操作加载动画，需在页面最外层显示。
 * @FilePath: \web_base\src\common\HandlerLoading\index.tsx
 */
import React from 'react';
import './style.less';

const HandlerLoading = () => {
  return (
    <div className="container" data-component="HandlerLoading">
      <div className="loading"></div>
    </div>
  );
};

export default HandlerLoading;
