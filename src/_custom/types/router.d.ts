/*
 * @Author: HxB
 * @Date: 2023-04-27 15:27:08
 * @LastEditors: DoubleAm
 * @LastEditTime: 2023-05-23 15:18:17
 * @Description: 路由声明文件
 * @FilePath: \web_base\src\_custom\types\router.d.ts
 */
export interface RouteConfig {
  // 路由配置自自定义结构
  name: string;
  path: string;
  redirect?: string;
  defaultRoute?: string;
  exact?: boolean;
  component?: any;
  routes?: RouteConfig[]; // 子路由
  roles?: string[] | string; // default: undefined
  meta?: {
    title?: string; // default: name
    description?: string; // default: name
    icon?: string; // default: parent(FolderOpenFilled)-child(UnorderedListOutlined)
    keepAlive?: boolean; // default: false
    hidden?: boolean; // default: false
  };
  [key: string]: any;
}
