import axios from './axios'
const prefix = '/inventory'
export const getAllInventory = () => {
    return axios.request({
        url: prefix+'/getAllInventory',
        method: 'get'
    })
}

export const AlterInventory = (productId,productNumber) => {
    return axios.request({
        url: prefix+'/AlterInventory',
        method: 'post',
        data: {
            productId,
            productNumber
        }
    })
}