import {request} from "@@/exports";

export async function getStorage(
  params: {
    // query
    /** 当前的页码 */
    current?: number;
    /** 页面的容量 */
    pageSize?: number;
  },
  options?: { [key: string]: any },
) {
  return request('/nest/storage', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
export async function newCode() {
  return request('/nest/storage/code', {
    method: 'GET',
  });
}
export async function updateStorage(options?: { [key: string]: any }, id?: number) {
  return request('/nest/storage/' + id, {
    method: 'PATCH',
    data: {
      ...(options || {}),
    },
  });
}
export async function addStorage(options?: { [key: string]: any }) {
  return request('/nest/storage', {
    method: 'POST',
    data: {
      ...(options || {}),
    },
  });
}
export async function removeStorage(id:number) {
  return request<Record<string, any>>('/nest/storage/'+id, {
    method: 'DELETE',
  });
}
export async function getWarehousing(
  params: {
    // query
    /** 当前的页码 */
    current?: number;
    /** 页面的容量 */
    pageSize?: number;
  },
  options?: { [key: string]: any },
) {
  return request('/nest/warehousing', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
export async function addWarehousing(options?: { [key: string]: any }) {
  return request('/nest/warehousing', {
    method: 'POST',
    data: {
      ...(options || {}),
    },
  });
}

export async function updateWarehousing(options?: { [key: string]: any }, id?: number) {
  return request('/nest/warehousing/' + id, {
    method: 'PATCH',
    data: {
      ...(options || {}),
    },
  });
}

export async function removeWarehousing(id?: number) {
  return request('/nest/warehousing/' + id, {
    method: 'DELETE',
  });
}

