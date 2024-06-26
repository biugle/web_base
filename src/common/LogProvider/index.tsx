/*
 * @Author: HxB
 * @Date: 2024-04-30 14:42:28
 * @LastEditors: DoubleAm
 * @LastEditTime: 2024-05-13 10:59:28
 * @Description: LogProvider
 * @FilePath: \web_base\src\components\LogProvider\index.tsx
 */
import React, { useEffect } from 'react';
import { useLogClick } from '@/_custom/hooks/useLogClick';
import { useLogChange } from '@/_custom/hooks/useLogChange';

export const LogProvider = (props: { callback?: any; children: any }) => {
  const clickLogInfo = useLogClick(props.callback);
  useLogChange(props.callback);

  useEffect(() => {
    console.log({ clickLogInfo });
  }, [clickLogInfo]);

  return <>{props.children}</>;
};
