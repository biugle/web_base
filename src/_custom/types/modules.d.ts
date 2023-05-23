/*
 * @Author: HxB
 * @Date: 2023-04-27 15:27:08
 * @LastEditors: DoubleAm
 * @LastEditTime: 2023-05-23 17:26:07
 * @Description: 模块声明文件
 * @FilePath: \web_base\src\_custom\types\modules.d.ts
 */

export interface ModuleConfig {
  name: string;
  path: string;
  component?: any;
  basename?: string;
  defaultRoute?: string;
  roles?: string[] | string; // default: undefined
  meta?: {
    title?: string; // default: name
    description?: string; // default: name
    icon?: string; // default: AppstoreTwoTone
    keepAlive?: boolean; // default: false
    hidden?: boolean; // default: false
  };
  [key: string]: any;
}
