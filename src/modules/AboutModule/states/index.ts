/*
 * @Author: HxB
 * @Date: 2023-05-23 17:35:55
 * @LastEditors: DoubleAm
 * @LastEditTime: 2023-05-23 17:48:42
 * @Description: 系统介绍模块状态管理
 * @FilePath: \web_base\src\modules\AboutModule\states\index.ts
 */
import sysInfo from './data/sysInfo';

const reducers = {
  ...sysInfo.reducers,
};

const selectors = {
  ...sysInfo.selectors,
};

const actions = {
  ...sysInfo.actions,
};

export default {
  reducers: reducers,
  selectors: selectors,
  actions: actions,
};
