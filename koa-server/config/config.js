module.exports = {
    environment: 'dev',
    database: {
      dbName: 'supermakert',
      host: 'localhost',
      port: 3306,
      user: 'root',
      password: '8834800qwe'
    },
    security: {
      secretKey: 'lajsdflsdjfljsdljfls',//用来生成token的key值
      expiresIn: 60 * 60//过期时间
    }
}
