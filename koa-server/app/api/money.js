const Router = require('koa-router')
const router = new Router({
    prefix: '/money'
})
const { Op,Sequelize } = require('sequelize')
const moment = require('moment');
const Product = require('../models/product');
const Sale = require('../models/sale')
const Discard = require('../models/discard')

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
    ],

    all: [
        {
            title: '销售额',
            key: 'salePrice'
        },
        {
            title: '成本',
            key: 'saleCost',
            sortable: true
        },
        {
            title: '报销成本',
            key: 'discardMoney',
            sortable: true
        },
        {
            title: '利润',
            key: 'profit',
            sortable: true
        }
    ]
}

router.post('/getBestSale', async (ctx) => {

    let {date1,date2,ByWhat} = ctx.request.body

    if (ByWhat == 'all') {
        let date = new Date()
        let sales = await Sale.findAll({
            where: {
                created_at:{
                    [Op.gte]: date1,
                    [Op.lte]: date2
                }
            },
            attributes: [
                [Sequelize.fn('SUM', Sequelize.col('proTotalPrice')), 'salePrice'],
                [Sequelize.fn('SUM', Sequelize.col('proTotalCost')), 'saleCost'],
                [Sequelize.fn('SUM', Sequelize.col('proTotalProfit')), 'profit'],
            ]
        })
    
        let discardMoney = await Discard.findAll({
            where: {
                created_at:{
                    [Op.gte]: new Date(date.getFullYear(),date.getMonth(),0),
                    [Op.lte]: new Date(date.getFullYear(),date.getMonth(),date.getDate()+1),
                }
            },
            attributes: [
                [Sequelize.fn('SUM', Sequelize.col('discardMoney')), 'discardNumber'],
            ]
        })
    
        discardMoney = discardMoney[0]['dataValues'].discardNumber
        if (!discardMoney) discardMoney = 0
    
        let {salePrice, saleCost, profit} = sales[0]['dataValues']
        if (!salePrice) {
            salePrice = 0, saleCost = 0, profit = 0
        }

        let salesByDate = [{salePrice, saleCost, discardMoney, profit: profit-discardMoney}]
        
        throw new global.errs.Success({sales:salesByDate,columns:columns[ByWhat]})
    }

    
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



// 本月的盈亏
router.get('/getMonthSale', async (ctx) => {
    // salePrice,saleCost,discardMoney,profit
    let date = new Date()
    let sales = await Sale.findAll({
        where: {
            created_at:{
                [Op.gte]: new Date(date.getFullYear(),date.getMonth(),0),
                [Op.lte]: new Date(date.getFullYear(),date.getMonth(),date.getDate()+1),
            }
        },
        attributes: [
            [Sequelize.fn('SUM', Sequelize.col('proTotalPrice')), 'salePrice'],
            [Sequelize.fn('SUM', Sequelize.col('proTotalCost')), 'saleCost'],
            [Sequelize.fn('SUM', Sequelize.col('proTotalProfit')), 'profit'],
        ]
    })

    let discardMoney = await Discard.findAll({
        where: {
            created_at:{
                [Op.gte]: new Date(date.getFullYear(),date.getMonth(),0),
                [Op.lte]: new Date(date.getFullYear(),date.getMonth(),date.getDate()+1),
            }
        },
        attributes: [
            [Sequelize.fn('SUM', Sequelize.col('discardMoney')), 'discardNumber'],
        ]
    })

    discardMoney = discardMoney[0]['dataValues'].discardNumber
    if (!discardMoney) discardMoney = 0

    let {salePrice, saleCost, profit} = sales[0]['dataValues']
    if (!salePrice) {
        salePrice = 0, saleCost = 0, profit = 0
    }
    throw new global.errs.Success({
        salePrice, saleCost, discardMoney, profit: profit-discardMoney
    })
})



module.exports = router;