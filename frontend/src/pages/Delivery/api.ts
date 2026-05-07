import {request} from "@@/exports";

export async function getSalesDetails(
  params: {
    // query
    /** 当前的页码 */
    current?: number;
    /** 页面的容量 */
    pageSize?: number;
  },
  options?: { [key: string]: any },
) {
  return request('/nest/salesDetails', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

export async function updateSalesDetails(options?: { [key: string]: any }, id?: number) {
  return request('/nest/salesDetails/' + id, {
    method: 'PATCH',
    data: {
      ...(options || {}),
    },
  });
}
export async function addSalesDetails(options?: { [key: string]: any }) {
  return request('/nest/salesDetails', {
    method: 'POST',
    data: {
      ...(options || {}),
    },
  });
}
export async function removeSalesDetails(id:number) {
  return request<Record<string, any>>('/nest/salesDetails/'+id, {
    method: 'DELETE',
  });
}
export async function getDelivery(
  params: {
    // query
    /** 当前的页码 */
    current?: number;
    /** 页面的容量 */
    pageSize?: number;
  },
  options?: { [key: string]: any },
) {
  return request('/nest/delivery', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
export async function addDelivery(options?: { [key: string]: any }) {
  return request('/nest/delivery', {
    method: 'POST',
    data: {
      ...(options || {}),
    },
  });
}

export async function updateDelivery(options?: { [key: string]: any }, id?: number) {
  return request('/nest/delivery/' + id, {
    method: 'PATCH',
    data: {
      ...(options || {}),
    },
  });
}

export async function removeDelivery(id?: number) {
  return request('/nest/delivery/' + id, {
    method: 'DELETE',
  });
}
