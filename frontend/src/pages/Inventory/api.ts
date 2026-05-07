import {request} from "@@/exports";

export async function getInventory(
  params: {
    // query
    /** 当前的页码 */
    current?: number;
    /** 页面的容量 */
    pageSize?: number;
  },
  options?: { [key: string]: any },
) {
  return request('/nest/inventory', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
export async function getInventoryInfo(
  params: {
    // query
    /** 当前的页码 */
    current?: number;
    /** 页面的容量 */
    pageSize?: number;
  },
  options?: { [key: string]: any },
) {
  return request('/nest/inventory/info', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
export async function getInventoryDrug(
  params: {
    drugCode?: string;
    drugName?: string;
  },
  options?: { [key: string]: any },
) {
  return request('/nest/inventory/drug', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

export async function getInventoryOrder(
  params: {
    drugCode?: string;
  },
  options?: { [key: string]: any },
) {
  return request('/nest/inventory/order', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

export async function updateInventory(options?: { [key: string]: any }, id?: number) {
  return request('/nest/inventory/' + id, {
    method: 'PATCH',
    data: {
      ...(options || {}),
    },
  });
}
export async function addInventory(options?: { [key: string]: any }) {
  return request('/nest/inventory', {
    method: 'POST',
    data: {
      ...(options || {}),
    },
  });
}
export async function removeInventory(id:number) {
  return request<Record<string, any>>('/nest/inventory/'+id, {
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
