/*
 * @Author: HxB
 * @Date: 2023-04-27 15:04:26
 * @LastEditors: DoubleAm
 * @LastEditTime: 2023-05-23 17:46:40
 * @Description: 主程序状态总配置
 * @FilePath: \web_base\src\store\modules_store.ts
 */
import AboutModuleStates from '@modules/AboutModule/states';

const ModulesReducers = {
  ...AboutModuleStates.reducers,
};

const ModulesSelectors = {
  ...AboutModuleStates.selectors,
};

const ModulesActions = {
  ...AboutModuleStates.actions,
};

export default {
  reducers: ModulesReducers,
  selectors: ModulesSelectors,
  actions: ModulesActions,
};
