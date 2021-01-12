const Router = require('koa-router')
const router = new Router({
    prefix: '/discard'
})
const Product = require('../models/product')
const Discard = require('../models/discard')
const Inventory = require('../models/inventory')
const { route } = require('./inventory')

router.post('/createDiscard', async (ctx) => {
    let {productId,discardNumber} = ctx.request.body
    let product = await Product.findOne({
        where: {productId}
    })
    if (!product) throw new global.errs.ParameterException('找不到该商品')
    let {productName,productCost} = product


    let in_pro = await Inventory.findOne({where: {productId}})
    if (in_pro.productNumber<discardNumber) throw new global.errs.ParameterException(`商品编码【${productId}】库存不足,还剩${in_pro.productNumber}件`)
    
    // Discard 生成新的记录
    let new_discard = { productId,productName,productCost,discardNumber }
    await Discard.create(new_discard)

    // Inventory 减去报销的
    await Inventory.update({
        productNumber: in_pro.productNumber-discardNumber
    },{where:{productId}})

    throw new global.errs.Success({},'报销成功！')
})

router.get('/getAllDiscard', async (ctx) => {
    const items = await Discard.findAll(), list = []
    items.forEach(item=>{
        // let orderDay = moment(product['dataValues'].created_at).format('YYYY-MM-DD HH:mm:ss')
        delete items['dataValues'].created_at
        delete items['dataValues'].updated_at
        // product['dataValues'].orderDay = orderDay
        list.push(items['dataValues'])
    })
    throw new global.errs.Success({list})
})

module.exports = router;