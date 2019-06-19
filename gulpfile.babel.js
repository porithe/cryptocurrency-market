import gulp from 'gulp';
import sass from 'gulp-sass';
import clean from 'gulp-clean-css';
import concat from 'gulp-concat';
import uglify from 'gulp-uglify';
import babel from 'gulp-babel';
import del from 'del';
import browserSync from 'browser-sync';

const sync = browserSync.create();
const reload = sync.reload;


gulp.task('sass', gulp.series(
    function scss() {
        return gulp.src('./app/scss/app.scss')
            .pipe(sass())
            .pipe(clean())
            .pipe(gulp.dest('./dist/css'))
            .pipe(sync.stream());
    },
));

function refresh(done) {
    reload();
    done()
}

gulp.task('js', gulp.series(function js() {
    return gulp.src('./app/js/*.js')
        .pipe(babel({ presets: ['@babel/preset-env'] }))
        .pipe(concat('app.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./dist/js'));
}, refresh));

gulp.task('static', gulp.series(
    function moveHtml() {
        return gulp.src('./app/index.html')
            .pipe(gulp.dest('./dist/'));
    },
    refresh
));

gulp.task('clean', () => {
    return del(['./dist']);
});

gulp.task('build', gulp.series(['clean', 'sass', 'js', 'static']));

function server() {
    return sync.init({
        injectChanges: true,
        server: './dist'
    });
}

gulp.task('default', gulp.series(['build']));

gulp.task('watch', gulp.series(['default'], function watch() {
    gulp.watch('app/scss/app.scss', gulp.series(['sass']));
    gulp.watch('app/js/*.js', gulp.series(['js']));
    gulp.watch('app/*.html', gulp.series(['static']));

    return server();
}));