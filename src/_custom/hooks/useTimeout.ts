/*
 * @Author: HxB
 * @Date: 2023-04-27 14:42:28
 * @LastEditors: DoubleAm
 * @LastEditTime: 2023-04-27 14:43:22
 * @Description: useTimeout 自定义 hooks
 * @FilePath: \web_base\src\_custom\hooks\useTimeout.ts
 */
import { useEffect } from 'react';
import useLatest from './useLatest';

const useTimeout = (fn: () => void, delay?: number): void => {
  const fnRef = useLatest(fn);

  useEffect(() => {
    if (!delay || delay < 0) return;

    const timer = setTimeout(() => {
      fnRef.current();
    }, delay);

    return () => {
      clearTimeout(timer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [delay]);
};

export default useTimeout;
