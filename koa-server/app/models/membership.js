const { Sequelize, Model } = require('sequelize')
const { dbsequelize } = require('../../core/db')

class Membership extends Model {}

Membership.init({
    // 自己设置的编号，要考虑并发！
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    username: Sequelize.STRING,
    phone: {
        type: Sequelize.STRING,
        unique: true 
    },
    credit: Sequelize.INTEGER 
},{sequelize:dbsequelize,tableName:'membership'})  

module.exports = Membership