const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const autoprefixer = require('autoprefixer');
const ROOT = path.resolve( __dirname, 'src' );


module.exports = {

    // context: ROOT,


    resolve: {
        extensions: ['.ts', '.js']
    },

    entry: {
        app: path.join(__dirname, 'src', 'index')
    },
    // output: {
    //     filename: 'bundle.js',
    //     path: path.resolve(__dirname, 'build')
    // },
    plugins: [
        new CleanWebpackPlugin(['build'], {verbose: true}),
        new HtmlWebpackPlugin({template: './src/index.html', filename: 'index.html'}),
        new ExtractTextPlugin('styles-[name].css')
    ],
    devtool: 'source-map',
    module: {
        rules: [
            {
                test: /\.ts$/,
                exclude: /node_modules/,
                use: {
                    loader: 'tslint-loader',
                    options: {
                        emitErrors: true
                    }
                },
                enforce: 'pre'
            },

            {
                test: /\.ts$/,
                exclude: [ /node_modules/ ],
                use: [
                    'ng-annotate-loader',
                    'awesome-typescript-loader'
                ]
            },

            {
                test: /\.(sass|scss)$/, exclude: /node_modules/, use: ['css-hot-loader']
                .concat(ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                sourceMap: true
                            }
                        },
                        {
                            loader: 'postcss-loader',
                            options: {
                                plugins: [
                                    autoprefixer({
                                        browsers: ['ie >= 8', 'last 4 version']
                                    })
                                ],
                                sourceMap: true
                            }
                        },
                        {
                            loader: 'sass-loader'
                        }
                    ]
                }))
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: {
                    loader: 'file-loader',
                    options: {
                        name: 'assets/fonts/[name].[ext]'
                    },
                }
            },
            {
                test: /\.(jpg|svg|png|gif|ico)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: 'assets/img/[name].[ext]'
                        }
                    }
                    // {
                    //     loader: 'url-loader',
                    //     options: {
                    //         limit: 8192
                    //     }
                    // }
                ]
            },
            {
                test: /.html$/,
                exclude: /index.html$/,
                use: 'html-loader'
            }
        ]
    }
}
;