/*
 * @Author: HxB
 * @Date: 2023-04-27 14:42:28
 * @LastEditors: DoubleAm
 * @LastEditTime: 2023-04-27 14:43:29
 * @Description: useUnmounted 自定义 hooks
 * @FilePath: \web_base\src\_custom\hooks\useUnmount.ts
 */
import { useEffect, useRef } from 'react';

const useUnmounted = (fn: () => void) => {
  const ref = useRef(fn);
  ref.current = fn;

  useEffect(
    () => () => {
      fn?.();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );
};

export default useUnmounted;
