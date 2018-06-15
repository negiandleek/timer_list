const path = require("path");
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    mode: "development",
    watch: true,
    entry: ["./src/scripts/index.js", "./src/styles/index.scss"],
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
            {
                test: /\.(sa|sc|c)ss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: "css-loader",
                        options: {
                            modules: false,
                            sourceMap: true,
                            importLoader: 2
                        }
                    },
                    "sass-loader"
                ]
            },
        ]
    },
    plugins: [
        new CopyWebpackPlugin([
            {from: "src/index.html"}
        ]),
        new CopyWebpackPlugin([
            {from: "src/assets"}
        ]),
        new MiniCssExtractPlugin({
            filename: "style.css",
        })
      
    ]
}