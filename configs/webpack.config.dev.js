const path = require("path");
const baseConfig = require("./webpack.config");
const { merge } = require("webpack-merge");

module.exports = merge(baseConfig, {
    output: {
        filename: "index.js",
        path: baseConfig.output.path,
    },

    mode: "development",

    devServer: {
        port: 3693,
        static: {
            directory: path.resolve(__dirname, "../dist"),
        },
        compress: true,
        // open: true,
    },
});
