/* eslint-disable max-lines */
/*
 * @Author: HxB
 * @Date: 2023-04-27 15:38:29
 * @LastEditors: DoubleAm
 * @LastEditTime: 2024-08-30 15:23:18
 * @Description: 首页
 * @FilePath: \web_base\src\views\Home\index.tsx
 */
import React, { useEffect, useRef, useState } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import { Button, Drawer, Modal, QRCode, Result } from 'antd';
import { useAliveController } from 'react-activation';
import { actions, selectors } from '@store/all';
import AntIcon from '@components/AntIcon';
import { useHistory } from 'react-router-dom';
import { useLogClick } from '@/_custom/hooks/useLogClick';
import { LogProvider } from '@/components/LogProvider';
import { useLogScroll } from '@/_custom/hooks/useLogScroll';
import { useLogChange } from '@/_custom/hooks/useLogChange';
import { setLang, t$ } from '@/locales/i18n';
import { useTranslation } from '@/locales/useTranslation';
import useTimeout from '@/_custom/hooks/useTimeout';
import AntTree, { getTreeCheckedNodes } from '@/components/AntTree';
import LoadingPre from '@/components/LoadingPre';
import { fire } from '@/components/Fire';
import { fireConfirm } from '@/components/Fire/fireConfirm';
import AutoText from '@/components/AutoText';

const Home = (props: any) => {
  // const { t$ } = useTranslation();
  const dispatch = useDispatch();
  const { isLoading, msg } = useSelector(selectors.loading);
  const { lang } = useSelector(selectors.settings);
  const { getCachingNodes } = useAliveController();
  const cachingNodes = getCachingNodes();
  // 使用自定义的钩子函数
  const clickLogInfo = useLogClick((key, data) => console.log({ key, data }));
  const elementXRef = useRef(null);
  const elementYRef = useRef(null);
  useLogScroll(elementXRef);
  useLogScroll(elementYRef);
  useLogChange();
  const [mockTreeData, setMockTreeData] = useState<any[]>([]);
  const [mockSelectedKeys, setMockSelectedKeys] = useState<any[]>([]);
  useTimeout(() => {
    setMockTreeData([
      {
        title: '0-0',
        key: '0-0',
        children: [
          {
            title: '0-0-0',
            key: '0-0-0',
            children: [
              { title: '0-0-0-0', key: '0-0-0-0' },
              { title: '0-0-0-1', key: '0-0-0-1' },
              { title: '0-0-0-2', key: '0-0-0-2' },
            ],
          },
          {
            title: '0-0-1',
            key: '0-0-1',
            children: [
              { title: '0-0-1-0', key: '0-0-1-0' },
              { title: '0-0-1-1', key: '0-0-1-1' },
              { title: '0-0-1-2', key: '0-0-1-2' },
            ],
          },
          {
            title: '0-0-2',
            key: '0-0-2',
            children: [
              { title: '0-0-2-0', key: '0-0-2-0' },
              { title: '0-0-2-1', key: '0-0-2-1' },
            ],
          },
        ],
      },
      {
        title: '0-1',
        key: '0-1',
        children: [
          { title: '0-1-0-0', key: '0-1-0-0' },
          { title: '0-1-0-1', key: '0-1-0-1' },
          { title: '0-1-0-2', key: '0-1-0-2' },
        ],
      },
      {
        title: '0-2',
        key: '0-2',
      },
    ]);
  }, 3000);

  useEffect(() => {
    const data = getTreeCheckedNodes(
      mockTreeData,
      ['0-0-2-0', '0-0-2-1', '0-0-0', '0-0-0-1', '0-1-0-2'].concat(['0-2', '404-not-found']),
    );
    console.log(data);
    setMockSelectedKeys(data.checkedKeys);
  }, [mockTreeData]);

  useEffect(() => {
    console.log({ mockSelectedKeys });
  }, [mockSelectedKeys]);

  // redux demo
  // console.log({ isLoading, msg }, props.isLoading, props.msg, props.startLoading, props.stopLoading, cachingNodes);
  useEffect(() => {
    dispatch(actions.loading.startLoading('msg'));
    setTimeout(() => dispatch(actions.loading.stopLoading()), 2000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    // createClickLogListener((key, data) => console.log({ key, data }));
  }, []);

  const history = useHistory();

  const CustomDialog = (props: any) => {
    const [data, setData] = useState('data');
    return (
      <Modal
        {...props}
        title={'test test test'}
        afterClose={() => {
          console.log('test test test afterClose');
        }}
      >
        <p>Custom Dialog Content</p>
        <input value={data} onChange={(e) => setData(e.target.value)} />
      </Modal>
    );
  };
  const CustomDrawer = (props: any) => {
    const [data, setData] = useState('data');
    return (
      <Drawer
        {...props}
        onClose={(e) => {
          console.log('Custom Drawer', e, { props });
          props?.onClose();
        }}
      >
        <p>Custom Dialog Content</p>
        <input value={data} onChange={(e) => setData(e.target.value)} />
      </Drawer>
    );
  };

  return (
    <div style={{ width: '100%', height: '100%' }}>
      <Button
        onClick={() => {
          history.push('/list_demo');
        }}
      >
        Go ListDemo
      </Button>
      <Button
        onClick={() => {
          history.push('/form_demo');
        }}
      >
        Go FormDemo
      </Button>
      <Button
        onClick={() => {
          history.push('/dynamic_array_form');
        }}
      >
        Go DynamicArrayForm
      </Button>
      <Button
        onClick={() => {
          fire(CustomDialog)({
            afterClose: () => {
              console.log('Custom Dialog AfterClose');
            },
            onConfirm: () => {
              console.log('Custom Dialog onConfirm');
            },
          });
        }}
      >
        Fire Dialog
      </Button>
      <Button
        onClick={() => {
          const fireConfig = fire(CustomDrawer)();
          console.log({ fireConfig });
          fireConfig.update({ title: '测试 title' });
        }}
      >
        Fire Drawer
      </Button>
      <Button
        onClick={() => {
          const { close, update, props } = fireConfirm({
            content: <b>test content</b>,
            // title: 'test title',
            onOk: () => {
              alert('onOk');
              console.log({ close, update, props });
              close();
            },
            afterClose: () => {
              alert(1);
              console.log({ close, update, props });
            },
          });
        }}
      >
        Fire Confirm
      </Button>
      <div style={{ width: 200 }}>
        <AutoText
          text="这是一段省略文本 这是一段省略文本 这是一段省略文本 这是一段省略文本"
          title="这是一段省略文本"
          tips="提示"
          prefix={<AntIcon icon="BugTwoTone" />}
          suffix={<AntIcon icon="BugTwoTone" />}
          color="blue"
        />
      </div>
      <div style={{ position: 'relative', height: '60px' }}>
        <LoadingPre />
      </div>
      <AntIcon icon="BugTwoTone" spin={true} style={{ margin: 'auto', display: 'block', width: '30px' }} />
      <hr className="dotted-hr awesome" />
      <AntTree treeData={mockTreeData} selectedKeys={mockSelectedKeys} checkedKeys={mockSelectedKeys} />
      {/* <LogProvider> */}
      <h5>{t$('你好世界')}</h5>
      <h5>{t$('语言 ${lang}', { lang })}</h5>
      <h5>{t$('不存在')}</h5>
      <Button
        onClick={() => {
          setLang('en-US');
        }}
      >
        设置英语
      </Button>
      <Button
        onClick={() => {
          setLang('zh-CN');
        }}
      >
        设置中文
      </Button>
      <div className="colorful-border">This div has a colorful border with a gradient effect!</div>
      <div data-lazy />
      <ul className="xxx-timeline">
        <li data-index={1}>Event 1</li>
        <li data-index={2}>Event 2</li>
        <li data-index={3}>Event 3</li>
        <li data-index={4}>Event 4</li>
        <li data-index={5}>Event 5</li>
        <li data-index={6}>Event 6</li>
      </ul>
      {/* <QRCode value={'http://a.biugle.cn'} /> */}
      {/* <Result
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
      /> */}
      <div log-click={JSON.stringify({})}>
        <div style={{ position: 'sticky', top: 0, background: 'whitesmoke', zIndex: 99 }}>
          <p>点击记录状态：</p>
          <pre>{JSON.stringify(clickLogInfo, null, 2)}</pre>
        </div>
        <hr />
        <p>顺序埋点2级</p>
        <Button
          log-click={JSON.stringify({
            trigger: 'click',
            params: {},
            maxSequence: 2,
            sequence: 1,
            logKey: 'example-key-0',
          })}
          onClick={() => {
            console.log('test1');
          }}
        >
          Button 1
        </Button>
        <Button
          log-click={JSON.stringify({
            trigger: 'click',
            params: {},
            maxSequence: 2,
            sequence: 2,
            logKey: 'example-key-0',
          })}
          onClick={() => {
            console.log('test2');
          }}
        >
          Button 2
        </Button>
        <hr />
        <p>顺序埋点3级</p>
        <button
          log-click={JSON.stringify({
            trigger: 'click',
            params: {},
            maxSequence: 3,
            sequence: 1,
            logKey: 'example-key-1',
          })}
        >
          button 1
        </button>
        <button
          log-click={JSON.stringify({
            trigger: 'click',
            params: {},
            maxSequence: 3,
            sequence: 2,
            logKey: 'example-key-1',
          })}
        >
          button 2
        </button>
        <button
          log-click={JSON.stringify({
            trigger: 'click',
            params: {},
            maxSequence: 3,
            sequence: 3,
            logKey: 'example-key-1',
          })}
        >
          button 3
        </button>
        <hr />
        <p>普通组件埋点</p>
        <Button log-click={JSON.stringify({ trigger: 'click', params: {}, logKey: 'example-key-2' })}>Button 3</Button>
        <hr />
        <p>普通埋点</p>
        <div style={{ border: '2px solid red' }} log-click={JSON.stringify({ params: {}, logKey: 'example-key-3' })}>
          div 4
        </div>
        <hr />
        <p>横向滚动</p>
        <div
          log-scroll={JSON.stringify({ logKey: 'example-scroll-X' })}
          style={{ border: '2px solid blue', height: '200px', width: '300px', overflow: 'auto' }}
          ref={elementXRef}
        >
          <div style={{ border: '2px solid blue', height: '100px', width: '800px' }}></div>
        </div>
        <hr />
        <p>纵向滚动</p>
        <div
          log-scroll={JSON.stringify({ logKey: 'example-scroll-Y' })}
          style={{ border: '2px solid yellow', height: '300px', width: '200px', overflow: 'auto' }}
          ref={elementYRef}
        >
          <div style={{ border: '2px solid yellow', height: '600px', width: '100px' }}></div>
        </div>
      </div>
      <hr />
      <p>输入事件</p>
      <div log-change={JSON.stringify({ logKey: 'input-change-0' })}>
        <input />
      </div>
      <input />
      <hr />
      <p>顺序记录埋点3级</p>
      <button
        log-click={JSON.stringify({
          trigger: 'click',
          params: {},
          isOrder: true,
          orderKey: '按钮A',
          logKey: 'example-order-1',
        })}
      >
        button A
      </button>
      <button
        log-click={JSON.stringify({
          trigger: 'click',
          params: {},
          isOrder: true,
          orderKey: '按钮B',
          logKey: 'example-order-1',
        })}
      >
        button B
      </button>
      <button
        log-click={JSON.stringify({
          trigger: 'click',
          params: {},
          isOrder: true,
          orderKey: '按钮C',
          logKey: 'example-order-1',
        })}
      >
        button C
      </button>
      <hr />
      <p>顺序记录埋点3级</p>
      <button
        log-click={JSON.stringify({
          trigger: 'click',
          params: {},
          isOrder: true,
          orderKey: '按钮a',
          logKey: 'example-order-2',
        })}
      >
        button a
      </button>
      <button
        log-click={JSON.stringify({
          trigger: 'click',
          params: {},
          isOrder: true,
          orderKey: '按钮b',
          logKey: 'example-order-2',
        })}
      >
        button b
      </button>
      <button
        log-click={JSON.stringify({
          trigger: 'click',
          params: {},
          isOrder: true,
          orderKey: '按钮c',
          logKey: 'example-order-2',
        })}
      >
        button c
      </button>
      {/* </LogProvider> */}
    </div>
  );
};

// redux connect 将 store 中的 state 、 action 、 dispatch 导入到组件中。(第一种方式)
export default connect(selectors.loading, actions.loading)(Home);
