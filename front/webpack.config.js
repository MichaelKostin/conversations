'use strict';

const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry: {
        main: __dirname + '/src'
    },
    output: {
        path: __dirname + '/build',
        filename: 'bundle.js'
    },
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
        port: 8080,
        proxy: {
            '*': 'http://localhost:3002'
        },
        headers: { "X-Server": "webpack" }
    }
};
