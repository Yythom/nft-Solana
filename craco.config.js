const path = require('path');
const WebpackBar = require('webpackbar');
const { addBeforeLoader, loaderByName } = require("@craco/craco");

const resolve = dir => path.resolve(__dirname, dir);
module.exports = (arvg) => { 
    return {
        webpack: {  
            alias: {
                '@': resolve('src')
            },
            plugins: [
                new WebpackBar(),
            ],
            configure: (webpackConfig) => {
                const wasmExtensionRegExp = /\.wasm$/;
                webpackConfig.resolve.extensions.push(".wasm");

                webpackConfig.module.rules.forEach((rule) => {
                    (rule.oneOf || []).forEach((oneOf) => {
                        if (oneOf.loader && oneOf.loader.indexOf("file-loader") >= 0) {
                            oneOf.exclude.push(wasmExtensionRegExp);
                        }
                    });
                });

                const wasmLoader = {
                    test: /\.wasm$/,
                    include: /node_modules\/(bridge|token-bridge)/,
                    loaders: ["wasm-loader"],
                };

                addBeforeLoader(webpackConfig, loaderByName("file-loader"), wasmLoader);

                return webpackConfig;
            },
        },
    }
}