# web_base

> 前端模板-基于 React + TypeScript + Vite + Antd + Electron + ServiceWorker 实现的模块化前端模板(支持基础版本、多页面模块版本、客户端版本等)

* **main** `基础版本` 分支
* **modules** `模块化版本` 分支
* **client** `客户端版本` 分支
  * (***client-modules*** 支持 ***ServiceWorker 资源缓存***)
  * (***client-modules*** 支持 ***Electron Http 服务启动***)
  * (***client-modules*** 支持 ***Electron SSL 证书扩展***)

## Technology Stack

* React 17.x
* Redux+Toolkit
* TypeScript
* Scss/Less
* Ant Design 5.x
* Vite 4.x
* Electron(已支持自动更新、打包、SSL)
* EsLint
* Prettier
* Husky
* ServiceWorker

> DevEnvTips: (node >= 14.20.0)、(npm >= 8.0.0)、(git >= 2.30.0)

## Use

```bash
git clone https://github.com/biugle/web_base.git

npm i -g js-xcmd
xcmd create-web-base [dir]
```

## Start

* `npm install` or `npm run init`

> 注意：若代码标红提示，请检查是否因为 `npm` 版本过低，导致安装了 `react18` 的声明文件。
> 可以使用 `npm install --no-optional` 来避免安装 `react18` 的声明文件。
> 或者直接升级 `npm` 版本，`(*∩_∩*)` 嘻嘻。

## Development

* `npm run dev` or `npm run dev:exe`

## Preview

* `npm run preview` or `npm run preview:exe`

## Build

* `npm run build` or `npm run build:exe`

## Code Check

* `npm run lint`

## Docs

* [Xxx](https://pandaoh.github.io/js-xxx/html/)
* [React](https://reactjs.bootcss.com/)
* [Redux Toolkit](http://cn.redux.js.org/redux-toolkit/overview/)
* [Vite](https://vitejs.cn/guide/)
* [Ant Design](https://ant.design/components/overview-cn/)
* [Ant Design ProComponents](https://procomponents.ant.design/components/)

## Others

* [Issue](https://github.com/biugle/web_base/issues)
* [Pull Request](https://github.com/biugle/web_base/pulls)
* [hxbpandaoh@163.com](mailto:hxbpandaoh@163.com)
* [Blog](http://a.biugle.cn)
* Leo He

> Buy me a coffee!

<div style="display:flex;justify-content:center;align-items:center;">
  <img src="https://a.biugle.cn/images/alipay.png" style="width:200px;" alt="Alipay" title="Alipay" />
  <img src="https://a.biugle.cn/images/liuyan.gif" style="width:200px;" alt="(0.0)" title="(0.0)" />
  <img src="https://a.biugle.cn/images/wechatpay.png" style="width:200px;" alt="WeChat" title="WeChat" />
</div>
