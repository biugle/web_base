/*
 * @Author: HxB
 * @Date: 2023-05-31 10:30:54
 * @LastEditors: DoubleAm
 * @LastEditTime: 2023-05-31 14:34:43
 * @Description: 通用函数
 * @FilePath: \web_base\electron\utils.ts
 */
import XCall from 'js-xcall';

export function sendData(...args) {
  console.log('sendData------', ...args);
  XCall.existEvent('sendData') && XCall.dispatch('sendData', ...args);
}

export function setProgress(percent: number) {
  console.log('setProgress------', percent);
  XCall.existEvent('setProgress') && XCall.dispatch('setProgress', percent);
}

export function logger(...args) {
  console.log('logger------', ...args);
  XCall.existEvent('logger') && XCall.dispatch('logger', ...args);
}

export function toggleDevTools() {
  XCall.existEvent('toggleDevTools') && XCall.dispatch('toggleDevTools');
}

export function sendEvent2Web(eventKey: string, ...args) {
  XCall.existEvent('sendEvent2Web') && XCall.dispatch('sendEvent2Web', eventKey, ...args);
}

export function sendJsExecute(jsStr: string) {
  XCall.existEvent('sendJsExecute') && XCall.dispatch('sendJsExecute', jsStr);
}
