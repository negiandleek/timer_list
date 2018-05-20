const path = require("path");
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
    mode: "development",
    watch: true,
    entry: "./public/src/index.js",
    devServer: {
        contentBase: path.join(__dirname, "dict"),
    },
    devtool: "inline-source-map",
    output: {
        filename: "bundle.js",
        path: path.join(__dirname, "dict/")
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options:{
                        presets:["env"]
                    }
                }
            },
        ]
    },
    plugins: [
        new CopyWebpackPlugin([
            {from: "public/src/my.js"},
            {from: "public/index.html"}
        ])
    ]
}