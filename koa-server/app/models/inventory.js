const { Sequelize, Model } = require('sequelize')
const { dbsequelize } = require('../../core/db')

class Inventory extends Model {}


// 商品名称库存不能要
Inventory.init({
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    productId: Sequelize.STRING,
    productNumber: Sequelize.INTEGER,   
},{sequelize:dbsequelize,tableName:'inventory'})

module.exports = Inventory