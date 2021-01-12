import axios from './axios'
const prefix = 'counter'
export const createOrder = (list,phone) => {
    // console.log(list)
    return axios.request({
        url: prefix + '/createOrder',
        method: 'post',
        data: {
            list,
            phone
        }
    })
}

export const postOrder = (list,totalPrice,phone) => {
    // console.log(list)
    return axios.request({
        url: prefix + '/postOrder',
        method: 'post',
        data: {
            list,totalPrice,phone
        }
    })
}