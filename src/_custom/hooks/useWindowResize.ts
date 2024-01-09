/*
 * @Author: HxB
 * @Date: 2024-01-08 17:59:39
 * @LastEditors: DoubleAm
 * @LastEditTime: 2024-01-08 18:10:52
 * @Description: useWindowResize
 * @FilePath: \web_mods_base\main\_custom\hooks\useWindowResize.ts
 */
import { useEffect, useState, useCallback } from 'react';

const useWindowResize = (callback?: (size: { width: number; height: number }) => void) => {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const handleResize = useCallback(() => {
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });
    callback &&
      callback({
        width: window.innerWidth,
        height: window.innerHeight,
      });
  }, [callback]);

  useEffect(() => {
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [handleResize]);

  return windowSize;
};

export default useWindowResize;
