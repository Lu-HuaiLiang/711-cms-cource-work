const Router = require('koa-router')
const router = new Router({
    prefix: '/inventory'
})

const Inventory = require('../models/inventory')
const Product = require('../models/product')

router.get('/getAllInventory', async (ctx) => {
    const inventorys = await Inventory.findAll(), list = []
    for (let i=0; i<inventorys.length; i++) {
        let inventory = inventorys[i]
        let product = await Product.findOne({where:{productId:inventory.productId}})
        inventory['dataValues'].productName = product.productName
        delete inventory['dataValues'].created_at
        delete inventory['dataValues'].updated_at
        list.push(inventory['dataValues'])
    }
    throw new global.errs.Success({list})
})

// router.post('/DeleteInventory',async (ctx)=>{
//     let {productId} = ctx.request.body    
//     let update_product = ctx.request.body
//     Product.update(update_product,{
//         where: { productId }
//     })
// })


// 只能修改库存数量
router.post('/AlterInventory',async (ctx)=>{
    let {productId,productNumber} = ctx.request.body
    if (productNumber<0) throw new global.errs.ParameterException('商品库存数量不能小于0')
    let inventory = await Inventory.findOne({
        where: { productId }
    })
    if (!inventory) throw new global.errs.ParameterException()
    Inventory.update({productNumber},{
        where: { productId }
    })
    throw new global.errs.Success("修改成功")
})


module.exports = router