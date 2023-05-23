/*
 * @Author: HxB
 * @Date: 2023-04-27 15:04:26
 * @LastEditors: DoubleAm
 * @LastEditTime: 2023-05-23 17:34:12
 * @Description: 主程序状态总配置
 * @FilePath: \web_base\src\store\main_store.ts
 */
import loading from '@store/states/loading';

const MainReducers = {
  ...loading.reducers,
};

const MainSelectors = {
  ...loading.selectors,
};

const MainActions = {
  ...loading.actions,
};

export default {
  reducers: MainReducers,
  selectors: MainSelectors,
  actions: MainActions,
};
