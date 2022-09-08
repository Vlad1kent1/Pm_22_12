import gulp from 'gulp';
import concat from 'gulp-concat';
import dartSass from 'sass';
import gulpSass from 'gulp-sass';
import autoprefixer from 'gulp-autoprefixer';
import cssnano from 'gulp-cssnano';
import rename from 'gulp-rename';
import uglify from 'gulp-uglify';
import imagemin from 'gulp-imagemin';
import browsersync from 'browser-sync';
import {deleteAsync} from "del";
const sass = gulpSass(dartSass);

const buildFolder=`./dist`;
const srcFolder=`./app`;

const path = {
    build: {
        html: `${buildFolder}/`,
        css: `${buildFolder}/css/`,
        js: `${buildFolder}/js/`,
        sass:`${buildFolder}/sass/`,
        img: `${buildFolder}/img/`,
    },
    src: {
        html: `${srcFolder}/*.html`,
        css: `${srcFolder}/css/*.css`,
        js: `${srcFolder}/js/*.js`,
        sass:`${srcFolder}/sass/*.sass`,
        img: `${srcFolder}/img/*.+ (jpg | jpeg | png | gif)`,
    },
    watch: {
            html:`${srcFolder}/html/*.html`,
            js:`${srcFolder}/js/*.js`,
            css:`${srcFolder}/css/*.css`,
            fonts: `${srcFolder}/fonts/*.*`,
            img:`${srcFolder}/img/*.*`,
            sass:`${srcFolder}/sass/*.sass`,
            files:`${srcFolder}/*`  
        },
        clean:buildFolder,
        buildFolder:buildFolder,
        srcFolder:srcFolder,
        ftp:``
    }
  
global.app = {
    path:path,
    gulp:gulp
  }

const html = () => {
    return app.gulp.src (path.src.html)
    .pipe (app.gulp.dest (path.build.html))
    .pipe(browsersync.stream());
}

const css = () => {
    return app.gulp.src(path.src.css)
        .pipe(app.gulp.dest(path.build.css))
}

const task_sass = () => {
    return app.gulp.src(path.src.sass)
    .pipe (concat ( 'styles.sass'))
    .pipe(sass().on('error', sass.logError))
    .pipe (autoprefixer ({
        browsers: [ 'last 2 versions'],
        cascade: false
    }))
    .pipe (cssnano ())
    .pipe (rename ({suffix: '.min'}))
    .pipe(app.gulp.dest(path.build.sass))
}

const scripts =  () => {
    return app.gulp.src(path.src.js) 
 .pipe (concat ( 'scripts.js')) 
 .pipe (uglify ())
 .pipe (rename ({suffix: '.min'}))
 .pipe (app.gulp.dest (path.build.js)) 
}

const imgs =  () => {
    return app.gulp.src (path.src.img)
    .pipe (imagemin ({
    progressive: true,
    svgoPlugins: [{removeViewBox: false}],
    interlaced: true
    }))
    .pipe (app.gulp.dest (path.build.img))
}

const watch = () => {
    gulp.watch (path.build.html).on('change', browsersync.reload)
    gulp.watch (path.watch.html,  html)
    gulp.watch (path.watch.js, scripts)
    gulp.watch (path.watch.sass, task_sass)
    gulp.watch (path.watch.img, imgs)
}

const clean = () => {
    return deleteAsync(app.path.clean);
}

const server = () => {
    browsersync.init({
        server:{
            baseDir:`${app.path.build.html}`
        },
        notify: false,
        port: 3000,
    });
}

const dev = gulp.series(clean, html, task_sass, scripts, imgs, css, gulp.parallel(watch, server))
gulp.task("default", dev);