const path = require('path')
const webpack = require('webpack')
const {merge} = require('webpack-merge')
const commonConfig = require('./webpack.common')
const devConfig = {
    output:{
        filename: '[name].js',
        path: path.resolve(__dirname,'../dist')
    },
    mode: 'development',
    devtool: 'cheap-module-eval-source-map',
    devServer: {
        contentBase: path.join(__dirname, "dist"),
        compress: true,
        open: true,
        port: 9000
    },
    plugins:[
        new webpack.HotModuleReplacementPlugin()
    ],
    module: {
        rules: [          {
            test: /\.css$/,
            use: [
                'style-loader',
                'css-loader',
                'postcss-loader'
            ]
        },]
    }
}

module.exports = merge(devConfig,commonConfig)