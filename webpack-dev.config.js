const path = require('path');
const webpackMerge = require('webpack-merge');
const commonConfig = require('./webpack.config.js');
const DESTINATION = path.resolve( __dirname, 'build' );

module.exports = webpackMerge(commonConfig, {
    devtool: 'cheap-module-source-map',

    devServer: {
        contentBase: path.join(__dirname, ".tmp"),
        compress: true,
        port: 3000
    },

    output: {
        path: DESTINATION,
        filename: 'js/bundle.js'
    },

    // output: {
    //     filename: 'bundle.js',
    //     path: path.resolve(__dirname, 'build')
    // }

});
