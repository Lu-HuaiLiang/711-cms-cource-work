const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')
// const AddAssetHtmlWebpackPlugin = require('add-asset-html-webpack-plugin')
const webpack = require('webpack')
// const fs = require('fs')

const plugins = [
    new HtmlWebpackPlugin({
        template: 'src/index.html',
    })
    ,new CleanWebpackPlugin()
]

// const files = fs.readdirSync(path.resolve(__dirname,'../dll'))
// files.forEach(file => {
//     if (/.*\.dll.js/.test(file)) {
//         plugins.push(new AddAssetHtmlWebpackPlugin({
//             filepath: path.resolve(__dirname,'../dll',file)
//         }))
//     }
//     if (/.*\.manifest.json/.test(file)) {
//         plugins.push(new webpack.DllReferencePlugin({
//             manifest: path.resolve(__dirname,'../dll/vendors.manifest.json')
//         }))
//     }
// })



module.exports = {
    entry: {
        main:'./src/index.js'
    },
    optimization: {
        usedExports: true,
        splitChunks: {
            chunks: 'all',
            cacheGroups: {
                vendors: {
                    test: /[\\/]node_modules[\\/]/,
                    priority: -10,
                    name: 'vendors'
                }
            }
        }
    },
    // 不提示性能上的问题
    performance: false,
    plugins,
    module: {
        rules: [
            {
                test: /\.(jpg|gif|png)$/,
                use: {
                    loader: 'file-loader',
                    options: {
                        name: '[name]_[hash].[ext]',
                        outputPath: 'images/',
                        limit: 10240
                    }
                }
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                    // 配置项option已经在.babelrc
                }
            }
        ]
    }
}