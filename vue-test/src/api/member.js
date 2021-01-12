import axios from './axios'
const prefix = '/membership'
export const getAllMember = () => {
    return axios.request({
        url: prefix + '/getMemberList',
        method: 'get'
    })
}

// http://localhost:8082/membership/createMember
export const createMember = (member) => {
    return axios.request({
        url: prefix + '/createMember',
        method: 'post',
        data: {
            member
        }
    })
}

export const deleteMember = (phone) => {
    return axios.request({
        url:  prefix+'/deleteMember',
        method: 'post',
        data: {
            phone
        }
    })
}

export const alterMember = (alter_member,phone) => {
    return axios.request({
        url: prefix + '/alterMember',
        method: 'post',
        data: {
            alter_member, // {username,phone,role}
            phone   // 原来的手机号码
        }
    })
}