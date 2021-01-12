const Router = require('koa-router')
const Product = require('../models/product')
const Inventory = require('../models/inventory')
const router = new Router({
    prefix: '/product'
})
const { Op } = require('sequelize')
const moment = require('moment');

router.get('/getAllProduct',async(ctx)=>{
    const products = await Product.findAll(), list = []
    products.forEach(product=>{
        // let orderDay = moment(product['dataValues'].created_at).format('YYYY-MM-DD HH:mm:ss')
        delete product['dataValues'].created_at
        delete product['dataValues'].updated_at
        // product['dataValues'].orderDay = orderDay
        list.push(product['dataValues'])
    })
    throw new global.errs.Success({list})
})

router.post('/DeleteProduct',async (ctx) => {
    // Post http://localhost:8082/product/deleteProduct
    // {
    //     "productId":123
    // }
    let productId = ctx.request.body.productId
    // 1.查找有无这个商品
    let product = await Product.findOne({
        where:{productId}
    })
    if (!product) throw new global.errs.ParameterException('查找有无该商品！')
    // 2.如果有的话，就把这个商品从商品表删掉
    await Product.destroy({
        where: {productId}
    })
    // 3.把商品从库存表删掉
    await Inventory.destroy({
        where: {productId}
    })

    throw new global.errs.Success({},'删除成功')
})


// Update 
router.post('/UpdateProduct',async (ctx) => {
    let {alter_product,productId} = ctx.request.body
    let product = await Product.findOne({
        where:{productId}
    })
    if (!product) throw new global.errs.ParameterException('查找有无该商品！')
    await Product.update(alter_product,{
        where: { productId }
    })
    throw new global.errs.Success({},"修改成功")
})

router.post('/AddProduct',async (ctx) => {

    console.log(ctx.request.body)

    let {
        productId,productName,productPrice,productCost,
        productKind,productVipPrice,productBrand,
        productNumber //初始化商品库存
    } = ctx.request.body.product

    // 1.查找有无这个商品编号。如果有的话，报错
    let product = await Product.findOne({
        where: {
            [Op.or]:[{
                productId
            },{
                productName
            }]
        }
    })
    if(product) throw new global.errs.ParameterException('商品名或编号已存在！')


    // 2.商品表增加 [productId,productName,productPrice,productKind,productBrand,productVipPrice,productCost]
    let new_product = {
        productId,productName,productPrice,productVipPrice,
        productCost,productKind,productBrand
    }
    await Product.create(new_product)

    // 3.库存表添加 [productId,productName,productNumber]
    let new_inventory = {
        productId,productNumber
    }

    await Inventory.create(new_inventory)
    throw new global.errs.Success({},"创建成功")
})

module.exports = router;


