import { getRouteById, routeEqual, routeHasExist,localSave,localRead } from "../../lib/util"

const getTabsToLocal = tabs => {
    return tabs.map(item=>{
        return {
            name: item.name,
            path: item.path,
            meta: item.meta,
            params: item.params,
            query: item.query
        }
    })
}

const state = {
    tabs:JSON.parse(localStorage.getItem('tabs')||'[]')
}

const mutations = {
    UPDATE_ROUTER (state,route) {
        if (!routeHasExist(state.tabs,route) && route.name !== 'login' && route.path !== '/') state.tabs.push(route)
        localSave('tabs',JSON.stringify(getTabsToLocal(state.tabs)))
    },
    REMOVE_TAB (state,index) {
        state.tabs.splice(index,1)
        localSave('tabs',JSON.stringify(getTabsToLocal(state.tabs)))
    },
    CLEAR_TAB (state){
        state.tabs = []
        localStorage.removeItem("tabs")
    }
}	

const actions = {
    handleRemove ({commit},{id,$route}) {
        return new Promise((resolve)=>{
            if (state.tabs.length===1 && $route.name==='home_index') {
                return 
            }
            let route = getRouteById(id)
            let index = state.tabs.findIndex(item=>{
                return routeEqual(route,item)
            })
            console.log()
            let len = state.tabs.length
            let nextRoute = {}
            if (routeEqual($route,state.tabs[index])){
                if (index<len-1) nextRoute = state.tabs[index+1]
                else nextRoute = state.tabs[index-1]
            }
            
            const {name,params,query} = nextRoute || {name:'home_index'}
            commit('REMOVE_TAB',index)
            console.log(name,params,query)
            resolve({
                name,params,query
            })
        })
    }
}

export default {
    state,
    mutations,
    actions
}