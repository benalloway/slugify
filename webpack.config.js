const path = require('path');
const webpack = require('webpack');

module.exports = {
    devtool: 'cheap-module-source-map',
	entry: [
        'react-hot-loader/patch',
        'webpack/hot/only-dev-server',
        'webpack-dev-server/client?http://127.0.0.1:3000',
        './src/index.js'
    ],
	output: {
		filename: 'bundle.js',
		path: path.resolve(__dirname, 'public')
	},
	module: {
		rules: [
			{
                test: /\.js$/,
                exclude: /node_modules/,
                use: require.resolve('babel-loader')
            },
		]
	},
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin(),
        new webpack.NoEmitOnErrorsPlugin()
    ],
    devServer: {
        host: '127.0.0.1',
        port: 3000,
        hot: true,
        contentBase: path.resolve(__dirname, 'public')
    }
};
