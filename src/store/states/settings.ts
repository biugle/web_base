/*
 * @Author: HxB
 * @Date: 2023-04-27 15:04:26
 * @LastEditors: DoubleAm
 * @LastEditTime: 2024-06-25 18:19:40
 * @Description: redux settings module
 * @FilePath: \web_base\src\store\states\settings.ts
 */
import { createSlice } from '@reduxjs/toolkit';
import { i18nReact } from '@/locales/i18n';

const settingsSlice = createSlice({
  name: 'settings',
  initialState: {
    lang: i18nReact.getLang(),
  },
  reducers: {
    setLang(state, { payload }) {
      console.log('setLang', payload);
      state.lang = payload;
    },
  },
});

const SettingsReducers = settingsSlice.reducer; // store state
const SettingsActions = settingsSlice.actions; // set state
const SettingsSelectors = (state) => state.settings; // get state

export default {
  reducers: {
    settings: SettingsReducers,
  },
  actions: {
    settings: SettingsActions,
  },
  selectors: {
    settings: SettingsSelectors,
  },
};
