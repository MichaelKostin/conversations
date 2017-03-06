'use strict';

const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

let config = {
    entry: {
        main: __dirname + '/src'
    },
    output: {
        path: __dirname + '/build',
        filename: 'bundle.js'
    },
    devtool: 'source-map',
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015', 'react']
                }
            },
            {
                test: /\.less$/,
                loader: ExtractTextPlugin.extract( ['css','less'])
            },
            {
                test: /\.(png|jpg|gif)$/,
                loader: 'file'
            },
            {
                test: /\.html$/,
                loader: 'file?name=[name].[ext]'
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin('main.css')
    ],
    devServer: {
        host: 'localhost',
        port: 3007,
        proxy: {
            '*': 'http://localhost:3002'
        },
        headers: { "X-Server": "webpack" }
    }
};

if (process.env.NODE_ENV === 'production') {
    //Remove sourcemap and add minification
    config.devtool = false;
    config.plugins.push(
        new webpack.optimize.UglifyJsPlugin({
            compress: { warnings: false }
        })
    );

}

module.exports = config;
