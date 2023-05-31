/*
 * @Author: HxB
 * @Date: 2022-08-18 10:34:52
 * @LastEditors: DoubleAm
 * @LastEditTime: 2023-05-31 15:02:09
 * @Description: preload
 * @FilePath: \web_base\electron\preload.ts
 */
import { contextBridge, ipcRenderer } from 'electron';
import pkg from '../package.json';
import { sendData } from './utils';

window.addEventListener('DOMContentLoaded', () => {
  ipcRenderer.send('checkUpdate');
  sendData('test', ['hello', 'world']);
  console.log('HTML DOMContentLoaded.');
});

contextBridge.exposeInMainWorld('xIpc', {
  send: (channel, ...args) => {
    return ipcRenderer.send(channel, ...args);
  },
  on: (channel, listener) => {
    // listener(event, ...args)
    ipcRenderer.on(channel, listener);
  },
  exit: () => {
    console.log('destroy');
    ipcRenderer.send('destroy');
  },
  getVersion: () => pkg['version'],
  isMinimized: () => ipcRenderer.sendSync('getMainWindowStatus', 'min'),
  isMaximized: () => ipcRenderer.sendSync('getMainWindowStatus', 'max'),
  changeMainWindowStatus: () => ipcRenderer.send('changeMainWindowStatus'),
  toggleDevTools: () => ipcRenderer.send('toggleDevTools'),
});
