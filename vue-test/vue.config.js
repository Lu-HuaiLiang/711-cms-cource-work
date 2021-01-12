
const BASR_URL = process.env.NODE_ENV === 'production' ? '/' : '/'
const path = require('path')
const resolve = dir => path.join(__dirname,dir)

module.exports = {
    publicPath: BASR_URL,
    lintOnSave: false,
    chainWebpack: config => {
        config.resolve.alias
            .set('@',resolve('src'))
            .set('_c',resolve('src/components'))
            .set('_v',resolve('src/views'))

        config.module.rule('vue').test(/\.vue$/).use('iview-loader').loader('iview-loader').tap(options => {
            options = {prefix:true}
            return options
        })
    },
    // 打包时不生成map文件，减少打包的体积
    productionSourceMap: true,
    // 代理解决跨域
    devServer: {
        proxy: 'http://localhost:8082'
    }
}