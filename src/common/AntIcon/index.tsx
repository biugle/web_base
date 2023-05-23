/*
 * @Author: HxB
 * @Date: 2023-04-27 14:42:28
 * @LastEditors: DoubleAm
 * @LastEditTime: 2023-05-18 18:12:10
 * @Description: 封装 ant design icon，方便根据字符串渲染图标。
 * @FilePath: \web_base\src\components\AntIcon\index.tsx
 */
import React from 'react';
import * as Icons from '@ant-design/icons';

const AntIcon = (props: { icon: string; [key: string]: any }) => {
  const { icon } = props;
  const antIcon: { [key: string]: any } = Icons;
  return React.createElement(antIcon[icon], props);
};

export default AntIcon;
