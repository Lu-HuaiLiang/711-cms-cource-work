const Router = require('koa-router')
const router = new Router({
    prefix: '/money'
})
const { Op,Sequelize } = require('sequelize')
const moment = require('moment');
const Product = require('../models/product');
const Sale = require('../models/sale')
// productId,productName,productBrand,productKind,日期
// 最热销的商品名称 + 销售额 + 数量
// 最热销的品牌 + 销售额 + 数量
// 最热销的商品种类 + 销售额 + 数量

let columns = {
    productName: [
        {
            title: '商品名称',
            key: 'productName'
        },
        {
            title: '商品数量',
            key: 'sumProductNumber',
            sortable: true
        },
        {
            title: '商品销售总价',
            key: 'sumTotalPrice',
            sortable: true
        },
    ],
    
    productKind: [
        {
            title: '商品种类',
            key: 'productKind'
        },
        {
            title: '商品数量',
            key: 'sumProductNumber',
            sortable: true
        },
        {
            title: '商品销售总价',
            key: 'sumTotalPrice',
            sortable: true
        },
    ],
    
    productBrand: [
        {
            title: '商品品牌',
            key: 'productBrand'
        },
        {
            title: '商品数量',
            key: 'sumProductNumber',
            sortable: true
        },
        {
            title: '商品销售总价',
            key: 'sumTotalPrice',
            sortable: true
        },
    ]
}

router.post('/getBestSale', async (ctx) => {
    let {date1,date2,ByWhat} = ctx.request.body, list = []
    let sales = await Sale.findAll({
        where: {
            created_at:{
                [Op.gte]: date1,
                [Op.lte]: date2
            }
        },
        group: [ByWhat],
        attributes: [ByWhat,[Sequelize.fn('SUM', Sequelize.col('productNumber')), 'sumProductNumber'],[Sequelize.fn('SUM', Sequelize.col('proTotalPrice')), 'sumTotalPrice']]
    })
    throw new global.errs.Success({sales,columns:columns[ByWhat]})
})

// 盈亏表

module.exports = router;