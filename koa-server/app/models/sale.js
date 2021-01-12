const { Sequelize, Model, TimeoutError } = require('sequelize')
const { dbsequelize } = require('../../core/db')

class Sale extends Model {

}

Sale.init({
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    orderId: Sequelize.STRING,
    productId: Sequelize.STRING,
    productName: Sequelize.STRING,
    productBrand: Sequelize.STRING,
    productKind: Sequelize.STRING,
    productNumber: Sequelize.INTEGER,         
    productPrice: Sequelize.INTEGER,
    proTotalPrice: Sequelize.INTEGER,
    proTotalProfit: Sequelize.INTEGER,
    proTotalCost: Sequelize.INTEGER

},{sequelize:dbsequelize,tableName:'sale'})

module.exports = Sale