/*
 * @Author: HxB
 * @Date: 2023-04-27 15:04:26
 * @LastEditors: DoubleAm
 * @LastEditTime: 2023-05-23 18:07:49
 * @Description: 系统信息
 * @FilePath: \web_base\src\modules\AboutModule\states\data\sysInfo.ts
 */
import { createSlice } from '@reduxjs/toolkit';

const sysInfoSlice = createSlice({
  name: 'sysInfo',
  initialState: {
    version: 'test',
    author: 'hxb',
    email: '100570694@qq.com',
  },
  reducers: {
    setSysInfo(state, { payload }) {
      console.log('setSysInfo', payload);
      for (const key in payload) {
        state[key] = payload[key];
      }
    },
  },
});

const AllReducers = sysInfoSlice.reducer; // store state
const AllActions = sysInfoSlice.actions; // set state
const AllSelectors = (state) => state.sysInfo; // get state

export default {
  reducers: {
    sysInfo: AllReducers,
  },
  actions: {
    sysInfo: AllActions,
  },
  selectors: {
    sysInfo: AllSelectors,
  },
};
