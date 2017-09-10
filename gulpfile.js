var gulp = require('gulp');
var sass = require('gulp-sass');
var cleanCss = require('gulp-clean-css');
var rename = require('gulp-rename');
var concat = require('gulp-concat');

var paths = {
  sass: ['./scss/**/*.scss']
};

gulp.task('default', ['sass']);

gulp.task('sass', function(done) {
  gulp.src('./scss/ionic.app.scss')
    .pipe(sass())
    .on('error', sass.logError)
    .pipe(gulp.dest('./www/css/'))
    .pipe(cleanCss({
      keepSpecialComments: 0
    }))
    .pipe(rename({ extname: '.min.css' }))
    .pipe(gulp.dest('./www/css/'))
    .on('end', done);
});

gulp.task('watch', ['sass'], function() {
  gulp.watch(paths.sass, ['sass']);
});

//合并css
gulp.task('concat-mergeCss', function () {
  gulp.src(['page/**/*.css'])
    .pipe(concat('bundle.css'))
    // .pipe(uglify())
    .pipe(gulp.dest('./www/css'));
});
//合并js
gulp.task('concat-mergeJS', function () {
  gulp.src(['compileJS/app.js','page/**/*.js'])
    .pipe(concat('base.js'))
    // .pipe(uglify())
    .pipe(gulp.dest('./www/js'));
});
//合并services
gulp.task('concat-mergeServices', function () {
  gulp.src(['services/api.js','services/*.js'])
    .pipe(concat('services.js'))
    // .pipe(uglify())
    .pipe(gulp.dest('./www/js'));
});
//复制templates下的每个文件夹下的每个html文件到page这个文件夹中
gulp.task('copy-mergeHtml', function () {
  gulp.src([
    'page/air-clinic/*.html',
    'page/login/*.html',
    'page/air-lift/*.html',
    'page/chat-detail/*.html',
    'page/home-page/*.html',
    'page/my-service/*.html',
    'page/reset/*.html',
    'page/sign-in/*.html',
    'page/con-room/*.html',
    'page/tab-account/*.html',
    'page/patient-room/*.html',
    'page/doc-details/*.html',
    'page/condition-description/*.html',
    'page/payment/*.html',
    'page/tab-account/*.html',
    'page/personal-info/*.html',
    'page/modify-password/*.html',
    'page/my-appointment/*.html',
    'page/family-contacts/*.html',
    'page/add-contacts/*.html',
    'page/revise-contacts/*.html',
    'page/clinic-site/*.html'
  ])
    .pipe(gulp.dest('./www/templates'));
});
//监听
gulp.task('start',['copy-mergeHtml','concat-mergeCss','concat-mergeJS','concat-mergeServices'], function () {
  gulp.watch(['page/**/*.css','compileJS/app.js','page/**/*.js'], ['concat-mergeCss','concat-mergeJS'], function (event) {

  });
  gulp.watch(['services/*.js'], ['concat-mergeServices'], function (event) {

  });
  gulp.watch(['page/air-clinic/*.html',
    'page/login/*.html',
    'page/air-lift/*.html',
    'page/chat-detail/*.html',
    'page/home-page/*.html',
    'page/my-service/*.html',
    'page/reset/*.html',
    'page/sign-in/*.html',
    'page/con-room/*.html',
    'page/tab-account/*.html',
    'page/patient-room/*.html',
    'page/doc-details/*.html',
    'page/condition-description.html/*.html',
    'page/payment/*.html',
    'page/tab-account/*.html',
    'page/personal-info/*.html',
    'page/modify-password/*.html',
    'page/my-appointment/*.html',
    'page/family-contacts/*.html',
    'page/add-contacts/*.html',
    'page/revise-contacts/*.html',
    'page/clinic-site/*.html'
  ], ['copy-mergeHtml'], function (event) {

  });
});//监听
