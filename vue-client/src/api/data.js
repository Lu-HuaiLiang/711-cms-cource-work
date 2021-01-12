import axios from './axios'

export const getTableData = (options) => {
  return axios.request({
    url: '/getTableData',
    method: 'get'
  })
}

