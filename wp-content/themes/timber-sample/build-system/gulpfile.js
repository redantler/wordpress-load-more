var gulp        = require("gulp"),
    gutil       = require("gulp-util"),
    livereload  = require("gulp-livereload"),
    sass        = require("gulp-sass"),
    webpack     = require("webpack");


gulp.task("webpack", function () {
    webpack(
        require("./webpack.config.js"),
        function (err, stats) {
            if (err) throw new gutil.PluginError("webpack", err);
            gutil.log(stats.toString({ colors: true }));
        }
    );
});

gulp.task("webpack-production", function () {
    webpack(
        require("./webpack.config.production.js"),
        function (err, stats) {
            if (err) throw new gutil.PluginError("webpack", err);
            gutil.log(stats.toString({ colors: true }));
        }
    );
});

gulp.task("watch", function () {
    livereload.listen();

    gulp.watch('sass/**/*.scss', function() {
      gulp.run('sass');
    });

    gulp.watch([
        "../assets/dist/bundle.js",
        "../assets/styles/app.css",
        "../templates/*.twig",
        "../templates/**/*.twig",
    ], function (event) {
        livereload.changed(event);
    });

});

gulp.task('sass', function() {

  srcfile = 'sass/app.scss';
  loadPath = 'assets/styles/*';
  destdir = '../assets/styles';

  gulp.src(srcfile)
  .pipe(sass({
    noCache: true,
    lineNumbers: true,
    loadPath: loadPath,
    quiet: true
  }))
  .pipe(gulp.dest(destdir));

});

gulp.task("default", ["webpack", "sass", "watch"]);

gulp.task("production", ["webpack-production", "sass"]);
