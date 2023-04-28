/*
 * @Author: HxB
 * @Date: 2023-04-27 15:04:26
 * @LastEditors: DoubleAm
 * @LastEditTime: 2023-04-27 15:04:58
 * @Description: redux loading module
 * @FilePath: \web_base\src\redux\states\loading.ts
 */
import { createSlice } from '@reduxjs/toolkit';

const loadingSlice = createSlice({
  name: 'loading',
  initialState: {
    isLoading: false,
    msg: '',
  },
  reducers: {
    startLoading(state, { payload }) {
      console.log('startLoading', payload);
      state.isLoading = true;
      state.msg = payload;
    },
    stopLoading(state) {
      console.log('stopLoading');
      state.isLoading = false;
      state.msg = '';
    },
  },
});

const LoadingReducers = loadingSlice.reducer; // store state
const LoadingActions = loadingSlice.actions; // set state
const LoadingSelectors = (state) => state.loading; // get state

export default {
  reducers: {
    loading: LoadingReducers,
  },
  actions: {
    loading: LoadingActions,
  },
  selectors: {
    loading: LoadingSelectors,
  },
};
