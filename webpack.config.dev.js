var path = require('path');
var webpack = require('webpack');
var HtmlwebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var ROOT_PATH = path.resolve(__dirname);		
var APP_PATH = path.resolve(ROOT_PATH, 'src');			
var BUILD_PATH = path.resolve(ROOT_PATH, 'build');	

var es3ifyWebpackPlugin=require('es3ify-webpack-plugin');//ie8兼容保留字插件


var cwd = process.cwd();


module.exports = {
	entry:{
		app:path.resolve(APP_PATH,'app.js')
	},
	output:{
		path: BUILD_PATH,
        publicPath: '/',    
		filename:'[name]-[hash:8].js'
	},
	resolve:{
		extensions:['.js','.jsx'],
		alias: {
			'@': APP_PATH,
		}
	},
	//启动dev source map，出错以后就会采用source-map的形式直接显示你出错代码的位置。
	devtool:'eval-source-map',
	devServer:{
		historyApiFallback:true,
		hot:true,
		inline:true,
		host: 'localhost',
        port: 8080,
		open : true,
		proxy:{
			'/':{
				target:'https://testauth.gf.com.cn',
				changeOrigin: true,
				secure: false
			}
		}
	},
	module:{
		loaders: [
	      {
	        test: /\.jsx?$/,
	        loader: 'babel-loader',
	        include: APP_PATH,
	      },
          {
            test: /\.(css|scss)$/,
            include: APP_PATH,
            use: ExtractTextPlugin.extract({
                fallbackLoader: 'style-loader',
                loader: ['css-loader', 'sass-loader']
            })
          },
            {
                test: /\.(jpg|jpeg|png|gif)$/,
                loader: 'url-loader',
				include: APP_PATH,
                query: {
                    limit: 8192,
                    name: '[name]-[hash:8].[ext]'
                }
            },
            {
                test: /\.(ico|eot|otf|webp|svg|ttf|woff|woff2)(\?.*)?$/,
                loader: 'file-loader',
				include: APP_PATH,
                query: {
                    name: '[name]-[hash:8].[ext]',
                },
            }

	    ]
	},
    plugins: [
	    new HtmlwebpackPlugin({
	      template: path.resolve(ROOT_PATH, 'index.html'),
	      filename: 'index.html',
	      inject: 'body'
	    }),
		new ExtractTextPlugin('css/[name]-[hash:8].css'),
		new webpack.ProvidePlugin({//全局变量插件
			//当webpack加载到某个js模块里，出现了未定义且名称符合（字符串完全匹配）配置中key的变量时，会自动require配置中value所指定的js模块。
			//不能为node_modules里的js注入
			$: 'jquery',
			jQuery:'jquery',
			'window.jQuery':'jquery',
			'window.$': 'jquery',
       }),
       new es3ifyWebpackPlugin(),//ie8兼容插件
	]
}