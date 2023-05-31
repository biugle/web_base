/*
 * @Author: HxB
 * @Date: 2023-04-27 15:04:26
 * @LastEditors: DoubleAm
 * @LastEditTime: 2023-05-25 18:04:38
 * @Description: redux 模板
 * @FilePath: \web_base\_template_\app-state.ts
 */
import { createSlice } from '@reduxjs/toolkit';

const _stateName_Slice = createSlice({
  name: '_stateName_',
  initialState: {
    data: 'test',
  },
  reducers: {
    setMyStateData(state, { payload }) {
      console.log('setMyStateData', payload);
      for (const key in payload) {
        state[key] = payload[key];
      }
    },
  },
});

const AllReducers = _stateName_Slice.reducer; // store state
const AllActions = _stateName_Slice.actions; // set state
const AllSelectors = (state) => state._stateName_; // get state

export default {
  reducers: {
    _stateName_: AllReducers,
  },
  actions: {
    _stateName_: AllActions,
  },
  selectors: {
    _stateName_: AllSelectors,
  },
};
