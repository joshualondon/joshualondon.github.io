var gulp = require("gulp"),
    gutil = require("gulp-util"),
    browserSync = require("browser-sync").create(),
    sass = require("gulp-sass"),
	cssnano = require('gulp-cssnano'),
    sourcemaps = require('gulp-sourcemaps'),
    postcss = require('gulp-postcss'),
    atImport = require("postcss-import"),
    autoprefixer = require('autoprefixer'),
    cp = require('child_process'),
    deploy = require('gulp-gh-pages'),
    debug = require("gulp-debug"),
    runSequence = require("gulp-run-sequence"),
    cache = require("gulp-cached"),
    fs = require("fs");



gulp.task("build:css", function() {
	return gulp
	.src([
		"assets/scss/london.scss"
	])
	.pipe(sourcemaps.init())
	.pipe(sass().on('error', sass.logError))
	.pipe(postcss([
		atImport,
		autoprefixer({browsers: ['last 5 versions', 'iOS 8']})
	]))
	.pipe(sourcemaps.write('./'))
	.pipe(gulp.dest("_site/assets/css/"))
	//.pipe(cssnano())
	.pipe(browserSync.stream());
});

gulp.task("watch:css", function() {
	return gulp.watch("assets/**/*.scss", ["build:css"]);
});



// gulp.task("build:jekyll", function(done) {
// 	cp
// 	.spawn( jekyll , ['build', '--incremental'], {stdio: 'inherit'})
// 	.on('close', function() {
// 		browserSync.reload();
// 		done();
// 	});
// });

const child = require('child_process');
gulp.task('build:jekyll', () => {
  const jekyll = child.spawn('jekyll', ['build',
    '--watch',
    '--incremental',
    '--drafts'
  ]);

  const jekyllLogger = (buffer) => {
    buffer.toString()
      .split(/\n/)
      .forEach((message) => gutil.log('Jekyll: ' + message));
  };

  jekyll.stdout.on('data', jekyllLogger);
  jekyll.stderr.on('data', jekyllLogger);
});


gulp.task("watch:jekyll", function() {

	gulp.watch([
		'_includes/*.*',
		'_includes/**/*.*',
		'_layouts/*.*',
		'_layouts/**/*.*',
		'_posts/*.*',
		'_posts/**/*.*',
		'*.html'
	], ['build:jekyll']);
})



gulp.task("sync", function() {
	browserSync.init({
		startPath: "",
		server: {
			baseDir: "_site",
			index: "index.html",
			routes: {
				"": "_site"
			}
		}
	});
});



gulp.task("deploy", ["build"], function() {
	return gulp
	.src("./_site/**/*")
	.pipe(deploy())
	.on("error", gutil.log);
});



gulp.task("build", ["build:jekyll", "build:css"]);
gulp.task("watch", ["sync", "watch:css"]);
gulp.task("default", ["build", "sync", "watch"]);
