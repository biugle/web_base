import { Injectable } from '@sigi/di';
import { request } from '@/tools/xhttp';

@Injectable()
export class ListDemoApi {
  changeStatus(data: any) {
    return request('/demo/changeStatus', {
      method: 'POST',
      data,
    });
  }
  set(data: any) {
    return request('/demo/set', {
      method: 'POST',
      data,
    });
  }
  remove(params: { id: number }) {
    return request('/demo/remove', {
      method: 'GET',
      params,
    });
  }
  getDetail(params?: { id: number }) {
    return request('https://api.uomg.com/api/rand.qinghua?format=json', {
      method: 'get',
      params,
    });
  }
  getPageList(data: any) {
    return new Promise((resolve, reject) => {
      setTimeout(
        () =>
          resolve([
            { id: Math.random(), name: 'Random' },
            { id: 1, text: 'A' },
            { id: 2, text: 'B' },
            { id: 3, text: 'C' },
            { id: 4, text: 'D' },
            { id: 5, text: 'E' },
            { id: 6, text: 'FFF' },
          ]),
        1500,
      );
    });
  }
}
