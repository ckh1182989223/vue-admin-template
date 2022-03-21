import { post } from '@/utils/request';
export function saveCost(data) {
  return post({
    url: '/cost/save',
    data:data
  })
}
export function getCost(data) {
  return post({
    url: '/cost/cost',
    data:data
  })
}
