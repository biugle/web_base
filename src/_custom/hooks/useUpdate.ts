/*
 * @Author: HxB
 * @Date: 2023-04-27 14:42:28
 * @LastEditors: DoubleAm
 * @LastEditTime: 2023-04-27 14:44:08
 * @Description: useUpdate 自定义 hooks
 * @FilePath: \web_base\src\_custom\hooks\useUpdate.ts
 */
import { useCallback, useState } from 'react';

const useUpdate = () => {
  const [, setState] = useState({});

  return useCallback(() => setState({}), []);
};

export default useUpdate;
