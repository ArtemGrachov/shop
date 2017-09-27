module.exports = function () {
    $.gulp.task('scripts', function () {
        return $.gulp.src($.cfg.app + 'js/**.*js')
            .pipe($.gp.concat('main.js'))
            .pipe($.gulp.dest($.cfg.dist + 'js'))
    })
}