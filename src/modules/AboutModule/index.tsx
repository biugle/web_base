/*
 * @Author: HxB
 * @Date: 2023-04-27 15:16:18
 * @LastEditors: DoubleAm
 * @LastEditTime: 2023-05-23 18:32:02
 * @Description: AboutModule
 * @FilePath: \web_base\src\modules\AboutModule\index.tsx
 */
import React from 'react';
import './styles.less';
import AppRouter from '@router/AppRouter';
import routes from './routes';

type AboutModuleProps = {
  title: string;
};

const AboutModule: React.FC<AboutModuleProps> = (props) => {
  return (
    <div data-component="AboutModule">
      <div
        style={{
          width: 500,
          height: 500,
          border: '1px solid red',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <AppRouter routes={routes} basename="/about"></AppRouter>
      </div>
    </div>
  );
};

export default AboutModule;
