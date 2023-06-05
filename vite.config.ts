/*
 * @Author: HxB
 * @Date: 2023-04-27 10:08:57
 * @LastEditors: DoubleAm
 * @LastEditTime: 2023-06-05 17:06:38
 * @Description: vite 配置文件
 * @FilePath: \web_base\vite.config.ts
 */

import * as path from 'path';
import { defineConfig } from 'vite';
import reactPlugin from '@vitejs/plugin-react';
import eslint from 'vite-plugin-eslint';
import electronPlugin from 'vite-plugin-electron';

// 若需设置 process.env 的值可以通过 set 关键字传入 vite 中

// eslint-disable-next-line no-undef
const getPath = (_path) => path.resolve(__dirname, _path);

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  console.table({ command, mode });

  const pluginsConfig = [
    eslint({
      fix: true,
    }),
    reactPlugin(),
  ];

  if (mode === 'electron') {
    pluginsConfig.push(
      electronPlugin([
        {
          entry: [
            'electron/main.ts',
            'electron/preload.ts',
            'electron/updater.ts',
            'electron/events.ts',
            'electron/utils.ts',
          ],
          vite: {
            build: {
              chunkSizeWarningLimit: 2048,
              outDir: 'dist/electron',
              minify: 'terser',
            },
          },
        },
      ]),
    );
  }

  return {
    root: getPath('./'),
    base: './',
    build: {
      chunkSizeWarningLimit: 2048,
      target: 'modules',
      outDir: 'dist',
      assetsDir: 'assets',
      // vite 3.0.0+ 需要安装 terser
      minify: 'terser',
      terserOptions: {
        // 生产环境去除 console
        compress: {
          drop_console: true,
          drop_debugger: true,
        },
      },
    },
    // 作为静态资源服务的文件夹，并且始终按原样提供或复制而无需进行转换。
    publicDir: getPath('public'),
    resolve: {
      alias: {
        '@': getPath('src'),
        '@public': getPath('public'),
        '@_custom': getPath('src/_custom'),
        '@resource': getPath('src/resource'),
        '@router': getPath('src/router'),
        '@tools': getPath('src/tools'),
        '@services': getPath('src/services'),
        '@common': getPath('src/common'),
        '@modules': getPath('src/modules'),
        '@pages': getPath('src/pages'),
        '@store': getPath('src/store'),
      },
    },
    preview: {
      // vite preview --port=9527 --host
      port: 9527,
    },
    server: {
      cors: true,
      // 在开发服务器启动时自动在浏览器中打开应用程序
      open: mode === 'development',
      hmr: true, // 与 server-worker 互斥
      host: true,
      port: 1998,
      proxy: {
        '^/api': {
          target: 'http://192.168.110.168',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, '/api/test/'),
        },
        '^/upload': {
          target: 'http://a.biugle.cn',
          changeOrigin: true,
        },
        '^/test/api/.*': {
          target: 'http://192.168.110.168',
          changeOrigin: true,
        },
      },
    },
    css: {
      preprocessorOptions: {
        less: {
          charset: false,
          javascriptEnabled: true,
          additionalData: '@import "@_custom/css/global.less";', // 全局变量导入到每个 less 文件中
        },
      },
    },
    plugins: pluginsConfig,
  };
});
