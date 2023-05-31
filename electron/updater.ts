/*
 * @Author: HxB
 * @Date: 2023-05-26 17:26:07
 * @LastEditors: DoubleAm
 * @LastEditTime: 2023-05-31 15:12:59
 * @Description: 自动更新器
 * @FilePath: \web_base\electron\updater.ts
 */
import { autoUpdater } from 'electron-updater';
import { app, dialog } from 'electron';
import { formatBytes } from 'js-xxx';
import pkg from '../package.json';
import { logger, setProgress } from './utils';

autoUpdater.setFeedURL({
  provider: 'generic',
  url: 'https://biugle.com/updates/latest/',
  // 发布时在此目录下放置打包生产的 exe 以及 latest.yml 即可，也可以使用 github 等管理(需改变配置)。
});

// Object.defineProperty(app, 'isPackaged', {
//   get() {
//     return true;
//   },
// });

autoUpdater.autoDownload = false; // 禁用自动下载更新
autoUpdater.autoRunAppAfterInstall = true;
autoUpdater.forceDevUpdateConfig = false;

// 监听检查更新事件
autoUpdater.on('checking-for-update', () => {
  logger('检查更新中...');
});

// 监听发现可用更新事件
autoUpdater.on('update-available', (info) => {
  logger('检查到更新', info);

  // 询问选择是否更新
  dialog
    .showMessageBox({
      type: 'info',
      title: '更新提示',
      message: `当前版本-(${pkg.version})，检查到新的更新-(${info.version})，是否下载-(${formatBytes(
        info?.files?.[0]?.size ?? 0,
      )})？`,
      buttons: ['下载', '取消'],
    })
    .then((result) => {
      if (result.response === 0) {
        logger('下载更新');
        // 创建进度条
        setProgress(0);
        // 下载更新
        autoUpdater.downloadUpdate();
      } else {
        logger('暂不下载');
      }
    });
});

// 监听下载更新进度事件
autoUpdater.on('download-progress', (progress) => {
  logger(`Download Progress---(${progress.percent}%)`);

  // 更新进度条
  setProgress(progress.percent);
});

// 已经是新版本
autoUpdater.on('update-not-available', () => {
  logger('当前版本为最新版本');
});

// 监听下载更新完成事件
autoUpdater.on('update-downloaded', () => {
  logger('下载完成');

  // 关闭进度条
  setProgress(-1);

  // 提示用户安装更新
  dialog
    .showMessageBox({
      type: 'question',
      title: '安装提示',
      message: '更新包已经下载完成，是否安装？',
      buttons: ['安装', '取消'],
    })
    .then((result) => {
      if (result.response === 0) {
        logger('安装');
        autoUpdater.quitAndInstall(); // 安装更新
      } else {
        logger('取消安装');
      }
    });
});

// 监听检查更新错误事件
autoUpdater.on('error', (err) => {
  logger(`更新出错---${err.message}`, err);
});

// 检查更新
export function checkUpdate(): void {
  autoUpdater.checkForUpdates();
  // autoUpdater.checkForUpdatesAndNotify();
}
