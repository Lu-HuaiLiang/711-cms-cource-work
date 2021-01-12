const path = require('path')
const {merge} = require('webpack-merge')
const commonConfig = require('./webpack.common')
// const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const prodConfig = {
    output:{
        filename: '[name].[contenthash].js',
        chunkFilename: '[name].[contenthash].js',
        path: path.resolve(__dirname,'../dist')
    },
    mode: 'production',
    plugins: [],
    optimization: {},
    module: {},
}

module.exports = merge(prodConfig,commonConfig)