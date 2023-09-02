const path = require("path");
const MiniCSSExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    entry: "./src/js/index.js",
    output: {
        path: path.resolve(__dirname, "../dist"),
    },

    module: {
        rules: [
            {
                test: /\.scss$/i,
                use: [MiniCSSExtractPlugin.loader, "css-loader", "sass-loader"],
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/i,
                type: "asset/resource",
            },
            {
                test: /\.html$/,
                use: ["html-loader"],
            },
        ],
    },

    plugins: [
        new MiniCSSExtractPlugin(),
        new HtmlWebpackPlugin({ template: "./src/index.html" }),
    ],
};
