import { request } from '@@/exports';

export async function getSupplier(
  params: {
    // query
    /** 当前的页码 */
    current?: number;
    /** 页面的容量 */
    pageSize?: number;
  },
  options?: { [key: string]: any },
) {
  return request('/nest/supplier', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
export async function getSupplierDic(params: {
  keyWords?: string;
}, options?: { [key: string]: any }) {
  return request('/nest/supplier/dic', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

export async function updateSupplier(options?: { [key: string]: any }, id?: number) {
  return request('/nest/supplier/' + id, {
    method: 'PATCH',
    data: {
      ...(options || {}),
    },
  });
}
export async function addSupplier(options?: { [key: string]: any }) {
  return request('/nest/supplier', {
    method: 'POST',
    data: {
      ...(options || {}),
    },
  });
}
export async function removeSupplier(id: number) {
  return request<Record<string, any>>('/nest/supplier/' + id, {
    method: 'DELETE',
  });
}
