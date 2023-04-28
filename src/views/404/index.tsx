/*
 * @Author: HxB
 * @Date: 2023-04-27 15:28:20
 * @LastEditors: DoubleAm
 * @LastEditTime: 2023-04-27 15:28:20
 * @Description: 404 页面
 * @FilePath: \web_base\src\views\404\index.tsx
 */
import React from 'react';
import './style.less';

const NotFound = () => {
  return (
    <div data-component="NotFound">
      <div className="container">
        <div className="planet"></div>
        <h1 className="text-info">404 Not Found</h1>
      </div>
    </div>
  );
};

export default NotFound;
