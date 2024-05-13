/*
 * @Author: HxB
 * @Date: 2024-05-09 14:18:51
 * @LastEditors: DoubleAm
 * @LastEditTime: 2024-05-09 14:18:55
 * @Description: useForceUpdate 自定义 hooks
 * @FilePath: \web_base\src\_custom\hooks\useForceUpdate.ts
 */
import { useReducer } from 'react';

export const useForceUpdate = () => {
  const [_, forceUpdate] = useReducer((x) => x + 1, 0);
  return forceUpdate;
};
