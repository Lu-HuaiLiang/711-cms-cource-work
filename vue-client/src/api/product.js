import axios from './axios'
const prefix = '/product'
export const getAllProduct = () => {
    return axios.request({
        url: prefix + '/getAllProduct',
        method: 'get'
    })
}

export const addProduct = (product) => {
    return axios.request({
        url: prefix + '/AddProduct',
        method: 'post',
        data:{
            product
        }
    })
}

export const UpdateProduct = (alter_product,productId) => {
    return axios.request({
        url: prefix + '/UpdateProduct',
        method: 'post',
        data:{
            alter_product,
            productId
        }
    })
}

export const DeleteProduct = (productId) => {
    return axios.request({
        url: prefix + '/DeleteProduct',
        method: 'post',
        data:{
            productId
        }
    })
}
 

