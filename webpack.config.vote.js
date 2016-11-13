var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var OpenBrowserWebpackPlugin = require('open-browser-webpack-plugin');
module.exports = {
    entry: path.resolve('./TestVote/index.js'),
    output: {
        path: './build',
        filename: 'bundle.js'
    },
    devServer: {
        contentBase: './build',
        port: 8990,
        inline: true
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                loader: 'babel',
                include: path.resolve('./TestVote'),
                exclude: /node_modules/
            },
            {
                test:/\.css$/,
                loader:'style!css'
            },
            {
                test:/\.(eot|svg|ttf|woff|woff2)/,
                loader:'url'
            },
            {
                test: /\.png/,
                loader: "url-loader?limit=10000&mimetype=image/png"
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './TestVote/index.html'
        }),
        new OpenBrowserWebpackPlugin({
            url: 'http://localhost:8990'
        })
    ]
}