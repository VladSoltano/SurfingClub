const gulp = require('gulp');
const autoprefixer = require('gulp-autoprefixer');
const del = require('del');
const browserSync = require('browser-sync').create();
const concat = require('gulp-concat');
const cleanCSS = require('gulp-clean-css');
const sourcemaps = require('gulp-sourcemaps');
const gulpif = require('gulp-if');
const gcmq = require('gulp-group-css-media-queries');
const less = require('gulp-less');
const uglify = require('gulp-uglify');
const fileinclude = require('gulp-file-include');

const isDev = (process.argv.indexOf('--dev') !== -1);
const isProd = !isDev;
const isSync = (process.argv.indexOf('--sync') !== -1);


function clear(){
	return del('build/*');
}

function styles(){
	return gulp.src('./src/css/main.less')
			   .pipe(gulpif(isDev, sourcemaps.init()))
			   .pipe(less())
			   //.pipe(concat('style.css'))
			   .pipe(gcmq())
			   .pipe(autoprefixer({
		            browsers: ['> 0.1%'],
		            cascade: false
		        }))
			   //.on('error', console.error.bind(console))
			   .pipe(gulpif(isProd, cleanCSS({
			   		level: 2
			   })))
			   .pipe(gulpif(isDev, sourcemaps.write()))
			   .pipe(gulp.dest('./build/css'))
			   .pipe(gulpif(isSync, browserSync.stream()));
}
function script() {

    return gulp.src('./src/js/main.js')
                .pipe(gulpif(isDev, sourcemaps.init()))
                // .pipe(concat('all.js'))
                .pipe(gulpif(isProd, uglify({
                    toplevel: true
                })))
                .pipe(gulpif(isDev, sourcemaps.write()))
                .pipe(gulp.dest('./build/js'))
                .pipe(gulpif(isSync, browserSync.stream()));
}

function fonts(){
	return gulp.src('./src/fonts/**/*')
			   .pipe(gulp.dest('./build/fonts'))
}

function img(){
	return gulp.src('./src/img/**/*')
			   .pipe(gulp.dest('./build/img'))
}

function bootstrap(){
	return gulp.src('./src/libs/**/*')
			   .pipe(gulp.dest('./build/libs'))
}

function html(){
	return gulp.src('./src/**/**/*.html')
			   .pipe(fileinclude({
				   prefix: '@@'
			   }))
			   .pipe(gulp.dest('./build'))
			   .pipe(gulpif(isSync, browserSync.stream()));
}

function watch(){
	if(isSync){
		browserSync.init({
	        server: {
	            baseDir: "./build",
			},
			tunnel: true
	    });
	}

	gulp.watch('./src/css/**/*.less', styles);
	gulp.watch('./src/**/*.html', html);
    gulp.watch('./src/js/main.js', script);
}

let build = gulp.series(clear, 
	gulp.parallel(styles, img, html, script, fonts, bootstrap)
);

gulp.task('build', build);
gulp.task('watch', gulp.series(build, watch));