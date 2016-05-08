var path = require('path');

// var node_modules = path.resolve(__dirname, 'node_modules');
// var pathToReact = path.resolve(node_modules, 'react/dist/react-with-addons.js');
var HtmlWebpackPlugin = require('html-webpack-plugin');

var webpack = require("webpack");

module.exports = {
    context: __dirname +  "/src",
    entry: ['webpack/hot/dev-server', path.resolve(__dirname, 'src/main')],
    resolve: {
        root: path.resolve(__dirname, 'src'),
        // alias: {
        //   'react': pathToReact
        // },
        extensions: ['', '.js', '.jsx', '.styl'],
    },

//

    // externals: {
    //   "react": "React",
    //   "react/addons": "React"
    // },

    //  resolve: {
    //     alias: {
    //         "react": __dirname + '/node_modules/react',
    //         "react/addons": __dirname + '/node_modules/react/addons',
    //     }
    // }
    output: {
        path: path.resolve(__dirname, 'build'),
        publicPath : 'http://localhost:5000/',
        filename: 'bundle.js',
    },
   // modulesDirectories: ['node_modules', 'web_modules', 'bower_components'],
    module: {
	    loaders: [
            {
    	      test: /\.jsx?$/, // A regexp to test the require path. accepts either js or jsx
    	      loader: 'babel' // The module to load. "babel" is short for "babel-loader"
    	    }, 
            {
                test: /\.css$/, // Only .css files
                loader: 'style!css' // Run both loaders
            },
            { 
                test: /\.styl$/, 
                loader: 'style-loader!css-loader!stylus-loader' 
            }, 
            { 
                test: /\.woff(\d+)?$/,   
                loader: 'url-loader?mimetype=application/font-woff' 
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                loaders: [
                    'file?hash=sha512&digest=hex&name=[hash].[ext]',
                    'image-webpack?bypassOnDebug&optimizationLevel=7&interlaced=false'
                ]
            }
        // { 
        //     test: /\.styl$/, 
        //     loader: 'style-loader!css-loader!stylus-loader' 
        // }, 
        // { 
        //     test: /\.woff(\d+)?$/,   
        //     loader: 'url-loader?mimetype=application/font-woff' 
        // },

        //   { test: /\.ttf$/,    loader: "file-loader" },
        //   { test: /\.eot$/,    loader: "file-loader" },
            // { test: /\.svg$/,    loader: "file-loader" },
            // { test: /\.jpg$/,    loader: "file-loader" }
            
        ]
        //, noParse: [pathToReact]
	},
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
            production: false,
            inject: false,
        }),
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
            "window.jQuery": "jquery"
        }),
        new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /de|fr|hu/)
    ], 
    devServer: {
        proxy: {
            '*': 'http://localhost:7000'
        }
   }
};