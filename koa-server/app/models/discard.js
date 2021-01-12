const { Sequelize, Model } = require('sequelize')
const { dbsequelize } = require('../../core/db')

class Discard extends Model {

}

Discard.init({
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    productId: Sequelize.STRING,
    productName: Sequelize.STRING,
    productCost: Sequelize.INTEGER,
    discardNumber: Sequelize.INTEGER      
},{
    sequelize:dbsequelize,
    tableName:'discard'
})

module.exports = Discard