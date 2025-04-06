var builder = require('node-webkit-builder'),
    gulp = require('gulp'),
    gutil = require('gulp-util'),
    zip = require('gulp-zip'),
    colors = require('colors'),
    useref = require('gulp-useref'),
    gulpif = require('gulp-if'),
    uglify = require('gulp-uglify'),
    minifyCss = require('gulp-minify-css'),
    htmlmin = require('gulp-htmlmin'),
    fs = require('fs'),
    electron = require('electron-installer-dmg');

gulp.task('copy-fonts', function() {
    gulp.src('app/vendor/fonts/*.*')
        .pipe(gulp.dest('minified/vendor/fonts'));
});

gulp.task('copy-favicon', function() {
    gulp.src('app/favicon.png')
        .pipe(gulp.dest('minified'));
});

gulp.task('copy-package', function() {
    gulp.src('app/package.json')
        .pipe(gulp.dest('minified'));
});


gulp.task('html', function () {
    var assets = useref.assets();

    return gulp.src('app/**/*.html')
        .pipe(assets)
        .pipe(gulpif('*.js', uglify()))
        .pipe(gulpif('*.css', minifyCss()))
        .pipe(assets.restore())
        .pipe(useref())
        .pipe(gulpif('*.html', htmlmin({collapseWhitespace: true})))
        .pipe(gulp.dest('minified'));
});

gulp.task('minify', ['html', 'copy-fonts', 'copy-favicon', 'copy-package']);

gulp.task('nw', ['minify'], function () {

    var nw = new builder({
        files: ['./minified/**/**', '!./minified/vendor/css/*.css0'],
        platforms: ['osx32', 'osx64', 'linux32', 'linux64']
    });

    nw.on('log', function (msg) {
        gutil.log('\'' + 'node-webkit-builder'.cyan + '\':', msg);
    });

    return nw.build().catch(function (err) {
        gutil.log('\'' + 'node-webkit-builder'.cyan + '\':', err);
    });
});

gulp.task('nw-win', ['minify'], function () {

    var nw = new builder({
        files: ['./minified/**/**', '!./minified/vendor/css/*.css0'],
        platforms: ['win32'],
        winIco: './favicon.ico'
    });

    nw.on('log', function (msg) {
        gutil.log('\'' + 'node-webkit-builder'.cyan + '\':', msg);
    });

    return nw.build().catch(function (err) {
        gutil.log('\'' + 'node-webkit-builder'.cyan + '\':', err);
    });
});


gulp.task('dist-win', ['nw-win'], function () {
    return gulp.src('build/free-mobile/win32/**/**')
        .pipe(zip('Windows.zip'))
        .pipe(gulp.dest('dist/'));
});

gulp.task('dist-osx32', ['nw'], function () {
    return gulp.src('build/free-mobile/osx32/**/**')
        .pipe(zip('OSX32.zip'))
        .pipe(gulp.dest('dist/'));
});

gulp.task('dist-osx64', ['nw'], function () {
    return gulp.src('build/free-mobile/osx64/**/**')
        .pipe(zip('OSX64.zip'))
        .pipe(gulp.dest('dist/'));
});

gulp.task('dist-linux32', ['nw'], function () {
    return gulp.src('build/free-mobile/linux32/**/**')
        .pipe(zip('Linux32.zip'))
        .pipe(gulp.dest('dist/'));
});

gulp.task('dist-linux64', ['nw'], function () {
    return gulp.src('build/free-mobile/linux64/**/**')
        .pipe(zip('Linux64.zip'))
        .pipe(gulp.dest('dist/'));
});

gulp.task('dist-mac', ['build'], function () {
    return gulp.src('')
        .pipe(electron({
            src: './build',
            packageJson: packageJson,
            release: './release',
            cache: './cache',
            version: 'latest',
            packaging: true,
            platforms: ['darwin-x64'],
            platformResources: {
                darwin: {
                    CFBundleDisplayName: packageJson.name,
                    CFBundleIdentifier: 'com.exemple.' + packageJson.name,
                    CFBundleName: packageJson.name,
                    CFBundleVersion: packageJson.version,
                    icon: './icons/icon.icns'
                }
            }
        }))
        .pipe(gulp.dest(''));
});

gulp.task('default', ['dist-osx64', 'dist-osx32', 'dist-linux64', 'dist-linux32']);
