/*
 * @Author: HxB
 * @Date: 2023-05-31 10:49:22
 * @LastEditors: DoubleAm
 * @LastEditTime: 2023-05-31 14:56:59
 * @Description: 初始化事件
 * @FilePath: \web_base\electron\events.ts
 */
import { BrowserWindow, ipcMain } from 'electron';
import XCall from 'js-xcall';
import { checkUpdate } from './updater';

export const initEvents = (mainWindow: BrowserWindow) => {
  if (!mainWindow) {
    console.log('未获取到程序信息', mainWindow);
    return;
  }

  function isMinimized(): boolean {
    if (!mainWindow) {
      return false;
    }
    return mainWindow.isMinimized();
  }

  function isMaximized(): boolean {
    if (!mainWindow) {
      return false;
    }
    return mainWindow.isMaximized();
  }

  function toggleDevTools() {
    mainWindow.webContents.isDevToolsOpened()
      ? mainWindow.webContents.closeDevTools()
      : mainWindow.webContents.openDevTools();
  }

  /**
   * Main Events
   */
  // 检查更新
  ipcMain.on('checkUpdate', () => {
    checkUpdate();
  });

  // 获取窗口状态
  ipcMain.on('getMainWindowStatus', (event, type) => {
    if (type == 'min') {
      event.returnValue = isMinimized();
    }
    if (type == 'max') {
      event.returnValue = isMaximized();
    }
  });

  // 改变窗口状态
  ipcMain.on('changeMainWindowStatus', (event) => {
    const status: boolean = isMaximized();
    if (status) {
      mainWindow.unmaximize();
    } else {
      mainWindow.maximize();
    }
    event.sender.send('mainWindowStatusChange', !status);
  });

  // 控制台开关
  ipcMain.on('toggleDevTools', () => {
    toggleDevTools();
  });

  // 设置进度条
  ipcMain.on('setProgress', (event, percent) => {
    mainWindow.setProgressBar(percent / 100);
  });

  // 发送数据
  ipcMain.on('sendData', (event, ...args) => {
    mainWindow.webContents.send('sendData', ...args);
  });

  /**
   * XCall Events
   */
  // 控制台开关
  XCall.addCallBack('toggleDevTools', () => {
    console.log('toggleDevTools');
    toggleDevTools();
  });
  // 设置进度条
  XCall.addCallBack('setProgress', (percent) => {
    mainWindow.setProgressBar(percent / 100);
  });
  // 向 web 发送数据
  XCall.addCallBack('sendData', (...args) => {
    mainWindow.webContents.send('sendData', ...args);
  });
  // 向 web 控制台打印日志
  XCall.addCallBack('logger', (...args) => {
    mainWindow.webContents.executeJavaScript(
      `console.log('%c日志[${new Date().toLocaleString()}]===>', 'color:#1890FF;font-size:10px;margin-right:5px', ...JSON.parse('${JSON.stringify(
        args,
      )}'));`,
    );
  });
  // 向 web 控制台触发事件
  XCall.addCallBack('sendEvent2Web', (eventKey, ...args) => {
    mainWindow.webContents.send(eventKey, ...args);
  });
  // 执行一个 js
  XCall.addCallBack('sendJsExecute', (jsStr: string) => {
    mainWindow.webContents.executeJavaScript(jsStr);
  });
};
