/*
 * @Author: HxB
 * @Date: 2024-05-08 14:15:40
 * @LastEditors: DoubleAm
 * @LastEditTime: 2024-05-10 17:27:57
 * @Description: useLogChange change 事件监听埋点日志
 * @FilePath: \web_base\src\_custom\hooks\useLogChange.ts
 */
import { useEffect } from 'react';

export function useLogChange(callback?: any) {
  useEffect(() => {
    function jsonDecode(json: string) {
      try {
        return JSON.parse(json);
      } catch (error) {
        return null;
      }
    }

    function handleChange(event: any) {
      const { target, detail } = event;
      let parsedLogData: any;

      if (detail?.customEvent) {
        parsedLogData = detail;
      } else {
        // 找到拥有 log-change 属性的输入元素
        const logElement = target.closest('[log-change]');
        if (!logElement) {
          return;
        }
        // log-change 属性有可以解析值才执行后续操作
        const logData = logElement.getAttribute('log-change');
        if (!logData) {
          return;
        }
        parsedLogData = jsonDecode(logData);
      }

      if (!parsedLogData) {
        return;
      }
      const { trigger, params, logKey } = parsedLogData;

      if (!logKey) {
        return;
      }

      const value = target?.value;

      // 在这里处理输入事件埋点
      console.log(event, 'Change 事件处理:', logKey, {
        trigger: trigger ?? 'change',
        params: { ...(params ?? {}), value },
        logKey,
      });
      callback?.(event, logKey, {
        trigger: trigger ?? 'change',
        params: { ...(params ?? {}), value },
        logKey,
      });
    }

    document.addEventListener('change', handleChange);

    return () => {
      document.removeEventListener('change', handleChange);
    };
  }, [callback]);
}
