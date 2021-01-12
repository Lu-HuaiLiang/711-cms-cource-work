const { Sequelize, Model } = require('sequelize')
const { dbsequelize } = require('../../core/db')

class Administrators extends Model {}

Administrators.init({
    // 自己设置的编号，要考虑并发！
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true 
    },
    username: {
        type: Sequelize.STRING,
        unique: true
    },
    password: Sequelize.STRING,
    phone: Sequelize.STRING,
    role: Sequelize.INTEGER
},{sequelize:dbsequelize,tableName:'administrators'})  

module.exports = Administrators