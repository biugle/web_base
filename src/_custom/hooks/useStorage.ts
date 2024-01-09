/*
 * @Author: HxB
 * @Date: 2024-01-08 11:32:38
 * @LastEditors: DoubleAm
 * @LastEditTime: 2024-01-08 17:58:20
 * @Description: 本地存储 useStorage
 * @FilePath: \web_mods_base\main\_custom\hooks\useStorage.ts
 */
import {
  localStorageGet,
  localStorageSet,
  sessionStorageGet,
  sessionStorageSet,
  setEncodeStorage,
  getDecodeStorage,
} from 'js-xxx';
import { useCallback, useEffect, useState } from 'react';

const useStorage = (key: string, initialValue: any, storageType = 'L', isEncrypt = false) => {
  const isSessionStorage = storageType === 'S';

  const getValueFromStorage = useCallback(() => {
    if (isSessionStorage) {
      return isEncrypt ? getDecodeStorage(key, false) : sessionStorageGet(key);
    } else {
      return isEncrypt ? getDecodeStorage(key) : localStorageGet(key);
    }
  }, [isSessionStorage, isEncrypt, key]);

  const [value, setValue] = useState(() => {
    const storedValue = getValueFromStorage();
    return storedValue ?? initialValue;
  });

  useEffect(() => {
    const storedValue = getValueFromStorage();
    const newValue = storedValue ?? initialValue;
    setValue(newValue);

    if (isEncrypt) {
      setEncodeStorage(key, newValue, !isSessionStorage);
    } else {
      isSessionStorage ? sessionStorageSet(key, newValue) : localStorageSet(key, newValue);
    }
  }, [key, initialValue, isSessionStorage, getValueFromStorage, isEncrypt, setValue]);

  const syncSetValue = (newValue) => {
    if (isEncrypt) {
      setEncodeStorage(key, newValue, !isSessionStorage);
    } else {
      isSessionStorage ? sessionStorageSet(key, newValue) : localStorageSet(key, newValue);
    }
    setValue(newValue);
  };

  return [value, syncSetValue];
};

export default useStorage;
