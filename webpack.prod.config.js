const webpack = require('webpack')
const { merge } = require('webpack-merge')
const path = require('path')
const BundleTracker = require('webpack-bundle-tracker')
const baseConfig = require('./webpack.config.js')
const CompressionPlugin = require('compression-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')

const staticPath = '/static/bundles/prod/'

module.exports = merge(baseConfig, {
    mode: 'production',
    output: {
        path: path.join(__dirname, '../../../../', staticPath, "trendlynesdk-bundles"),
        publicPath: "https://cdn-static.trendlyne.com/static/prod/trendlynesdk-bundles/",
    },
    devtool: 'source-map',
    optimization: {
        minimize: true,
        minimizer: [
            new TerserPlugin(),
            new CssMinimizerPlugin(),
        ],
    },
    plugins: [
        new BundleTracker({
            filename: '../../../../static/webpack-trendlynesdk-stats-prod.json',
            path: path.join('../../../../', staticPath, 'trendlynesdk-bundles')
        }),
        new webpack.ProgressPlugin(),
        new CompressionPlugin({
            filename: '[path][base].gz[query]',
            test: /\.(js|css|html|svg)$/,
            compressionOptions: { level: 1 },
            threshold: 64,
        })
    ]
})
