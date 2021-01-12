import axios from './axios'
export const login = ({username,password}) => {
    return axios.request({
        url: '/index/login',
        method: 'post',
        data: {
            username,
            password
        }
    })
}


export const getUserInfo = (data) => {
    return axios.request({
        url: '/index/getUserInfo',
        method: 'post',
        data
    })
}


export const authorization = () => {
    return axios.request({
        url: '/index/authorization',
        method: 'get'
    })
}