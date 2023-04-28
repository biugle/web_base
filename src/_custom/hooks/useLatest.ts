/*
 * @Author: HxB
 * @Date: 2023-04-27 14:42:28
 * @LastEditors: DoubleAm
 * @LastEditTime: 2023-05-08 16:26:44
 * @Description: useLatest 自定义 hooks
 * @FilePath: \web_base\src\_custom\hooks\useLatest.ts
 */
import { useRef } from 'react';

const useLatest = <T>(value: T) => {
  const ref = useRef(value);
  ref.current = value;

  return ref;
};

export default useLatest;
