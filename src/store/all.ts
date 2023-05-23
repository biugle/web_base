/*
 * @Author: HxB
 * @Date: 2023-04-27 15:04:26
 * @LastEditors: DoubleAm
 * @LastEditTime: 2023-04-27 15:04:02
 * @Description: redux 状态总管理
 * @FilePath: \web_base\src\redux\index.ts
 */
import { configureStore } from '@reduxjs/toolkit';
import MainRedux from './main_store';
import ModulesRedux from './modules_store';

export default configureStore({
  reducer: {
    ...MainRedux.reducers,
    ...ModulesRedux.reducers,
  },
});

export const selectors = {
  ...MainRedux.selectors,
  ...ModulesRedux.selectors,
};

export const actions = {
  ...MainRedux.actions,
  ...ModulesRedux.actions,
};
