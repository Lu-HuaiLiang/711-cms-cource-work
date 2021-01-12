import Cookies from 'js-cookie'
import { TableColumnRenderHeadParams } from 'view-design'
import router from '../router'
import { doCustomTimes, objEqual } from './tools'

export const setTitle = (title) => {
    window.document.title = title || 'admin'
}

export const setToken = (token,tokenName= 'token') => {
    Cookies.set(tokenName,token)
}

export const getToken = (tokenName = 'token') => {
    return Cookies.get(tokenName)
}

export const routeEqual = (route1,route2) => {
    const param1 = route1.params || {}
    const param2 = route2.params || {}
    const query1 = route1.query || {}
    const query2 = route2.query || {}
    return route1.name === route2.name && objEqual(param1,param2) && objEqual(query1,query2)
}

export const routeHasExist = (tabList,routerItem) => {
    let len = tabList.length
    let res = false
    for (let i=0; i<len; i++){
        if (routeEqual(tabList[i],routerItem)) res = true
    }
    return res
}

const getKeyValueArr = obj => {
    let arr = []
    Object.entries(obj).sort((a,b)=>{
        return a[0]-b[0]
    }).forEach(([_key,_val])=>{
        arr.push(_key,_val)
    })
    return arr
}

export const getTabNameByRoute = route => {
    const {name,params,query} = route
    let res = name
    if (params && Object.keys(params).length) res += ':'+getKeyValueArr(params).join('_')
    if (query && Object.keys(query).length)   res += '&'+getKeyValueArr(query).join('_')
    return res
}

const getObjBySplitStr = (id,splitStr) => {
    let splitArr = id.split(splitStr)
    let keyValArr = splitArr[splitArr.length-1].split('_')
    let len = keyValArr.length, i = 0, res = {}
    while (i<len) {
        res[keyValArr[i]] = keyValArr[i+1]
        i+=2
    }
    return res
}

export const getRouteById = id=>{
    let res = {}
    if (id.includes('&')){
        res.query = getObjBySplitStr(id,'&')
        id = id.split('&')[0]
    }
    if (id.includes(':')){
        res.params = getObjBySplitStr(id,':')
        id = id.split(':')[0]
    }
    res.name = id
    return res
}
// arg:id_111&a_111_b_222


export const getOpenArrByName = (name,routerList) => {
    let arr = []
    // some的好处就是一旦return后面就不会继续遍历了
    routerList.some(item=>{
        if (item.name === name) {
            arr.push(item.name) 
            return true
        }
        if (item.children && item.children.length) {
            let childArr = getOpenArrByName(name,item.children)
            if (childArr.length) {
                arr = arr.concat(item.name,childArr)
                return true
            }
        }
    })
    return arr
}

export const localSave = (name,value) => {
    localStorage.setItem(name,value)
}

export const localRead = (name) => {
    return localStorage.getItem(name)
}