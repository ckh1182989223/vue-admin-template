import { post } from '@/utils/request';
export function goodList(data) {
  return post({
    url: '/goods/list',
    data:data
  })
}
export function saveGoods(data) {
  return post({
    url: '/goods/save',
    data:data
  })
}
export function deleteGoods(id) {
  return post({
    url: '/goods/delete',
    data:{id}
  })
}
