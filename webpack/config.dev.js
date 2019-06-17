/* eslint-disable import/no-extraneous-dependencies */
const path = require('path');
const webpack = require('webpack');
const CleanPlugin = require('clean-webpack-plugin');
const autoprefixer = require('autoprefixer-stylus');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

const plugins = require('./plugins');
/* eslint-enable import/no-extraneous-dependencies */

const context = path.resolve(__dirname, '../');

module.exports = {
	context,
	mode: 'development',
	entry: {
		all: [
			require.resolve('core-js/stable'),
			require.resolve('regenerator-runtime/runtime'),
			require.resolve('jquery'),
			'./src/js/index.js',
			'./src/styl/all.styl',
		],
		fonts: './src/styl/fonts.styl',
		pug: './webpack/pug.js',
		images: './webpack/images.js',
	},

	output: {
		filename: 'js/[name].js',
		path: path.resolve(context, 'dev/'),
		pathinfo: true,
	},

	resolve: {
		alias: {
			jquery: path.resolve(context, 'node_modules/jquery/src/jquery.js'),
		},
	},

	module: {
		rules: [
			// js loader
			{
				test: /\.js$/,
				exclude: [/node_modules/],
				use: {
					loader: require.resolve('babel-loader'),
				},
			},

			// stylus loader
			{
				test: /\.(styl|stylus)$/,
				exclude: /node_modules/,
				use: [
					{
						loader: 'file-loader',
						options: {
							name: 'css/[name].css',
						},
					},
					{
						loader: 'extract-loader',
						options: {
							publicPath: '../',
						},
					},
					{
						loader: 'css-loader',
						options: {
							sourceMap: true,
						},
					},
					{
						loader: 'stylus-loader',
						options: {
							compress: false,
							use: [autoprefixer({ browsers: ['> 1%', 'ie > 9', 'iOS > 6'], hideWarnings: true })],
						},
					},
				],
			},

			// pug loader
			{
				test: /\.(pug|jade)$/,
				exclude: /node_modules/,
				use: [
					{
						loader: 'file-loader',
						options: {
							name: '[path][name].html',
							context: 'src/pug/',
						},
					},
					{
						loader: 'pug-html-loader',
						options: {
							pretty: true,
						},
					},
				],
			},

			// images loader
			{
				test: /\.(jpg|jpeg|png|svg|ico|gif)$/,
				exclude: /node_modules/,
				use: [
					{
						loader: 'file-loader',
						options: {
							name: '[path][name].[ext]',
							context: 'src/',
						},
					},
					{
						loader: 'image-webpack-loader',
						options: {
							svgo: {
								plugins: [{ removeEmptyAttrs: true }],
							},
							optipng: {
								optimizationLevel: 5,
							},
							mozjpeg: {
								quality: 80,
							},
						},
					},
				],
			},

			// font loader
			{
				test: /\.(eot|ttf|woff|woff2)$/,
				exclude: /node_modules/,
				use: {
					loader: 'file-loader',
					options: {
						name: '[path][name].[ext]',
						context: 'src/',
					},
				},
			},
		],
	},

	target: 'web',
	devtool: 'eval',
	stats: {
		colors: true,
		modules: false,
	},
	watch: true,
	watchOptions: {
		poll: 1000,
		ignored: /node_modules/,
	},

	plugins: [
		...plugins,
		new BrowserSyncPlugin({
			host: 'localhost',
			port: 3000,
			server: {
				baseDir: 'dev',
				directory: true,
			},
			startPath: '/index.html',
		}),
	],
};
