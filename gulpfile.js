const gulp = require('gulp');
const { src, dest, watch, parallel, series } = gulp;
const plugins = {
	scss: require('gulp-sass')(require('sass')),
	concat: require('gulp-concat'),
	uglify: require('gulp-uglify-es').default,
	browserSync: require('browser-sync').create(),
	autoprefixer: require('gulp-autoprefixer'),
	clean: require('gulp-clean'),
	webp: require('gulp-webp'),
	imagemin: require('gulp-imagemin'),
	newer: require('gulp-newer'),
	fonter: require('gulp-fonter'),
	ttf2woff2: require('gulp-ttf2woff2'),
	include: require('gulp-file-include'),
	sourcemaps: require('gulp-sourcemaps'),
	notify: require('gulp-notify'),
	replace: require('gulp-replace'),
	plumber: require('gulp-plumber'),
	cache: require('gulp-cache'),
	if: require('gulp-if'),
};

// File Paths
const paths = {
	imagesSrc: 'app/img/src/**/*.{jpg,png,svg}',
	scriptsSrc: 'app/js/scripts.js',
	stylesSrc: 'app/scss/style.scss',
	htmlSrc: 'app/pages/*.html',
	fontsSrc: 'app/fonts/src/*.*',
};

// Include pages HTML with components
function pages() {
	return src(paths.htmlSrc)
		.pipe(
			plugins.include({ prefix: '@@', basepath: 'app/components/layouts/' })
		)
		.pipe(dest('app'))
		.pipe(plugins.browserSync.stream());
}

// Fonts optimization
function fonts() {
	const srcPath = 'app/fonts/src/*.*';
	return src(srcPath)
		.pipe(plugins.fonter({ formats: ['woff'] }))
		.pipe(dest('app/fonts'))
		.pipe(src(srcPath))
		.pipe(plugins.ttf2woff2())
		.pipe(dest('app/fonts'));
}

// Optimize image files
function images() {
	return src(paths.imagesSrc)
		.pipe(plugins.newer('app/img'))
		.pipe(plugins.if(file => file.extname !== '.svg', plugins.webp()))
		.pipe(dest('app/img'))
		.pipe(plugins.if('*.webp', src('app/img/src/*.webp')))
		.pipe(
			plugins.imagemin([
				plugins.imagemin.mozjpeg({ quality: 75, progressive: true }),
				plugins.imagemin.optipng({ optimizationLevel: 5 }),
				plugins.imagemin.svgo({
					plugins: [{ removeViewBox: false }, { cleanupIDs: false }],
				}),
			])
		)
		.pipe(dest('app/img'));
}

// Scripts
function scripts() {
	return gulp
		.src('app/js/scripts.js')
		.pipe(plugins.cache.clear())
		.pipe(
			plugins.plumber({
				errorHandler: plugins.notify.onError('Error: <%= error.message %>'),
			})
		)
		.pipe(
			plugins.include({
				prefix: '@@',
				basepath: '@file',
			})
		)
		.pipe(plugins.sourcemaps.init())
		.pipe(plugins.concat('main.min.js'))
		.pipe(plugins.if(process.env.NODE_ENV === 'production', plugins.uglify())) // Мінімізуємо код для продакшн
		.pipe(plugins.sourcemaps.write('.'))
		.pipe(gulp.dest('app/js'))
		.pipe(plugins.browserSync.stream());
}

// Styles
function styles() {
	return src(paths.stylesSrc)
		.pipe(plugins.plumber({ errorHandler: plugins.notify.onError() }))
		.pipe(plugins.sourcemaps.init())
		.pipe(
			plugins
				.scss({ outputStyle: 'compressed' })
				.on('error', plugins.notify.onError())
		)
		.pipe(plugins.autoprefixer({ overrideBrowserslist: ['last 10 versions'] }))
		.pipe(plugins.concat('style.min.css'))
		.pipe(plugins.sourcemaps.write('.'))
		.pipe(dest('app/css'))
		.pipe(plugins.browserSync.stream());
}

// Continuous synchronization
function sync(done) {
	plugins.browserSync.init({
		server: { baseDir: 'app/' },
		notify: false,
		port: 3000,
		ghostMode: false,
		online: true,
	});
	done();
}

// Watching and Browsersync
function watching() {
	watch(
		[paths.stylesSrc, 'app/components/*', 'app/pages/*'],
		parallel(styles, pages)
	);
	watch(paths.scriptsSrc, scripts);
	watch(paths.imagesSrc, series(images));
	sync(() => {
		console.log('BrowserSync is running');
	});
}

// Clean
function cleanDist() {
	return src('dist', { allowEmpty: true }).pipe(plugins.clean());
}

// Build production-ready assets
function building() {
	return src(
		[
			'app/css/style.min.css',
			'app/img/*.*',
			'app/img/icons/*.*',
			'app/img/*.svg',
			'app/fonts/*.*',
			'app/js/main.min.js',
			'app/*.html',
		],
		{ base: 'app' }
	).pipe(dest('dist'));
}

exports.styles = styles;
exports.images = images;
exports.fonts = fonts;
exports.pages = pages;
exports.scripts = scripts;
exports.watching = watching;
exports.cleanDist = cleanDist;
exports.build = series(cleanDist, building);
exports.default = parallel(styles, fonts, images, scripts, pages, watching);
