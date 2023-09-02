const baseConfig = require("./webpack.config");
const { merge } = require("webpack-merge");

module.exports = merge(baseConfig, {
    output: {
        filename: "index-[hash].js",
        path: baseConfig.output.path,
    },

    mode: "production",
});
