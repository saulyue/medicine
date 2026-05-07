// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 获取当前的用户 GET /nest/currentUser */
export async function currentUser(options?: { [key: string]: any }) {
  return request<{
    data: API.CurrentUser;
  }>('/nest/user/currentUser', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 退出登录接口 POST /nest/login/outLogin */
export async function outLogin(options?: { [key: string]: any }) {
  return request<Record<string, any>>('/nest/user/login/outLogin', {
    method: 'POST',
    ...(options || {}),
  });
}

/** 登录接口 POST /nest/login/account */
export async function login(body: API.LoginParams, options?: { [key: string]: any }) {
  return request<API.LoginResult>('/nest/user/login/account', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /nest/notices */
export async function getNotices(options?: { [key: string]: any }) {
  return request<API.NoticeIconList>('/nest/notices', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 获取规则列表 GET /nest/rule */
export async function rule(
  params: {
    // query
    /** 当前的页码 */
    current?: number;
    /** 页面的容量 */
    pageSize?: number;
  },
  options?: { [key: string]: any },
) {
  return request<API.RuleList>('/nest/rule', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 更新规则 PUT /nest/rule */
export async function updateRule(options?: { [key: string]: any }) {
  return request<API.RuleListItem>('/nest/rule', {
    method: 'POST',
    data: {
      method: 'update',
      ...(options || {}),
    },
  });
}

/** 新建规则 POST /nest/rule */
export async function addRule(options?: { [key: string]: any }) {
  return request<API.RuleListItem>('/nest/rule', {
    method: 'POST',
    data: {
      ...(options || {}),
    },
  });
}

export async function getMedicine(
  params: {
    // query
    /** 当前的页码 */
    current?: number;
    /** 页面的容量 */
    pageSize?: number;
  },
  options?: { [key: string]: any },
) {
  return request('/nest/medicine', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

export async function updateMedicine(options?: { [key: string]: any }, id?: number) {
  return request<API.RuleListItem>('/nest/medicine/' + id, {
    method: 'PATCH',
    data: {
      ...(options || {}),
    },
  });
}
export async function addMedicine(options?: { [key: string]: any }) {
  return request<API.RuleListItem>('/nest/medicine', {
    method: 'POST',
    data: {
      ...(options || {}),
    },
  });
}
export async function removeMedicine(id: number) {
  return request<Record<string, any>>('/nest/medicine/' + id, {
    method: 'DELETE',
  });
}

/** 删除规则 DELETE /nest/rule */
export async function removeRule(options?: { [key: string]: any }) {
  return request<Record<string, any>>('/nest/rule', {
    method: 'POST',
    data: {
      method: 'delete',
      ...(options || {}),
    },
  });
}
