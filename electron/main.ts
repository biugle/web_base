/*
 * @Author: HxB
 * @Date: 2022-08-15 15:42:27
 * @LastEditors: DoubleAm
 * @LastEditTime: 2023-05-31 14:33:57
 * @Description: electron 打包与启动文件主程序
 * @FilePath: \web_base\electron\main.ts
 */
import * as path from 'path';
import { app, BrowserWindow, globalShortcut } from 'electron';
import { initEvents } from './events';

// eslint-disable-next-line no-undef
const mode = process.argv[2]; // process.env.NODE_ENV

// const baseDir = path.dirname(process.execPath);
// const baseRenderDir = path.join(baseDir, 'resources/app');
// const bgPng = path.join(baseRenderDir, 'source', 'bg.png');

let mainWindow: BrowserWindow;

const createWindow = () => {
  mainWindow = new BrowserWindow({
    center: true,
    autoHideMenuBar: true,
    alwaysOnTop: false,
    resizable: true,
    // fullscreen: true, // 默认全屏
    // show: false, // is show
    // frame: false, // 无边框
    width: 1280,
    height: 720,
    webPreferences: {
      webSecurity: false,
      // eslint-disable-next-line no-undef
      preload: path.join(__dirname, './preload.js'),
      nodeIntegration: true, // 解决无法使用 require 加载的 bug
      // contextIsolation: false, // preload 单独的运行环境
    },
  });
  console.log(mode);
  if (!app.isPackaged && !mode.includes('prod')) {
    // eslint-disable-next-line no-undef
    mainWindow.loadURL(process.env.VITE_DEV_SERVER_URL ?? 'http://localhost:1998/');
    mainWindow.webContents.openDevTools();
  } else {
    mainWindow.loadFile('dist/index.html').catch(() => null);
  }

  // 关闭 window 时触发下列事件
  mainWindow.on('closed', function () {
    // @ts-ignore
    mainWindow = null;
  });

  // mainWindow.show(); // control mainWindow show
  initEvents(mainWindow);
};

app.commandLine.appendSwitch('disable-features', 'OutOfBlinkCors'); // 兼容各个版本关闭跨域(上线时删除此配置)

// 绑定 ready 方法，当 electron 应用创建成功时，创建一个窗口。
app.whenReady().then(() => {
  globalShortcut.register('CommandOrControl+Alt+X', () => {
    console.log('DEV TOOLS');
    mainWindow.webContents.isDevToolsOpened()
      ? mainWindow.webContents.closeDevTools()
      : mainWindow.webContents.openDevTools();
  });
  globalShortcut.register('CommandOrControl+Shift+I', () => {
    console.log('CLOSE DEV TOOLS 关闭默认控制台打开事件');
  });

  createWindow();

  if (!mainWindow.isFocused()) {
    mainWindow.focus();
  }

  mainWindow.setMenuBarVisibility(false); // 设置菜单栏不可见
  mainWindow.menuBarVisible = false;
  mainWindow.setAutoHideMenuBar(false);

  // eslint-disable-next-line no-undef
  if (process.platform != 'darwin') {
    mainWindow.setIcon(app.isPackaged ? 'dist/logos/icon.ico' : 'public/logos/icon.ico');
  }

  // 绑定 activate 方法，当 electron 应用激活时，创建一个窗口。这是为了点击关闭按钮之后从 dock 栏打开。
  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
    // macOS 中点击 Dock 图标时没有已打开的其余应用窗口时，则通常在应用中重建一个窗口。
    if (mainWindow === null) {
      createWindow();
    }
  });
});

// 绑定关闭方法，当 electron 应用关闭时，退出 electron 。 macos 系统因为具有 dock 栏机制，可选择不退出。
app.on('window-all-closed', function () {
  // macOS 中除非用户按下 `Cmd + Q` 显式退出，否则应用与菜单栏始终处于活动状态。
  // eslint-disable-next-line no-undef
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

const gotTheLock = app.requestSingleInstanceLock();
if (!gotTheLock) {
  app.quit();
} else {
  app.on('second-instance', (event, commandLine, workingDirectory) => {
    // 当运行第二个实例时，将会聚焦到 mainWindow 这个窗口。
    if (mainWindow) {
      if (mainWindow.isMinimized()) mainWindow.restore();
      mainWindow.focus();
      mainWindow.show();
    }
  });
}
