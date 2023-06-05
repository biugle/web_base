/*
 * @Author: HxB
 * @Date: 2023-06-05 15:35:55
 * @LastEditors: DoubleAm
 * @LastEditTime: 2023-06-06 16:05:06
 * @Description: ServiceWorker
 * @FilePath: \web_base\public\service_worker.js
 */
// 定义缓存名称
const CACHE_NAME = 'web-base-cache';

// 需要缓存的文件列表
const urlsToCache = ['/'];

// 不缓存的文件列表
const noCache = ['index.html', 'icon.png', 'logos/icon.ico'];

// 监听 install 事件，将需要缓存的文件添加到缓存中
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      // 将需要缓存的文件添加到缓存中
      cache.addAll(urlsToCache);
    }),
  );
});

// 拦截 fetch 请求，如果该请求已经被缓存，则直接返回缓存中的数据，否则发送真正的请求并将响应缓存起来
self.addEventListener('fetch', (event) => {
  console.log('fetch event url', event.request.url);
  const url = new URL(event.request.url);
  if (url.origin === location.origin) {
    event.respondWith(
      caches.match(event.request).then((response) => {
        // 如果该请求已经被缓存，则直接返回缓存中的数据
        if (response) {
          return response;
        }
        // 不缓存的重新请求数据进行检查
        if (noCache.some((path) => url.pathname.includes(path))) {
          return fetch(event.request);
        }
        console.log(url.pathname);
        // 否则发送真正的请求并将响应缓存起来
        return fetch(event.request).then((response) => {
          // 克隆响应对象，并将克隆后的对象进行缓存
          const responseClone = response.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseClone);
          });
          return response;
        });
      }),
    );
  }
});
