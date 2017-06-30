var path = require('path');
var webpack = require('webpack');
var HtmlwebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var ROOT_PATH = path.resolve(__dirname);	
var APP_PATH = path.resolve(ROOT_PATH, 'src');		
var BUILD_PATH = path.resolve(ROOT_PATH, 'build');		

var cwd = process.cwd();

var es3ifyWebpackPlugin=require('es3ify-webpack-plugin');//ie8兼容保留字插件



module.exports = {
	entry:{
		app:path.resolve(APP_PATH,'app.js')
	},
	output:{
		path: BUILD_PATH,
        publicPath: './',     
		filename:'js/[name]-[hash:8].js'
	},
	resolve:{
		extensions:['.js','.jsx'],
		alias: {
			'@': APP_PATH,
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
				publicPath: '../',
                fallbackLoader: 'style-loader',
                loader: ['css-loader','postcss-loader','sass-loader']
            })
          },
            {
                test: /\.(jpg|jpeg|png|gif)$/,
                loader: 'url-loader',
				include: APP_PATH,
                query: {
                    limit: 10000,
                    name: 'imgs/[name]-[hash:8].[ext]'
                }
            },
            {
                test: /\.(ico|eot|otf|webp|svg|ttf|woff|woff2)(\?.*)?$/,
                loader: 'file-loader',
				include: APP_PATH,
                query: {
                    name: 'fonts/[name]-[hash:8].[ext]',
                },
            }
	    ]
	},
    plugins: [
     	//这个使用uglifyJs压缩你的js代码
	    new webpack.optimize.UglifyJsPlugin({
			// {minimize: true}
			// 兼容压缩
			compress: {
				properties: false,
				warnings: false
			},
			output: {
				beautify: true,//这条本人测试发现可以取消,但是原兼容博主在博文中说道会 把引号被压缩掉
				quote_keys: true
			},
			mangle: {
				screw_ie8: false
			},
			sourceMap: true,
			comments: false,
		}),
		new es3ifyWebpackPlugin(),//ie8兼容插件		
	    new HtmlwebpackPlugin({
	      template: 'html-withimg-loader!' + path.resolve(ROOT_PATH, 'publish.html'),
	      filename: 'index.html',
	      inject: 'body'
	    }),
        // new ExtractTextPlugin(),
		new ExtractTextPlugin({
			filename: 'css/[name]-[hash:8].css',
			allChunks: true,
		}),
		new webpack.ProvidePlugin({//全局变量插件
			//当webpack加载到某个js模块里，出现了未定义且名称符合（字符串完全匹配）配置中key的变量时，会自动require配置中value所指定的js模块。
			//不能为node_modules里的js注入
			$: 'jquery',
			jQuery:'jquery',
			'window.jQuery':'jquery',
			'window.$': 'jquery',
		}),
		new webpack.DefinePlugin({
			'process.env.NODE_ENV': '"production"',
		})
	  ]
}