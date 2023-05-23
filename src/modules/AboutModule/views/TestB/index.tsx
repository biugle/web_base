/*
 * @Author: HxB
 * @Date: 2023-04-27 15:16:18
 * @LastEditors: DoubleAm
 * @LastEditTime: 2023-05-23 18:24:11
 * @Description: TestB
 * @FilePath: \web_base\src\modules\AboutModule\views\TestB\index.tsx
 */
import React from 'react';
import './style.less';

type TestBProps = {
  title: string;
};

const TestB: React.FC<TestBProps> = (props) => {
  return <div data-component="TestB">AboutModule-TestB</div>;
};

export default TestB;
