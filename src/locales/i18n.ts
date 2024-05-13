/*
 * @Author: HxB
 * @Date: 2024-05-13 15:08:38
 * @LastEditors: DoubleAm
 * @LastEditTime: 2024-05-13 16:46:59
 * @Description: i18n 国际化支持-需自定义如何兼容切换语言后页面刷新
 * @FilePath: \web_base\src\locales\i18n.ts
 */

import { i18n } from 'js-xxx';
import store, { actions } from '@store/all';
import zhCN from './zh-CN.json';
import enUs from './en-US.json';

export const i18nReact = new i18n({
  defaultLang: 'zh-CN',
  resources: {
    'zh-CN': {
      key: 'zh-CN',
      desc: '简体中文',
      translation: zhCN,
    },
    'en-US': {
      key: 'en-US',
      desc: 'English',
      translation: enUs,
    },
  },
});

export const setLang = (lang) =>
  i18nReact.setLang(lang, () => {
    store.dispatch(actions.loading.setLang(lang));
  });

export const t$ = (key, obj?) => i18nReact.t$(key, obj);
