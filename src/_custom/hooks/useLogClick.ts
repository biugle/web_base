/*
 * @Author: HxB
 * @Date: 2024-05-06 10:51:38
 * @LastEditors: DoubleAm
 * @LastEditTime: 2024-05-13 10:56:34
 * @Description: useLogClick click 事件监听埋点日志
 * @FilePath: \web_base\src\_custom\hooks\useLogClick.ts
 */
import { useEffect, useState } from 'react';

/**
 * click 埋点 hook
 * @param callback click 埋点回调 hook
 * @returns
 */
export function useLogClick(callback?: any) {
  const [sequenceMap, setSequenceMap] = useState<any>({});
  const [orderMap, setOrderMap] = useState<any>({});

  useEffect(() => {
    function jsonDecode(json: string) {
      try {
        return JSON.parse(json);
      } catch (error) {
        return null;
      }
    }

    function handleClick(event: any) {
      const { target, detail } = event;

      let parsedLogData;
      if (detail?.customEvent) {
        parsedLogData = detail;
      } else {
        // 找到拥有 log-click 属性的元素为有效点击
        const logElement = target.closest('[log-click]');
        if (!logElement) {
          return;
        }

        // console.log({ target, logElement, sequenceMap, orderMap });

        // log-click 属性有可以解析值才执行后续操作
        const logData = logElement.getAttribute('log-click');
        if (!logData) {
          return;
        }
        parsedLogData = jsonDecode(logData);
      }

      if (!parsedLogData) {
        return;
      }

      const { trigger, params, sequence, maxSequence, logKey, isOrder, orderKey } = parsedLogData;

      if (!logKey) {
        return;
      }

      // 如果 isOrder 是 true 则触发区域非固定顺序记录埋点分析，当一个区域 orderKey 第二次被点击时，本次顺序重来。
      if (isOrder && orderKey) {
        let clickInfo = { ...orderMap };
        if (clickInfo?.logKey !== logKey) {
          clickInfo = undefined;
        }
        if (!clickInfo) {
          clickInfo = {
            logKey,
            clickOrder: 1,
            clickList: [orderKey],
          };
        }

        if (clickInfo.clickList[clickInfo.clickList.length - 1] === orderKey) {
          clickInfo = { ...clickInfo };
        } else if (clickInfo.clickList.includes(orderKey)) {
          clickInfo = {
            logKey,
            clickOrder: 1,
            clickList: [orderKey],
          };
        } else {
          clickInfo.clickOrder++;
          clickInfo.clickList.push(orderKey);
        }

        setOrderMap(clickInfo);
        const newLogKey = `${logKey}-${orderKey}-${clickInfo.clickOrder}`;
        console.log(event, '区域非固定顺序记录埋点分析:', newLogKey, {
          trigger: trigger ?? 'click',
          params,
          logKey,
        });
        callback?.(event, newLogKey, { trigger: trigger ?? 'click', params, logKey });
        return;
      }

      // 无 sequence 或 maxSequence 则认为是普通埋点
      if (maxSequence === undefined) {
        console.log(event, '普通埋点分析:', logKey, { trigger: trigger ?? 'click', params, logKey });
        callback?.(event, logKey, { trigger: trigger ?? 'click', params, logKey });
        return;
      }

      // 存在 sequence 或 maxSequence 则认为是固定顺序埋点
      if (sequence !== undefined && maxSequence !== undefined) {
        const clickSequence = sequenceMap[logKey] || 0;

        // 顺序正确，保存顺序并继续执行。
        if (clickSequence + 1 === sequence) {
          const updatedSequenceMap = { ...sequenceMap };
          updatedSequenceMap[logKey] = sequence;
          setSequenceMap(updatedSequenceMap);

          // 达到 maxSequence 触发埋点
          if (sequence === maxSequence) {
            console.log(event, '固定顺序埋点分析:', logKey, {
              trigger: trigger ?? 'click',
              params,
              logKey,
            });
            callback?.(event, logKey, { trigger: trigger ?? 'click', params, logKey });
            delete updatedSequenceMap[logKey];
            setSequenceMap(updatedSequenceMap);
          }
        } else {
          // 点击相同顺序的按钮多次，不清空重来，防呆。
          if (clickSequence === sequence) {
            const updatedSequenceMap = { ...sequenceMap };
            updatedSequenceMap[logKey] = sequence;
            setSequenceMap(updatedSequenceMap);
          } else {
            // 点击顺序错误，重来。
            const updatedSequenceMap = { ...sequenceMap };
            delete updatedSequenceMap[logKey];
            setSequenceMap(updatedSequenceMap);
          }
        }
        return;
      }
    }

    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, [callback, sequenceMap, orderMap]);

  return { sequenceMap, orderMap };
}
