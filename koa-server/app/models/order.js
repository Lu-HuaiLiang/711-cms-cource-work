const { Sequelize, Model } = require('sequelize')
const { dbsequelize } = require('../../core/db')

class Order extends Model {

}

Order.init({
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    orderId: {
        type: Sequelize.STRING,
        unique: true
    }
},{sequelize:dbsequelize,tableName:'order'})

module.exports = Order