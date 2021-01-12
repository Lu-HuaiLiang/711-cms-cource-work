const Router = require('koa-router')
const router = new Router({
    prefix: '/index'
})
const jwt = require('jsonwebtoken')

const Administrators = require('../models/administrators')

let normal_pages =  {
  home: true,
  home_index: true,
  counter: true,

  money: false,
  moneyAnalyse: true,

  manager: false,
  managerList: true,
  managerAdd: true,

  product: true,
  productList: true,
  productAdd: true,

  inventory: true,
  inventoryList: true,
  inventoryDiscard: true,

  vip: true,
  vipAdd: true,
  vipList: true,

  order: true,
  orderList: true,

  Test: false
}

let super_pages = {
  home: true,
  home_index: true,
  counter: true,

  money: true,
  moneyAnalyse: true,

  manager: true,
  managerList: true,
  managerAdd: true,

  product: true,
  productList: true,
  productAdd: true,

  inventory: true,
  inventoryList: true,
  inventoryDiscard: true,

  vip: true,
  vipAdd: true,
  vipList: true,

  order: true,
  orderList: true,

  Test: false
}

const getPasswordByName = (name) => {
    return { password: '123' }
}

router.post('/login',async (ctx)=>{
    const {username,password} = ctx.request.body
    // ctx.state.username = username
    // console.log(username,password)
    let manager = await Administrators.findOne({where:{username}})
    if (!manager) throw new global.errs.ParameterException('用户名或密码错误！')
    if (manager.password !== password) throw new global.errs.ParameterException('用户名或密码错误！')
    
    throw new global.errs.Success({
      token: jwt.sign({ username, role:manager['dataValues'].role },'abcd',{expiresIn: '1d'}),
      username,
      role:manager['dataValues'].role
    },'登录成功')
})

router.get('/authorization',async (ctx)=>{
    const username = ctx.state.username
    const role = ctx.state.role
    // console.log(username,role)
    throw new global.errs.Success({
      token: jwt.sign({ username,role }, 'abcd', {
        expiresIn: '30d'
      }),
      rules: {
        page: role == 0 ? normal_pages : super_pages
      }
    })
})

// router.get('/test/:id', (ctx, next) => {
//     let params = ctx.params
//     let query = ctx.request.query
//     let headers = ctx.request.headers
//     let body = ctx.request.body
//     ctx.body = {
//         msg: "124"
//     }
// })

module.exports = router;