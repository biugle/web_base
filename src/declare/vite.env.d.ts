/*
 * @Author: HxB
 * @Date: 2023-04-27 14:29:21
 * @LastEditors: DoubleAm
 * @LastEditTime: 2023-04-28 18:15:52
 * @Description: 特殊声明文件
 * @FilePath: \web_base\declare\vite.env.d.ts
 */

// eslint-disable-next-line spaced-comment
/// <reference types="vite/client" />

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

// 环境变量声明配置
interface ImportMetaEnv {
  readonly VITE_REQUEST_BASE_URL: string;
}

/*
 * vite 自定义全局变量
 */
// eslint-disable-next-line no-undef
type ProcessEnv = typeof process.env;
declare const _MODE_: string;
declare const processEnv: ProcessEnv;
declare const module: any;
