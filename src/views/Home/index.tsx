/*
 * @Author: HxB
 * @Date: 2023-04-27 15:38:29
 * @LastEditors: DoubleAm
 * @LastEditTime: 2023-05-08 16:28:34
 * @Description: 首页
 * @FilePath: \web_base\src\views\Home\index.tsx
 */
import React, { useEffect } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import { Button, QRCode, Result } from 'antd';
import { useAliveController } from 'react-activation';
import { actions, selectors } from '@store/all';
import AntIcon from '@components/AntIcon';

const Home = (props: any) => {
  const dispatch = useDispatch();
  const { isLoading, msg } = useSelector(selectors.loading);
  const { getCachingNodes } = useAliveController();
  const cachingNodes = getCachingNodes();

  // redux demo
  console.log({ isLoading, msg }, props.isLoading, props.msg, props.startLoading, props.stopLoading, cachingNodes);
  useEffect(() => {
    dispatch(actions.loading.startLoading('msg'));
    setTimeout(() => dispatch(actions.loading.stopLoading()), 2000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div style={{ width: '100%', height: '100%' }}>
      <AntIcon icon="BugTwoTone" spin={true} style={{ margin: 'auto', display: 'block', width: '30px' }} />
      {/* <QRCode value={'http://a.biugle.cn'} /> */}
      <Result
        status="403"
        title="403"
        subTitle="Sorry, you are not authorized to access this page.(TEST)"
        extra={
          <Button
            type="primary"
            onClick={() => {
              props.history.push('/login');
            }}
          >
            Back Login
          </Button>
        }
      />
    </div>
  );
};

// redux connect 将 store 中的 state 、 action 、 dispatch 导入到组件中。(第一种方式)
export default connect(selectors.loading, actions.loading)(Home);
