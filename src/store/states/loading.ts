/*
 * @Author: HxB
 * @Date: 2023-04-27 15:04:26
 * @LastEditors: DoubleAm
 * @LastEditTime: 2024-05-13 16:47:49
 * @Description: redux loading module
 * @FilePath: \web_base\src\store\states\loading.ts
 */
import { createSlice } from '@reduxjs/toolkit';
import { i18nReact } from '@/locales/i18n';

const loadingSlice = createSlice({
  name: 'loading',
  initialState: {
    isLoading: false,
    lang: i18nReact.getLang(),
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
    setLang(state, { payload }) {
      console.log('setLang', payload);
      state.lang = payload;
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
