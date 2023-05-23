/*
 * @Author: HxB
 * @Date: 2023-04-27 14:42:28
 * @LastEditors: DoubleAm
 * @LastEditTime: 2023-04-27 15:10:35
 * @Description: AppLoading 主程序加载独立组件
 * @FilePath: \web_base\src\components\AppLoading\index.tsx
 */
import React from 'react';
import './style.less';

const AppLoading = () => {
  return (
    <div className="container" data-component="AppLoading">
      <div className="loading-box">
        <div className="sun">
          <div className="sun-body">
            <div className="line" style={{ transform: 'rotate(calc(1 * 45deg))' }}></div>
            <div className="line" style={{ transform: 'rotate(calc(2 * 45deg))' }}></div>
            <div className="line" style={{ transform: 'rotate(calc(3 * 45deg))' }}></div>
            <div className="line" style={{ transform: 'rotate(calc(4 * 45deg))' }}></div>
            <div className="line" style={{ transform: 'rotate(calc(5 * 45deg))' }}></div>
            <div className="line" style={{ transform: 'rotate(calc(6 * 45deg))' }}></div>
            <div className="line" style={{ transform: 'rotate(calc(7 * 45deg))' }}></div>
            <div className="line" style={{ transform: 'rotate(calc(8 * 45deg))' }}></div>
          </div>
          <div className="eye"></div>
        </div>
        <div className="horizon"></div>
      </div>
    </div>
  );
};

export default AppLoading;
