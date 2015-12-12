module.exports = function(gulp, plugins, paths, merge, path) {
  return function () {
    var folders = paths.assets.map(function(folder) {
      return plugins.watch(path.join(folder + '/scss/**/*.scss'), function() {
        gulp.src(path.join(folder + '/scss/*.scss'))
        .pipe(plugins.plumber({
          errorHandler: plugins.notify.onError({
            sound: false,
            message: "SHIT! - <%= error.message %>"
          })
        }))
        .pipe(plugins.debug({ title: 'Build SCSS files' }))
        .pipe(plugins.bytediff.start())
        .pipe(plugins.sass())
        .pipe(plugins.autoprefixer({
          browsers: ['last 3 versions'],
          cascade: false
        }))
        .pipe(plugins.bytediff.stop())
        .pipe(gulp.dest(folder + '/css/'));
      });
    });
    return merge(folders);
  };
};
