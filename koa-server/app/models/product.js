const { Sequelize, Model } = require('sequelize')
const { dbsequelize } = require('../../core/db')
const { unset, clone, isArray } = require('lodash')
class Product extends Model {}
// orm 
Product.init({
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    productId: {
        type: Sequelize.STRING,
        unique: true 
    }, 
    productName: {
        type: Sequelize.STRING,
        unique: true
    },
    productKind: Sequelize.STRING,
    productBrand: Sequelize.STRING,
    productCost: Sequelize.INTEGER,
    productPrice: Sequelize.INTEGER,
    productVipPrice: Sequelize.INTEGER
},{sequelize:dbsequelize,tableName:'product'})

module.exports = Product