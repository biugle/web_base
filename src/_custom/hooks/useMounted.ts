/*
 * @Author: HxB
 * @Date: 2023-04-27 14:42:28
 * @LastEditors: DoubleAm
 * @LastEditTime: 2023-05-08 16:28:25
 * @Description: useMounted 自定义 hooks
 * @FilePath: \web_base\src\_custom\hooks\useMounted.ts
 */
import { useEffect } from 'react';

const useMounted = (fn: () => void) => {
  useEffect(() => {
    fn?.();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};

export default useMounted;
