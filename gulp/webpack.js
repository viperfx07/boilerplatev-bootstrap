'use strict';

import path from 'path';
import webpack from 'webpack';
import webpackStream from 'webpack-stream';

export default function(gulp, plugins, args, config, taskTarget, browserSync, dirs) {
    let assetsJs = path.join(dirs.assets, dirs.scripts.replace(/^_/, ''), '/');
    let dest = path.join(taskTarget, assetsJs);
    let webpackSettings = {
        output: {
            // Not using publicPath, because we want to load async js dynamically from the assets folder
            // where the entry point is located
            // the publicPath is set dynamically in the main.js

            //filename of the main app file
            filename: '[name].js',
            chunkFilename: '[name].js'
        },
        externals:{
            "jquery": "jQuery"
        },
        module: {
            loaders: [
                { test: /\.js$/, exclude: /(node_modules|bower_components)/, loader: "babel-loader"},
            ]
        }
    };


    if(args.production && args.production !== 'dev'){
        webpackSettings.devtool = 'source-map';
        webpackSettings.output.filename = config.entries.js;
        webpackSettings.plugins = [ 
            new webpack.optimize.UglifyJsPlugin({
                minimize: true
            })
        ];
    }

    gulp.task('webpack', () => {
      return gulp.src(path.join(dirs.source, dirs.scripts, config.entries.js))
        .pipe(plugins.plumber())
        .pipe(webpackStream(webpackSettings))
        .pipe(gulp.dest(dest))
        .on('end', browserSync.reload);
    });

}

