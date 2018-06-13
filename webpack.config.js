const path = require("path");
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
    mode: "development",
    watch: true,
    entry: "./src/index.js",
    devServer: {
        contentBase: path.join(__dirname, "public"),
    },
    devtool: "inline-source-map",
    output: {
        filename: "bundle.js",
        path: path.join(__dirname, "public/")
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
            {from: "src/index.html"}
        ]),
        new CopyWebpackPlugin([
            {from: "src/assets"}
        ])
    ]
}