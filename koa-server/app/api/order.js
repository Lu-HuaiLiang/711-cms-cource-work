const Router = require('koa-router')
const router = new Router({
    prefix: '/order'
})
const moment = require('moment');

const Product = require('../models/product')
const Inventory = require('../models/inventory')
const Order = require('../models/order')
const Sale = require('../models/sale');

router.post('/getOneOrder',async (ctx)=>{
    const {orderId} = ctx.request.body
    let sales = await Sale.findAll({where:{orderId}}), list = []
    for(let i=0; i<sales.length; i++){
        let sale = sales[i]
        delete sale['dataValues'].created_at
        delete sale['dataValues'].updated_at
        list.push(sale['dataValues'])
    } 
    throw new global.errs.Success({list})
})


router.get('/getAllOrder',async (ctx)=>{
    const orders = await Order.findAll(), list = []
    orders.forEach(order=>{
        let orderDay = moment(order['dataValues'].created_at).format('YYYY-MM-DD HH:mm:ss')
        order['dataValues'].orderDay = orderDay
        delete order['dataValues'].created_at
        delete order['dataValues'].updated_at
        list.push(order['dataValues'])
    })
    throw new global.errs.Success({list})
})




module.exports = router;