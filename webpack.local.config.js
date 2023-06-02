const webpack = require('webpack')
const { merge } = require('webpack-merge')
const path = require('path')
const BundleTracker = require('webpack-bundle-tracker')
const baseConfig = require('./webpack.config.js')

const staticPath = '/static/bundles/local/'

module.exports = merge(baseConfig, {
    mode: 'development',
    output: {
        path: path.join(__dirname, '../../../../', staticPath, "trendlynesdk-bundles"),
        publicPath: path.join(staticPath, "trendlynesdk-bundles/"),
    },
    devtool: 'source-map',
    plugins: [
        new BundleTracker({
            filename: '../../../../static/webpack-trendlynesdk-stats-local.json',
            path: path.join('../../../../', staticPath, 'trendlynesdk-bundles')
        }),
        new webpack.ProgressPlugin(),
    ]
})
