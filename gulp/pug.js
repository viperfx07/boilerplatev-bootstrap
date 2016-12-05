'use strict';

import fs from 'fs';
import path from 'path';
import foldero from 'foldero';
import pug from 'pug';

export default function(gulp, plugins, args, config, taskTarget, browserSync, dirs) {
  let dest = path.join(taskTarget);
  let dataPath = path.join(dirs.source, dirs.data);

  // pug template compile
  gulp.task('pug', () => {
    let siteData = {};
    if (fs.existsSync(dataPath)) {
      // Convert directory to JS Object
      siteData = foldero(dataPath, {
        recurse: true,
        whitelist: '(.*/)*.+\.(json|ya?ml)$',
        loader: function loadAsString(file) {
          let json = {};
          try {
          	json = JSON.parse(fs.readFileSync(file, 'utf8'));
          }
          catch(e) {
            console.log('Error Parsing JSON file: ' + file);
            console.log('==== Details Below ====');
            console.log(e);
          }
          return json;
        }
      });
    }

    // Add --debug option to your gulp task to view
    // what data is being loaded into your templates
    if (args.debug) {
      console.log('==== DEBUG: site.data being injected to templates ====');
      console.log(siteData);
      console.log('\n==== DEBUG: package.json config being injected to templates ====');
      console.log(config);
    }

    return gulp.src([
      path.join(dirs.source, '**/*.pug'),
      '!' + path.join(dirs.source, '{**/\_*,**/\_*/**}')
    ])
    .pipe(plugins.changed(dest))
    .pipe(plugins.plumber())
    .pipe(plugins.pug({
      pug: pug,
      pretty: true,
      locals: {
        config: config,
        debug: true,
        site: {
          data: siteData
        }
      }
    }))
    .pipe(gulp.dest(dest))
    .on('end', browserSync.reload);
  });
}