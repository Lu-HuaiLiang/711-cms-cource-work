import axios from './axios'
const prefix = '/order'
export const getAllOrder = () => {
    return axios.request({
        url: prefix + '/getAllOrder',
        method: 'get'
    })
}

// /order/getAllOrder
export const getOneOrder = (orderId) => {
    return axios.request({
        url: prefix + '/getOneOrder',
        method: 'post',
        data:{
            orderId
        }
    })
}

