/*
 * @Author: HxB
 * @Date: 2023-04-27 15:16:18
 * @LastEditors: DoubleAm
 * @LastEditTime: 2023-05-23 17:22:37
 * @Description: SettingsModule
 * @FilePath: \web_base\src\modules\SettingsModule\index.tsx
 */
import React from 'react';
import './styles.less';

type SettingsModuleProps = {
  title: string;
};

const SettingsModule: React.FC<SettingsModuleProps> = (props) => {
  return <div data-component="SettingsModule">SettingsModule</div>;
};

export default SettingsModule;
