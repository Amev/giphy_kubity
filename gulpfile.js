var sourcemaps = require('gulp-sourcemaps');
var source = require('vinyl-source-stream');
var browserify = require('browserify');
var buffer = require('vinyl-buffer');
var babelify = require('babelify');
var gulp = require('gulp');

var files = {
	ENTRY_POINT: './app/client.js',
	OUT_BUNDLE: 'bundle.js',
	APP: './app/*.js',
	RSRC: './ressources/**/*',
	STORES: './stores/*.js',
	SLAVES: './slaves/*.js',
	ACTIONS: './actions/*.js',
	COMPONENTS: './components/*.jsx',
	DEST_PUBLIC: './build',
	REST: 'rest/**/*.{js,json}',
	SERVER: './server.js'
};

gulp.task('copy', [], function() {
	return gulp.src(files.RSRC).pipe(gulp.dest(files.DEST_PUBLIC));
});

gulp.task('babel', ['copy'], function() {
	return browserify({
		entries: [files.ENTRY_POINT],
		extensions: ['.js', '.jsx', '.json'],
		debug: true
	}).transform('babelify', {
		presets: ['es2015', 'stage-0', 'react'],
		plugins: ['transform-object-assign', 'transform-decorators-legacy']
	}).bundle()
	.pipe(source(files.OUT_BUNDLE))
	.pipe(buffer())
	.pipe(sourcemaps.init({loadMaps: true}))
	.pipe(sourcemaps.write('./'))
	.pipe(gulp.dest(files.DEST_PUBLIC));
});

gulp.task('watch', ['babel', 'copy'], function() {
	gulp.watch([files.APP, files.STORES, files.SLAVES, files.ACTIONS, files.COMPONENTS], ['babel']);
	gulp.watch(files.RSRC, ['copy']);
});

gulp.task('default', ['watch']);
