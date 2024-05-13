/*
 * @Author: HxB
 * @Date: 2024-05-06 10:51:38
 * @LastEditors: DoubleAm
 * @LastEditTime: 2024-05-10 09:52:35
 * @Description: useLogScroll scroll 事件监听埋点日志
 * @FilePath: \web_base\src\_custom\hooks\useLogScroll.ts
 */
import { useEffect, useRef } from 'react';

// eslint-disable-next-line max-params
export function useLogScroll(elementRef: any, callback?: any, delay = 800, threshold = 30) {
  const timeoutRef: any = useRef(null);
  const lastScrollPosRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    function jsonDecode(json: string) {
      try {
        return JSON.parse(json);
      } catch (error) {
        return null;
      }
    }

    const element = elementRef.current;

    function handleScroll(event: any) {
      const { target } = event;

      // 找到拥有 log-scroll 属性的输入元素
      const logElement = target.closest('[log-scroll]');
      if (!logElement) {
        return;
      }
      // log-scroll 属性有可以解析值才执行后续操作
      const logData = logElement.getAttribute('log-scroll');
      if (!logData) {
        return;
      }
      const parsedLogData = jsonDecode(logData);
      if (!parsedLogData) {
        return;
      }
      const { trigger, params, logKey } = parsedLogData;

      if (!logKey) {
        return;
      }

      const currentScrollPos = {
        x: element.scrollLeft,
        y: element.scrollTop,
      };

      const scrollX = currentScrollPos.x - lastScrollPosRef.current.x;
      const scrollY = currentScrollPos.y - lastScrollPosRef.current.y;

      if (Math.abs(scrollX) > threshold || Math.abs(scrollY) > threshold) {
        console.log(event, '滚动事件埋点', logKey, {
          trigger: trigger ?? 'scroll',
          params: { ...(params ?? {}), X: scrollX, Y: scrollY },
          logKey,
        });
        callback?.(event, logKey, {
          trigger: trigger ?? 'scroll',
          params: { ...(params ?? {}), X: scrollX, Y: scrollY },
          logKey,
        });
      }

      lastScrollPosRef.current = currentScrollPos;
    }

    function handleScrollDebounce(e: any) {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(() => {
        handleScroll(e);
      }, delay);
    }

    if (element) {
      element.addEventListener('scroll', handleScrollDebounce, { passive: true });

      return () => {
        element.removeEventListener('scroll', handleScrollDebounce);
        clearTimeout(timeoutRef.current);
      };
    }
  }, [elementRef, callback, delay, threshold]);
}
