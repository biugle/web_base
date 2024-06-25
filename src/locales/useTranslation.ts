/*
 * @Author: HxB
 * @Date: 2024-05-27 09:39:52
 * @LastEditors: DoubleAm
 * @LastEditTime: 2024-05-27 09:42:55
 * @Description: useTranslation
 * @FilePath: \web_base\src\locales\useTranslation.ts
 */
import { useSelector } from 'react-redux';
import { selectors } from '@store/all';
import { i18nReact, setLang } from './i18n';

export const useTranslation = () => {
  const { lang } = useSelector(selectors.settings);

  return { t$: (key, obj?: any, newLang?: string) => i18nReact.t$(key, obj, newLang ?? lang), setLang };
};
