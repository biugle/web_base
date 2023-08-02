/*
 * @Author: HxB
 * @Date: 2023-04-27 15:32:21
 * @LastEditors: DoubleAm
 * @LastEditTime: 2023-08-02 10:28:16
 * @Description: 登录页面
 * @FilePath: \web_base\src\views\Login\index.tsx
 */
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import './style.less';
import { useAliveController } from 'react-activation';
import useInterval from '@_custom/hooks/useInterval';
import useRouterChange from '@_custom/hooks/useRouterChange';
import logo from '@static/imgs/logo-white.png';

const Login = () => {
  const HAS_REGISTER = true;
  const history = useHistory();
  const [isSaveAccount, setIsSaveAccount] = useState<boolean>(window.localStorage.getItem('isSaveAccount') === 'true');
  const onBlur = (e: any) => {
    !e.target.value && e.target.classList.remove('focus');
  };
  const onFocus = (e: any) => {
    e.target.classList.add('focus');
  };
  const stopEvent = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
  };
  const { dropScope, refreshScope } = useAliveController();

  useInterval(() => {
    console.log('test keep-alive login page.');
  }, 1000);

  useRouterChange((from: string, to: string) => {
    console.log('路由变化 Login', from, to);
    if (from.includes('home')) {
      refreshScope(to);
    }
  });
  return (
    <div data-component="Login">
      <div className="container" id="login-box">
        <div className="form-container sign-up-container">
          <form>
            <h1>注册</h1>
            <div className="txtb">
              <input autoComplete="off" type="text" onFocus={onFocus} onBlur={onBlur} />
              <span data-placeholder="Account"></span>
            </div>
            <div className="txtb">
              <input autoComplete="off" type="email" onFocus={onFocus} onBlur={onBlur} />
              <span data-placeholder="Email"></span>
            </div>
            <div className="txtb">
              <input autoComplete="off" type="password" onFocus={onFocus} onBlur={onBlur} />
              <span data-placeholder="Password"></span>
            </div>
            <div className="txtb">
              <input autoComplete="off" type="password" onFocus={onFocus} onBlur={onBlur} />
              <span data-placeholder="Confirm Password"></span>
            </div>
            <button
              onClick={(e: any) => {
                stopEvent(e);
                alert('注册成功');
              }}
            >
              注册
            </button>
          </form>
        </div>
        <div className="form-container sign-in-container">
          <form action="#">
            <h1>登录</h1>
            <div className="txtb">
              <input autoComplete="off" type="email" onFocus={onFocus} onBlur={onBlur} />
              <span data-placeholder="Email/Account"></span>
            </div>
            <div className="txtb">
              <input autoComplete="off" type="password" onFocus={onFocus} onBlur={onBlur} />
              <span data-placeholder="Password"></span>
            </div>
            <div className="toolbox">
              <label className="save-account-btn">
                <input
                  type="checkbox"
                  checked={isSaveAccount}
                  onChange={(e: any) => {
                    setIsSaveAccount(e.target.checked);
                    window.localStorage.setItem('isSaveAccount', e.target.checked);
                  }}
                />
                <span>记住账号</span>
              </label>
              <a
                href="#"
                onClick={(e: any) => {
                  stopEvent(e);
                  history.push('/404');
                }}
              >
                忘记密码？
              </a>
            </div>
            <button
              onClick={(e: any) => {
                stopEvent(e);
                history.push('/');
              }}
            >
              登录
            </button>
          </form>
        </div>

        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-left">
              <h1>已有账号？</h1>
              <p>请使用您的账号进行登录</p>
              <button
                className="ghost"
                id="signIn"
                onClick={(e: any) => {
                  stopEvent(e);
                  document.querySelector('#login-box').classList.remove('right-panel-active');
                }}
              >
                登录
              </button>
            </div>
            {HAS_REGISTER ? (
              <div className="overlay-panel overlay-right">
                <h1>没有账号?</h1>
                <p>立即注册，和我们一起开始旅程吧！</p>
                <button
                  className="ghost"
                  id="signUp"
                  onClick={(e: any) => {
                    stopEvent(e);
                    document.querySelector('#login-box').classList.add('right-panel-active');
                  }}
                >
                  注册
                </button>
              </div>
            ) : (
              <div className="overlay-panel overlay-right">
                <img width={200} src={logo} alt="logo" title="biugle" />
              </div>
            )}
          </div>
        </div>
      </div>
      <ul className="bg-squares">
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
      </ul>
    </div>
  );
};

export default Login;
