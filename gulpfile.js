const gulp = require('gulp');
const { src, dest, watch, parallel, series } = gulp;
const plugins = {
	scss: require('gulp-sass')(require('sass')),
	concat: require('gulp-concat'),
	uglify: require('gulp-uglify-es').default,
	browserSync: require('browser-sync').create(),
	postcss: require('gulp-postcss'),
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
	scriptsSrc: 'app/js/*.js',
	stylesSrc: 'app/scss/style.scss',
	htmlSrc: 'app/pages/*.html',
	fontsSrc: 'app/fonts/src/*.*',
};

// Include pages HTML with components
function pages() {
	console.log('Processing HTML...');
	return src(paths.htmlSrc)
	.pipe(plugins.include({ prefix: '@@', basepath: 'app/components/layouts/' }))
	.pipe(dest('app'))
	.pipe(plugins.browserSync.reload({ stream: true }));
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
	.pipe(plugins.newer({ dest: 'app/img', ext: '.webp' }))
	.pipe(plugins.if(file => file.extname !== '.svg', plugins.webp()))
	.pipe(dest('app/img'))
	.pipe(src('app/img/*.webp'))
	.pipe(
			plugins.imagemin([
				plugins.imagemin.mozjpeg({ quality: 75, progressive: true }),
				plugins.imagemin.optipng({ optimizationLevel: 5 }),
				plugins.imagemin.svgo({
					plugins: [{ removeViewBox: false }, { cleanupIDs: false }],
				}),
			])
	)
	.pipe(dest('app/img'))
	.pipe(plugins.browserSync.reload({ stream: true }));
}

// Scripts
function scripts() {
	return src(paths.scriptsSrc)
	.pipe(
			plugins.plumber({
				errorHandler: plugins.notify.onError('Error: <%= error.message %>'),
			})
	)
	.pipe(plugins.newer('app/js/main.min.js'))
	.pipe(plugins.sourcemaps.init())
	.pipe(plugins.concat('main.min.js'))
	.pipe(plugins.if(process.env.NODE_ENV === 'production', plugins.uglify()))
	.pipe(plugins.sourcemaps.write('.'))
	.pipe(dest('app/js'))
	.pipe(plugins.browserSync.reload({ stream: true }));
}

// Styles
function styles() {
	return src(paths.stylesSrc)
	.pipe(
			plugins.plumber({
				errorHandler: plugins.notify.onError(
						'SCSS Error: <%= error.message %>'
				),
			})
	)
	.pipe(plugins.sourcemaps.init())
	.pipe(plugins.scss({ outputStyle: 'compressed' }))
	.pipe(plugins.postcss())
	.pipe(plugins.concat('style.min.css'))
	.pipe(plugins.sourcemaps.write('.'))
	.pipe(dest('app/css'))
	.pipe(plugins.browserSync.stream());
}

// Continuous synchronization
function sync() {
	plugins.browserSync.init({
		server: { baseDir: 'app/' },
		notify: false,
		port: 3000,
		ghostMode: false,
		online: true,
	});
}

// Watching and Browsersync
function watching() {
	console.log('👀 Watching files...');
	sync();

	// Watching SCSS
	watch('app/scss/**/*.scss', styles);

	// Watching HTML
	watch(['app/components/layouts/*.html', 'app/pages/*.html'], pages);

	// Watching JS
	watch(paths.scriptsSrc, scripts);

	// Watching images
	watch(paths.imagesSrc, function(cb) {
		console.log('🖼 Змінено зображення!');
		images();
		cb();
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
