import {request} from "@@/exports";

export async function getStaff(
  params: {
    // query
    /** 当前的页码 */
    current?: number;
    /** 页面的容量 */
    pageSize?: number;
  },
  options?: { [key: string]: any },
) {
  return request('/nest/staff', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
export async function getStaffDic(params: {
  keyWords?: string;
}, options?: { [key: string]: any }) {
  return request('/nest/staff/dic', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

export async function updateStaff(options?: { [key: string]: any }, id?: number) {
  return request('/nest/staff/' + id, {
    method: 'PATCH',
    data: {
      ...(options || {}),
    },
  });
}
export async function addStaff(options?: { [key: string]: any }) {
  return request('/nest/staff', {
    method: 'POST',
    data: {
      ...(options || {}),
    },
  });
}
export async function removeStaff(id:number) {
  return request<Record<string, any>>('/nest/staff/'+id, {
    method: 'DELETE',
  });
}
