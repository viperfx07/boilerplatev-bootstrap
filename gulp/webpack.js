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
        externals: {
            "jquery": "jQuery"
        },
        module: {
            rules: [{
                test: /\.js$/,
                loader: "babel-loader"
            }, {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    // `loaders` will overwrite the default loaders.
                    // The following config will cause all <script> tags without "lang"
                    // attribute to be loaded with coffee-loader
                    loaders: {},

                    // `preLoaders` are attached before the default loaders.
                    // You can use this to pre-process language blocks - a common use
                    // case would be build-time i18n.
                    preLoaders: {},

                    // `postLoaders` are attached after the default loaders.
                    //
                    // - For `html`, the result returned by the default loader
                    //   will be compiled JavaScript render function code.
                    //
                    // - For `css`, the result will be returned by vue-style-loader
                    //   which isn't particularly useful in most cases. Using a postcss
                    //   plugin will be a better option.
                    postLoaders: {
                        html: 'babel-loader'
                    },

                    // `excludedPreLoaders` should be regex
                    excludedPreLoaders: /(eslint-loader)/
                }
            }
            ]
        }
    };


    if (args.production && args.production !== 'dev') {
        webpackSettings.devtool = 'source-map';
        webpackSettings.output.filename = config.entries.js;
        webpackSettings.plugins = [
            new webpack.optimize.UglifyJsPlugin({
                minimize: true,
                sourceMap: true
            })
        ];
    }

    gulp.task('webpack', () => {
        console.log(__dirname);
        return gulp.src(path.join(dirs.source, dirs.scripts, config.entries.js))
            .pipe(plugins.plumber())
            .pipe(webpackStream(webpackSettings, webpack))
            .pipe(gulp.dest(dest))
            .on('end', browserSync.reload);
    });

}
