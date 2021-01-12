import {routes,routerMap} from '@/router/router'

const state = {
    routers: routes,
    hasGetRules: false
}

const mutations = {
    CONCAT_ROUTES (state, routerList) {
        // 合并的时候要注意一定是routes放在最后面
        state.routers = routerList.concat(routes)
        state.hasGetRules = true
    },
    CHANGE_HASGETRULES (state) {
        state.hasGetRules = !state.hasGetRules
    },
    ClEAR_ROUTER (state) {
        state.routers = routes
    }
}	

const getAccesRouterList = (routers,rules) => {
    console.log(routers,rules)
    return routers.filter(item=>{
        if (rules[item.name]) {
            if (item.children) item.children = getAccesRouterList(item.children,rules)
            return true
        } else return false
    })
}

const actions = {
    concatRoutes ({commit},rules) {
        return new Promise((resolve,reject) => {
            try {
                let routerList = []
                console.log(routerMap)
                if (Object.entries(rules).every(item=>item[1])) routerList = routerMap
                else  routerList = getAccesRouterList(routerMap,rules)
                commit('CONCAT_ROUTES',routerList)
                // 这里resolve的不应该是state.routers
                resolve(routerList)
            } catch(error) {
                reject(error)
            }
        }) 
    }
}

export default {
    state,
    mutations,
    actions
}