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

// http://localhost:8082/discard/getAllDiscard
export const getAllDiscard = () => {
  return axios.request({
    url: prefix+'/getAllDiscard',
    method: 'get'
  })
}

