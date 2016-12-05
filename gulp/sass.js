'use strict';

import path from 'path';
import autoprefixer from 'autoprefixer';
import gulpif from 'gulp-if';
import atImport from 'postcss-import';
import sprites from 'postcss-sprites';
import assets from 'postcss-assets';
import oldie from 'oldie';
import pxtorem from 'postcss-pxtorem';
import rucksack from 'rucksack-css';

export default function(gulp, plugins, args, config, taskTarget, browserSync, dirs) {
  let entries = config.entries;
  let dest = path.join(taskTarget, dirs.assets, dirs.styles.replace(/^_/, ''));

  // Sass compilation
  gulp.task('sass', () => {
    gulp.src(path.join(dirs.source, dirs.styles, entries.css))
      .pipe(plugins.plumber())
      .pipe(plugins.sourcemaps.init())
      .pipe(plugins.cssGlobbing({	extensions: ['.scss']	}))
      .pipe(plugins.sass({
        precision: 10,
        includePaths: [
          path.join(dirs.source, dirs.styles),
          path.join(dirs.source, dirs.modules),
          'node_modules/foundation-sites/scss'
        ]
      }).on('error', plugins.sass.logError))
      .pipe(plugins.postcss([
          autoprefixer({browsers: ['last 2 version', '> 5%', 'safari 5', 'ios 6', 'android 4', 'ie 9']}),
          rucksack({reporter: true}),
          pxtorem({replace: false}),
          atImport(),
          assets({
            loadPaths: [path.join(dirs.source, dirs.images)]
          }),
          sprites({
            stylesheetPath: dest, 
            spritePath: path.join(taskTarget, dirs.assets, 'img'),
            filterBy: function(image) {
                // Allow only png files
                if (!/\.(png|jpg|bmp|gif|jpeg)$/.test(image.url)) {
                    return Promise.reject();
                }

                return Promise.resolve();
            } 
          })
        ]))
      .pipe(plugins.rename(function(path) {
        // Remove 'source' directory as well as prefixed folder underscores
        // Ex: 'src/_styles' --> '/styles'
        path.dirname = path.dirname.replace(dirs.source, '').replace('_', '');
      }))
      .pipe(plugins.cssnano({rebase: false}))
      .pipe(plugins.sourcemaps.write('./'))
      .pipe(gulp.dest(dest))
      .pipe(browserSync.stream({match: '**/*.css'}));
  });
}


