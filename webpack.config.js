const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {resolve} = require('path');

// const nodeExternals = require('webpack-node-externals');


const tsRule = {
    test: /\.tsx?$/,
    exclude: /node_modules/,
    use: 'ts-loader'
}

const plugins = [
    new HtmlWebpackPlugin({
        template: 'src/popup-page/popup.html',
        filename: 'popup.html', 
        chunks: ['popup'],
        scriptLoading: 'module'
    }),
    new CopyPlugin({
        patterns: [
            {from: "public", to: "."}
        ]
    }),
    new CleanWebpackPlugin(),
];

module.exports = {
    resolve: {
        fallback: {
            // crypto: require.resolve("crypto-browserify"), 
            // stream: require.resolve("stream-browserify"), 
            // assert: require.resolve("assert"), 
            // http: require.resolve("stream-http"), 
            // https: require.resolve("https-browserify"), 
            // os: require.resolve("os-browserify"), 
            // url: require.resolve("url") 
            // "buffer": require.resolve("buffer/")
        },
        extensions: [".js"],
        mainFields: ["main"],
    },
    mode: "development",
    target: 'web',
    // externals: [nodeExternals()],
    devtool: 'cheap-module-source-map',
    entry: {
        popup: './src/popup-page/popup.js',
        contentscript: './src/contentscript.tsx',
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    output: {
        filename: '[name].js',
        path: resolve(__dirname, 'dist')
    },
    module: {
        rules: [tsRule],
    },
    optimization: {
        minimize: false,
    },
    plugins,
}