/*
 * @Author: HxB
 * @Date: 2023-04-27 15:16:18
 * @LastEditors: DoubleAm
 * @LastEditTime: 2023-05-23 18:11:40
 * @Description: TestA
 * @FilePath: \web_base\src\modules\AboutModule\views\TestA\index.tsx
 */
import React, { useEffect } from 'react';
import './style.less';
import { actions, selectors } from '@store/all';
import { useDispatch, useSelector } from 'react-redux';

type TestAProps = {
  title: string;
};

const TestA: React.FC<TestAProps> = (props) => {
  const dispatch = useDispatch();
  const sysInfo = useSelector(selectors.sysInfo);
  console.log({ sysInfo });
  useEffect(() => {
    dispatch(actions.sysInfo.setSysInfo({ version: 'test_about_module' }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return <div data-component="TestA">AboutModule-TestA</div>;
};

export default TestA;
