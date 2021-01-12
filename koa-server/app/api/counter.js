const Router = require('koa-router')
const Membership = require('../models/membership')
const router = new Router({
    prefix: '/counter'
})
const { Sequelize } = require('sequelize')
const Product = require('../models/product')
const Inventory = require('../models/inventory')
const Order = require('../models/order')
const { ParameterException } = require('../../core/http-exception')
const Sale = require('../models/sale')

// 生成订单表
// post http://localhost:8082/counter/createOrder
// 参数 orderId list[{productId,productNumber}],phone
router.post('/createOrder', async (ctx) => {

    let {list,phone} = ctx.request.body, products = [], isVip = false
    if (list.length==0) throw new ParameterException('订单表不能为空') 
    
    // 1. 确认是否会员
    // 如果phone不为空但会员表里没有 -> 报错
    // 如果phone不为空且正确，会员价处理
    console.log(phone)
    if (phone) {
        let member = await Membership.findOne({where:{phone}})
        if (!member) throw new global.errs.ParameterException('会员电话号码错误！')
        isVip = true
    }
    // 如果phone不为空且正确，会员价处理

    
    for (let i=0; i<list.length; i++){

        // 2. 确认商品编号
        // 有无存在该商品
        let pro = await Product.findOne({where:{productId:list[i].productId}})
        if (!pro) throw new global.errs.ParameterException(`商品编码【${list[i].productId}】不在商品表`)

        // 3.确认库存
        // list[productId,productNum] => 看这个库存够不够 inventory
        // 不够抛出错误
        // 有无库存
        let in_pro = await Inventory.findOne({where:{productId:list[i].productId}})
        if (!in_pro) throw new global.errs.ParameterException(`商品编码【${list[i].productId}】不在库存表`)
        console.log(list[i].productNumber,in_pro.productNumber)
        if (list[i].productNumber > in_pro.productNumber) throw new global.errs.ParameterException(`商品编码【${list[i].productId}】库存不足,还剩${in_pro.productNumber}件`)

        // 4. 处理要输出的数据
        let price = pro['dataValues'].productPrice
        let vipPrice = pro['dataValues'].productVipPrice
        let num = list[i].productNumber
        pro['dataValues'].productNumber = list[i].productNumber
        pro['dataValues'].isVip = isVip?'是':'否',
        pro['dataValues'].productPrice = isVip?vipPrice:price
        pro['dataValues'].proTotalPrice = isVip?vipPrice*num:price*num
        pro['dataValues'].proInventory = in_pro.productNumber
        delete pro['dataValues'].created_at
        delete pro['dataValues'].id
        delete pro['dataValues'].productVipPrice
        delete pro['dataValues'].updated_at
        products.push(pro['dataValues'])
    }



    throw new global.errs.Success({
        list: products
    })
})

// 提交表单
router.post('/postOrder',async (ctx) => {
    let body = ctx.request.body
    let {list,totalPrice,phone} = body
    // console.log(list)
    // 1. membership 会员积分 总价格*0.1
    if (list.length==0) throw new ParameterException('订单表不能为空') 
    
    if (phone) {
        console.log(totalPrice,phone)
        let member = await Membership.findOne({ where: {phone} })
        if (!member) throw new ParameterException('会员不存在，请检测手机号码！') 
        await Membership.update({
            credit: totalPrice*0.1+member.credit
        },{where: {phone}})
    }

    let orderId = `${Date.now()}-${Math.floor(Math.random(0, 1) * 10000000)}`
    await Order.create({orderId})

    for (let i=0; i<list.length; i++){
        let {productId,productPrice,productNumber,proInventory,proTotalPrice,productName,productBrand,productKind} = list[i]
        // 2. sale 写入
        new_sale = {
            orderId,
            productId,
            productName,
            productBrand,
            productKind,
            productNumber,
            productPrice,
            proTotalPrice
        }
        await Sale.create(new_sale)
        // 3. 减库存
        await Inventory.update({
            productNumber: proInventory - productNumber
        },{where:{productId}})
    }
    throw new global.errs.Success('提交成功')
})

module.exports = router