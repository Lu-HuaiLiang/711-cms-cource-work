
import axios from './axios'
const prefix = '/money'
export const getBestSaleByName = (date1,date2,ByWhat) => {
    return axios.request({
        url: prefix + '/getBestSale',
        method: 'post',
        data:{
            date1,date2,ByWhat
        }
    })
}
