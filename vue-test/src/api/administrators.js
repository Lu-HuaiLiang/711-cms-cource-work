import axios from './axios'
const prefix = '/administrators'
export const register = ({
    username,
    password,
    phone,
    role
}) => {
    // console.log(list)
    return axios.request({
        url:  prefix+'/register',
        method: 'post',
        data: {
            username,
            password,
            phone,
            role
        }
    })
}

export const deleteManager = (username) => {
    return axios.request({
        url:  prefix+'/deleteManager',
        method: 'post',
        data: {
            username
        }
    })
}

export const alterManager = (alter_manager,username) => {
    // phone,username,password
    return axios.request({
        url:  prefix+'/alterManager',
        method: 'post',
        data: {
            alter_manager,
            username
        }
    })
}

export const getManagerList = () => {
    // console.log(list)
    return axios.request({
        url:  prefix+'/getManagerList',
        method: 'get'
    })
}