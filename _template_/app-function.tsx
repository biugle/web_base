/*
 * @Author: HxB
 * @Date: 2023-04-27 15:16:18
 * @LastEditors: DoubleAm
 * @LastEditTime: 2023-05-25 18:04:18
 * @Description: function 模板
 * @FilePath: \web_base\_template_\app-function.tsx
 */
import React, { useEffect, useState } from 'react';

type AppTempProps = {
  title: string;
};

const AppTemp: React.FC<AppTempProps> = (props) => {
  const [data, setData] = useState<any>({});

  useEffect(() => {
    // do something
    setData({ test: 'test' });
  }, []);

  return (
    <div data-component="AppTemp">
      {props.title}
      {data.test}
    </div>
  );
};

export default AppTemp;
