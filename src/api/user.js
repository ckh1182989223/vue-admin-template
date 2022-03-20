import request from '@/utils/request'
import { get,post } from '@/utils/request';
export function login(data) {
  return post({
    url: '/admin/login',
    data:data
  })
}

export function getInfo(token) {
  return request({
    url: '/user/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/admin/logout',
    method: 'post'
  })
}
