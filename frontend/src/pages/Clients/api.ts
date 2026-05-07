import {request} from "@@/exports";

export async function getClients(
  params: {
    // query
    /** 当前的页码 */
    current?: number;
    /** 页面的容量 */
    pageSize?: number;
  },
  options?: { [key: string]: any },
) {
  return request('/nest/clients', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

export async function updateClients(options?: { [key: string]: any }, id?: number) {
  return request('/nest/clients/' + id, {
    method: 'PATCH',
    data: {
      ...(options || {}),
    },
  });
}
export async function addClients(options?: { [key: string]: any }) {
  return request('/nest/clients', {
    method: 'POST',
    data: {
      ...(options || {}),
    },
  });
}
export async function removeClients(id:number) {
  return request<Record<string, any>>('/nest/clients/'+id, {
    method: 'DELETE',
  });
}
