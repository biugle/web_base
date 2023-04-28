/*
 * @Author: HxB
 * @Date: 2023-04-27 15:25:41
 * @LastEditors: DoubleAm
 * @LastEditTime: 2023-04-27 15:25:41
 * @Description: service demo
 * @FilePath: \web_base\src\services\demo.ts
 */
import XHttp from '@tools/xhttp';

export function login() {
  return XHttp.post('/api/login', { account: 'test', password: '123456' });
}
