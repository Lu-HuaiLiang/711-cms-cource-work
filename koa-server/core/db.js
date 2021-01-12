const { Sequelize, Model } = require('sequelize')
const { unset, clone, isArray } = require('lodash')
const {
    dbName,
    host,
    port,
    user,
    password
} = require('../config/config').database

const dbsequelize = new Sequelize(dbName,user,password,{
    // 这里记得按照‘mysql2’
    dialect: 'mysql', // 指定数据库类型
    host,port,
    logging: false, // 显示具体的SQL操作
    timezone: '+08:00',
    define: {
        // 删除是否假删除
        paranoid: false,
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: 'deleted_at'
    }
})

dbsequelize.sync({
    force: false
})

module.exports = {
    dbsequelize
}