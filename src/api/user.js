import { post } from '@/utils/request';
export function login(data) {
  return post({
    url: '/admin/login',
    data:data
  })
}

export function getInfo(token) {
  return post({
    url: '/user/info',
    data: { token }
  })
}

export function logout() {
  return post({
    url: '/admin/logout',
  })
}
