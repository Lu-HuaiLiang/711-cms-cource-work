
import Vue from 'vue'
import VueRouter from 'vue-router'
import { setTitle, setToken } from '../lib/util'
import { routes } from './router'
import { getToken } from '@/lib/util'
import store from '@/store'
Vue.use(VueRouter)

const HAS_LOGINED = false

const router = new VueRouter({
  base: process.env.BASE_URL,
  routes
})

// router.beforeEach((to,from,next)=>{
//   to.meta && setTitle(to.meta.title)
//   const token = getToken()
//   if (token) {
//     store.dispatch('authorization',token).then(()=>{
//       if (to.name === 'login') next({name:'home'})
//       else next()
//     }).catch(()=>{
//       setToken('')
//       next({name:'login'})
//     })
//   } else {
//     if (to.name === 'login') next()
//     else next({name: 'login'})
//   }
// })


// //获取原型对象上的push函数
// const originalPush = VueRouter.prototype.push
// //修改原型对象中的push方法
// VueRouter.prototype.push = function push(location) {
//    return originalPush.call(this, location).catch(err => err)
// }

router.beforeEach((to,from,next)=>{
  to.meta && setTitle(to.meta.title)
  const token = getToken()
  if (token) {
    if (!store.state.router.hasGetRules) {
      // hasGetRules === false
      store.dispatch('authorization',token).then(rules=>{  
        store.dispatch('concatRoutes',rules).then(routers=>{
          router.addRoutes(routers)
          if (store.state.router.hasGetRules === false) {
            store.commit('CHANGE_HASGETRULES')
          }
          next({...to,replace:true})
        })
      }).catch(()=>{
        setToken('')
        next({ name: 'login' })
      })
    } else {
      // hasGetRules === true
      if (to.name === 'login') next(false)
      else next()
    }
  } else {
    if (store.state.router.hasGetRules === true) {
      store.commit('CHANGE_HASGETRULES')
      store.commit('ClEAR_ROUTER')
    }
    if (to.name === 'login') next()
    else next({name: 'login'})
  }
})

export default router
