/*
 * @Author: HxB
 * @Date: 2022-04-22 14:23:20
 * @LastEditors: DoubleAm
 * @LastEditTime: 2023-06-14 17:03:39
 * @Description: cordova 启动
 * @FilePath: \web_base\cordova\www\start.js
 */
/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

// Wait for the deviceready event before using any of Cordova's device APIs.
// See https://cordova.apache.org/docs/en/latest/cordova/events/events.html#deviceready

document.addEventListener(
  'backbutton',
  (e) => {
    window.$toast('禁止退出应用');
    e.preventDefault();
    e.stopPropagation();
    return false;
  },
  false,
);

document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {
  // Cordova is now initialized. Have fun!
  console.log('Running cordova-' + cordova.platformId + '@' + cordova.version);

  // StatusBar.show();

  // Auto start the app
  cordova.plugins.autoStart.enable();
  // Auto start the app service
  cordova.plugins.autoStart.enableService('WebBase');

  // Hide the splash screen
  navigator.splashscreen.hide();

  // toMainApp();
  checkUpdate();
}

function checkUpdate() {
  setTimeout(() => {
    const UPDATE_URL = 'https://cdn.biugle.cn/update.json';
    let httpRequest = new XMLHttpRequest();
    httpRequest.timeout = 10000;
    httpRequest.withCredentials = true; // 不校验证书
    httpRequest.open('GET', UPDATE_URL, true);
    httpRequest.send();

    httpRequest.onerror = function (error) {
      console.log(error);
      toMainApp();
    };

    httpRequest.ontimeout = function (error) {
      console.log(error, 'timeout');
      toMainApp();
    };

    httpRequest.onreadystatechange = async function () {
      if (httpRequest.readyState == 4 && httpRequest.status == 200) {
        try {
          const jsonText = httpRequest.responseText;
          // const responseDemo = {
          //   date: '2022-07-15',
          //   version: '1.0.1',
          //   remark: '1. 更新内容 A\n2. 更新内容 B',
          //   downloadUrl: 'https://cdn.biugle.cn/app-debug.apk',
          //   size: 30,
          // };
          const response = JSON.parse(jsonText);
          const remoteVersion = response.version;
          const installedVersion = (await ApkUpdater.getInstalledVersion()).version.name;
          if (checkVersion(remoteVersion, installedVersion) == 1) {
            // 弹窗可以自己去优化，默认只用原生 confirm 方便展示逻辑。
            let result = confirm(
              `发现新版本(V${response.version})，点击确定应用将在后台进行升级。\n[更新时间：${response.date}]-{文件大小：${response.size} M}\n${response.remark}\n`,
            );
            if (result) {
              window.$toast('正在后台下载更新，请稍后...');
              await ApkUpdater.download(response.downloadUrl);
              await ApkUpdater.install();
            } else {
              window.$toast('暂不升级');
            }
          } else {
            window.$toast('当前应用为最新版本，无需升级。');
          }
        } catch (error) {
          window.$toast('获取版本信息失败！');
          console.log(error);
        }
        toMainApp();
      } else {
        console.log(httpRequest, 'httpRequest finished');
        window.$toast('获取版本信息完成');
        toMainApp();
      }
    };
  }, 0);
}

function checkVersion(targetVersion, currentVersion, testStr = '-rc') {
  let targetVersionList = targetVersion.replace(testStr, '').split('.');
  let currentVersionList = currentVersion.replace(testStr, '').split('.');
  let length =
    targetVersionList.length > currentVersionList.length ? targetVersionList.length : currentVersionList.length;

  for (let i = 0; i < length; i++) {
    let targetVersionValue = i < targetVersionList.length ? targetVersionList[i] || 0 : 0;
    let currentVersionValue = i < currentVersionList.length ? currentVersionList[i] || 0 : 0;

    if (targetVersionValue > currentVersionValue) {
      return 1;
    }

    if (targetVersionValue < currentVersionValue) {
      return -1;
    }
  }

  return 0;
}

function toMainApp() {
  // StatusBar.hide(); // 是否隐藏顶部状态栏
  setTimeout(() => {
    window.location.href = 'dist/index.html';
  }, 1000);
}

window.$toast = function (message, duration = 2000, position = 'center') {
  window.plugins.toast.showWithOptions(
    {
      message: message,
      duration: duration, // ms
      position: position, // top | bottom | center
      // addPixelsY: -40, // (optional) added a negative value to move it up a bit (default 0)
      // data: { foo: 'bar' }, // (optional) pass in a JSON object here (it will be sent back in the success callback below)
      // styling: {
      //   opacity: 0.75, // 0.0 (transparent) to 1.0 (opaque). Default 0.8
      //   backgroundColor: '#FF0000', // make sure you use #RRGGBB. Default #333333
      //   textColor: '#FFFF00', // Ditto. Default #FFFFFF
      //   textSize: 20.5, // Default is approx. 13.
      //   cornerRadius: 16, // minimum is 0 (square). iOS default 20, Android default 100
      //   horizontalPadding: 20, // iOS default 16, Android default 50
      //   verticalPadding: 16 // iOS default 12, Android default 30
      // }
    },
    // implement the success callback
    function (result) {
      if (result && result.event) {
        console.log('The toast was tapped or got hidden, see the value of result.event!');
        if (result.event === 'hide') {
          console.log('The toast has been shown', result);
        }
      }
    },
    // implement the error callback
    function (error) {
      console.error(error);
    },
  );
};
