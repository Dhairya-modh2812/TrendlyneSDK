const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const webpack = require("webpack");
const devConfig = require("./.env.json");
const prodConfig = require("./.env.production.json");
const env = () => process.env.NODE_ENV === "production" ? JSON.stringify(prodConfig) : JSON.stringify(devConfig); 
const webpack_entries_config = require('./webpack_entries_config.js')
const appConfigs = require('./app.config.js')


const { apps = [] } = appConfigs || {};

let multipleHtmlWebpackPlugins = apps.map(item => {
    return new HtmlWebpackPlugin({
        template: path.join(__dirname, `src/${item.directory}`, "index.html"),
        filename: `${item.filename}.html`,
        chunks: item.chunks
    })
});


let indexPoints = apps.map(item => ({ from: new RegExp(`^${item.baseUrl}`), to: `/${item.filename}.html`}))

let entry = process.env.npm_config_entry || apps[0].entryPoint;

let defaultIndex = apps.findIndex(item => entry.includes(item.entryPoint))

let defaultEntry;
if(defaultIndex == -1) {
    defaultEntry = apps[0]
}else {
    defaultEntry = apps[defaultIndex]
}
module.exports = {
    entry: {
    ...webpack_entries_config.entries
    },
    output: {
        path: path.join(__dirname, "build"),
        filename: process.env.NODE_ENV === "production" ? "[name].[contenthash].js": "[name].bundle.js",
        clean: true,
    },
    mode: process.env.NODE_ENV || "development",
    resolve: {
        modules: [
            path.resolve(__dirname, "src/[name]"),
            "node_modules"
        ],
    },
    devServer: {
        port: 3000,
        open: false,
        historyApiFallback: {
            index: `/${defaultEntry.filename}.html`,
            rewrites: indexPoints
        },
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: ["babel-loader"]
            },
            {
                test: /\.(css|scss)$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        // This is required for asset imports in CSS, such as url()
                        options: {publicPath: ""},
                    },
                    "css-loader",
                    "postcss-loader",
                    "sass-loader"
                ],
            },
            {
                test: /\.(jpg|jpeg|png|gif|mp3|svg)$/i,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                        outputPath: '_assets/'    // where the fonts will go
                        // publicPath: PROD_ASSETS_DIR       // override the default path
                    }
                }],
            }
        ],
    },
    plugins: [
        ...multipleHtmlWebpackPlugins,
        new MiniCssExtractPlugin({
            filename: process.env.NODE_ENV === "production" ? "[name].[contenthash].css": "[name].bundle.css",
        }),
        new webpack.DefinePlugin({
            "process.env": env()
        }),
        
    ],
}
