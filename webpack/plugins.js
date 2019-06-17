const path = require('path');
const CleanPlugin = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

const context = path.resolve(__dirname, '../');

const plugins = [
	new CleanPlugin({
		root: context,
		verbose: true,
		dry: false,
	}),
	new CopyPlugin([
		{
			from: 'src/robots.txt',
			to: '',
			context,
		},
	]),
];

module.exports = plugins;
