module.exports = function() {
    $.gulp.task('sass', function() {
        return $.gulp.src($.cfg.app + 'sass/main.scss')
            .pipe($.gp.sass())
            .pipe($.gp.autoprefixer())
            .pipe($.gp.cssbeautify())
            .pipe($.gulp.dest($.cfg.dist + 'css'))
            .pipe($.browserSync.reload({ stream: true }))
    })
}