/*
 * @Author: HxB
 * @Date: 2024-01-08 11:32:38
 * @LastEditors: DoubleAm
 * @LastEditTime: 2024-01-08 17:19:48
 * @Description: useState Safe 自定义 hooks
 * @FilePath: \web_mods_base\main\_custom\hooks\useStates.ts
 */
import { useRef, useState, useEffect } from 'react';

type SetSafeState<S> = (newState: S) => void;

const useStates = <S>(initialState: S): [S, SetSafeState<S>] => {
  const isMountedRef = useRef(true);
  const [state, setState] = useState<S>(initialState);

  useEffect(() => {
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  const safeSetState: SetSafeState<S> = (newState) => {
    if (isMountedRef.current) {
      setState(newState);
    }
  };

  return [state, safeSetState];
};

export default useStates;
