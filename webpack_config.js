const path = require('path');
const extraText = require('extract-text-webpack-plugin');
const htmlPlugin = require('html-webpack-plugin');

const cssFile = new extraText('style.css');
const htmlFile = new htmlPlugin({
	template:'./src/index.html'
});

module.exports = {
	entry:'./src/app.js',
	output:{
		path:path.resolve(__dirname,'dist'),
		filename:'bundel.js'
	},
	mode:'development',
	module:{
		rules:[
			// Remove it and look what heppend with your code
			{
				test:/\.js$/,
				use:['babel-loader']
			},
			{
				test:/\.css$/,
				use:cssFile.extract({
					use:'css-loader'
				})
			},
			{
				test:/\.html$/,
				use:'html-loader'
			},
			{
				test:/\.(jpeg|jpg|png)$/,
				use:[
					{
						loader:'file-loader',
						options:{
							name:'[name].[ext]', // [hash].[ext]
							outputPath:'img/',
							publicPath:'img/'
						}
					}
				]
			}
		]
	},
	plugins:[
		cssFile,
		htmlFile
	]
}
