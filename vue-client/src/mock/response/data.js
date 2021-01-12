import { doCustomTimes } from "../../lib/tools";
import Mock from '../index'
export const getTableData = (options) => {
    const template = {
        name: '@name',
        'age|18-25': 0,
        email: '@email'
    }
    let arr = []
    doCustomTimes(5,()=>{
        arr.push(Mock.mock(template))
    })
    return arr
}

