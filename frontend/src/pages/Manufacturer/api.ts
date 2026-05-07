import {request} from "@@/exports";

export async function getManufacturer(
  params: {
    // query
    /** 当前的页码 */
    current?: number;
    /** 页面的容量 */
    pageSize?: number;
  },
  options?: { [key: string]: any },
) {
  return request('/nest/manufacturer', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

export async function updateManufacturer(options?: { [key: string]: any }, id?: number) {
  return request('/nest/manufacturer/' + id, {
    method: 'PATCH',
    data: {
      ...(options || {}),
    },
  });
}
export async function addManufacturer(options?: { [key: string]: any }) {
  return request('/nest/manufacturer', {
    method: 'POST',
    data: {
      ...(options || {}),
    },
  });
}
export async function removeManufacturer(id:number) {
  return request<Record<string, any>>('/nest/manufacturer/'+id, {
    method: 'DELETE',
  });
}
