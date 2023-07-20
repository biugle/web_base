/*
 * @Author: HxB
 * @Date: 2023-07-19 15:32:21
 * @LastEditors: DoubleAm
 * @LastEditTime: 2023-07-20 15:39:18
 * @Description: 登录页面响应式（阿彪费劲心思重写出来的）
 * @FilePath: \web_base\src\pages\LoginRwd\index.tsx
 */
import React, { useEffect } from 'react';
import './style.less';

const LoginRwd = () => {
  // 滑动切换动画
  useEffect(() => {
    const loginBtn: any = document.getElementById('login-btn');
    const signUpBtn: any = document.getElementById('sign-up-btn');
    const loginBox = document.querySelector('.login-box');
    const signUpBox = document.querySelector('.sign-up-box');
    loginBtn?.addEventListener('click', () => {
      loginBox.classList.remove('slide-hidden');
      signUpBox.classList.add('slide-hidden');
    });

    signUpBtn?.addEventListener('click', () => {
      signUpBox.classList.remove('slide-hidden');
      loginBox.classList.add('slide-hidden');
    });
  }, []);

  return (
    <div data-component="LoginRwd" data-theme="dark">
      {/* data-theme="dark" */}
      <div className="form-structure">
        <div className="login-box">
          <h2 className="form-title" id="login-btn">
            登录
          </h2>
          <div className="form-holder">
            <div className="input-area">
              <input autoComplete="off" type="text" className="input" placeholder="账号" />
            </div>
            <div className="input-area">
              <input autoComplete="off" type="password" className="input" placeholder="密码" />
            </div>
          </div>
          <div className="submit-btn">登录</div>
        </div>
        <div className="sign-up-box slide-hidden">
          <div className="center">
            <h2 className="form-title" id="sign-up-btn">
              注册
            </h2>
            <div className="form-holder">
              <div className="input-area">
                <input autoComplete="off" type="email" className="input" placeholder="邮箱" />
              </div>
              <div className="input-area">
                <input autoComplete="off" type="text" className="input" placeholder="账号" />
              </div>
              <div className="input-area">
                <input autoComplete="off" type="password" className="input" placeholder="密码" />
              </div>
            </div>
            <div className="submit-btn">注册</div>
          </div>
          <div className="bg-cubes">
            <div className="cube"></div>
            <div className="cube"></div>
            <div className="cube"></div>
            <div className="cube"></div>
            <div className="cube"></div>
            <div className="cube"></div>
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
    </div>
  );
};

export default LoginRwd;
