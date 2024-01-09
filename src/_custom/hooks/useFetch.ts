/* eslint-disable indent */
/*
 * @Author: HxB
 * @Date: 2024-01-08 18:21:39
 * @LastEditors: DoubleAm
 * @LastEditTime: 2024-01-09 14:06:21
 * @Description: useFetch 自定义 hooks
 * @FilePath: \web_mods_base\main\_custom\hooks\useFetch.ts
 */
import { useState, useEffect, useCallback } from 'react';

const useFetch = (
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH',
  url: string,
  dataOrParams?: any,
  headers: any = {},
) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const parseResponse = useCallback(async (response, contentType) => {
    if (contentType?.includes('json')) {
      return await response.json();
    } else if (contentType?.includes('text')) {
      return await response.text();
    } else if (contentType?.includes('form')) {
      return await response.formData();
    } else if (contentType?.includes('video') || contentType?.includes('image')) {
      return await response.blob();
    } else if (contentType?.includes('arrayBuffer')) {
      return await response.arrayBuffer();
    } else {
      try {
        if (headers.callback) {
          return await headers.callback(response);
        }
        return response;
      } catch (e) {
        return response;
      }
    }
  }, []);

  const fetchData = useCallback(async () => {
    setIsLoading(true);

    const contentType =
      headers.contenttype ??
      headers.contentType ??
      headers.ContentType ??
      headers.Contenttype ??
      headers['content-type'] ??
      headers['content-Type'] ??
      headers['Content-Type'] ??
      headers['Content-type'];

    try {
      const options: any = {
        method,
        // 文件请求相关处理时需注意别写 content-type
        headers: {
          ...headers,
          callback: undefined, // 去除非法参数
          ...(!contentType || headers.isFile
            ? {}
            : {
                'content-type': contentType ?? 'application/x-www-form-urlencoded;charset=UTF-8',
                // ?? 'application/json;charset=UTF-8',
              }),
        },
      };

      let newUrl = url;

      if (dataOrParams) {
        if (method !== 'GET') {
          options.body = JSON.stringify(dataOrParams);
        } else {
          newUrl = `${url}${url.includes('?') ? '&' : '?'}${new URLSearchParams(dataOrParams).toString()}`;
        }
      }

      const response = await fetch(newUrl, options);
      const type = response.headers.get('content-type');
      const responseData = await parseResponse(response, type);

      if (response.ok) {
        setData(responseData);
      } else {
        setError(responseData);
      }
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  }, [parseResponse]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return [data, error, isLoading];
};

export default useFetch;
