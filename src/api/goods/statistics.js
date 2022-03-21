import { post } from '@/utils/request';
export function dayStatistics(data) {
  return post({
    url: '/statistics/list',
    data:data
  })
}
export function changeCount(data) {
  return post({
    url: '/statistics/changecount',
    data:data
  })
}
