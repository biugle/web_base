/*
 * @Author: HxB
 * @Date: 2023-04-27 15:04:26
 * @LastEditors: DoubleAm
 * @LastEditTime: 2024-06-25 18:21:39
 * @Description: 主程序状态总配置
 * @FilePath: \web_base\src\store\main_store.ts
 */
import loading from '@/store/states/loading';
import settings from '@/store/states/settings';

const MainReducers = {
  ...loading.reducers,
  ...settings.reducers,
};

const MainSelectors = {
  ...loading.selectors,
  ...settings.selectors,
};

const MainActions = {
  ...loading.actions,
  ...settings.actions,
};

export default {
  reducers: MainReducers,
  selectors: MainSelectors,
  actions: MainActions,
};
