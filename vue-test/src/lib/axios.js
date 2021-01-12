import axios from 'axios'
import baseURL from '@/config'
import { getToken } from '@/lib/util'
class HttpRequest {
    constructor(baseUrl = baseURL) {
        // 注意 baseUrl 和 baseURL 的区别
        this.baseUrl =  baseUrl
        this.queue = {}
    }
    getInsideConfig() {
        let config = {
            // axios的配置里是baseURL
            baseURL: this.baseUrl,
            headers: {}
        }
        return config
    }

    // 拦截器
    interceptors(instance){
        // 请求
        instance.interceptors.request.use(config => {
            // 添加全局Loading
            config.headers['Authorization'] = getToken()
            return config
        }, error => {
            // console.log(error)
            return Promise.reject(error)
        })
        // 响应
        instance.interceptors.response.use(res => {
            // console.log(res)
            const { data } = res
            return data
        }, error => {
            console.log(error)
            return Promise.reject(error)
        })
    }

    request(options) {
        // console.log(options)
        let instance = axios.create()
        options = Object.assign(this.getInsideConfig(),options)
        this.interceptors(instance)
        return instance(options)
    }
}

export default HttpRequest