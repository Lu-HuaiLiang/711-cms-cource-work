import axios from './axios'
const prefix = '/discard'
export const createDiscard = ({productId,discardNumber}) => {
  return axios.request({
    url: prefix+'/createDiscard',
    method: 'post',
    data: {
        productId,
        discardNumber
    }
  })
}

export const getAllDiscard = ({productId,discardNumber}) => {
  return axios.request({
    url: prefix+'/getAllDiscard',
    method: 'get'
  })
}

