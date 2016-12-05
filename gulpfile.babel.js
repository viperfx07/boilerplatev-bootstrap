'use strict';

import gulp from 'gulp';
import gulpLoadPlugins from 'gulp-load-plugins';
import browserSyncLib from 'browser-sync';
import pjson from './package.json';
import minimist from 'minimist';
import wrench from 'wrench';

// Load all gulp plugins based on their names
// EX: gulp-copy -> copy
const plugins = gulpLoadPlugins();

let config = pjson.config;
let args = minimist(process.argv.slice(2));
let dirs = config.directories;
let taskTarget = args.production ? dirs.destination : dirs.temporary;
let otherWWW = dirs.otherWWW;

// Create a new browserSync instance
let browserSync = browserSyncLib.create();

// This will grab all js in the `gulp` directory
// in order to load all gulp tasks
wrench.readdirSyncRecursive('./gulp').filter((file) => {
  return (/\.(js)$/i).test(file);
}).map(function(file) {
	require('./gulp/' + file)(gulp, plugins, args, config, taskTarget, browserSync, dirs, otherWWW);
});

// gulp.task('complete',['bower', 'imagemin', 'iconfont', 'fonts', 'sass', 'pug', 'webpack', 'dirsync', 'rootfiles', 'browserSync', 'watch' ]);

// Default task
gulp.task('default', ['clean'], () => {
  gulp.start('build');
});

// Build production-ready code
gulp.task('build', [
  'copy',
  'imagemin',
  'iconfont',
  'fonts',
  'pug',
  'sass',
  'webpack',
  'browserSync',
  'watch'
]);

// Server tasks with watch
gulp.task('serve', [
  'imagemin',
  'iconfont',
  'fonts',
  'copy',
  'pug',
  'sass',
  'webpack',
  'browserSync',
  'watch'
]);

// Testing
gulp.task('test', ['eslint']);