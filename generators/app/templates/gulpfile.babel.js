// generated on 2015-10-28
import gulp from 'gulp';
import gulpLoadPlugins from 'gulp-load-plugins';
import browserSync from 'browser-sync';
import del from 'del';
import {stream as wiredep} from 'wiredep';
import concat from 'gulp-concat';
import uglify from 'gulp-uglify';
import jshint from 'gulp-jshint';
import rename from 'gulp-rename';
import notify from 'gulp-notify';
import handlebars from 'gulp-handlebars';
import wrap from 'gulp-wrap';
import declare from 'gulp-declare';
import inject from 'gulp-inject';
import injectstring from 'gulp-inject-string';
import replace from 'gulp-replace';
import wait from 'gulp-wait';
import minifycss from 'gulp-minify-css';


const $ = gulpLoadPlugins();
const reload = browserSync.reload;


gulp.task('lint', function() {
  return gulp.src('code/src/scripts/**/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'))
});


// Styles
gulp.task('styles', () => {
return gulp.src('code/src/styles/main.scss')
    .pipe($.sass({
        style: 'expanded',
        "sourcemap=none": true,
        noCache: true
    }))
    .pipe($.autoprefixer({browsers: ['> 1%', 'last 2 versions', 'ie >= 9', 'Firefox ESR']}))
    .pipe($.rename({ suffix: '.min' }))
    .pipe(minifycss())
    .pipe(gulp.dest('code/dist/'))
    .pipe(wait(250))
    .pipe(reload({stream: true}))
});




// Scripts
gulp.task('scripts', function() {
  return gulp.src('code/src/scripts/**/*.js')
    //.pipe(jshint('.jshintrc'))
    //.pipe(jshint.reporter('default'))
    .pipe(concat('main.js'))
    .pipe(rename({ suffix: '.min' }))
    .pipe(uglify())
    .pipe(gulp.dest('code/dist/js'))
    .pipe(reload({stream: true}));
});


// html
gulp.task('html', ['styles'], () => {
  const assets = $.useref.assets({searchPath: ['code/src', '.']});

  return gulp.src('code/src/*.html')
    .pipe(assets)
    .pipe($.if('*.js', $.uglify()))
    .pipe($.if('*.css', $.minifyCss({compatibility: '*'})))
    .pipe(assets.restore())
    .pipe($.useref())
    .pipe($.if('*.html', $.minifyHtml({conditionals: true, loose: true})))
    .pipe(gulp.dest('code/dist'))
    .pipe(reload({stream: true}));
});


// templates
gulp.task('templates', function(){
  gulp.src('code/src/templates/**/*.hbs')
    .pipe(handlebars())
    .pipe(wrap('Handlebars.template(<%= contents %>)'))
    .pipe(declare({
        namespace: 'Templates',
        noRedeclare: true, // Avoid duplicate declarations
    }))
    .pipe(concat('templates.js'))
    .pipe(gulp.dest('code/dist/js/'))
    .pipe(reload({stream: true}));
});

// lang xml
gulp.task('lang', function(){
    gulp.src('code/src/lang/**/*.xml')
    .pipe(replace('<![CDATA[', ''))
    .pipe(replace(']]>', ''))

    .pipe(replace('\'','&apos;'))
    .pipe(replace(' & ',' &amp; '))

    .pipe(replace(/<\/text>/g, ']]><\/text>'))

    .pipe(replace(/<text id="([^\"]*)">([^\]\]\>\<]*)/g, '<text id="$1"><![CDATA[$2'))

    .pipe(gulp.dest('code/dist/lang'))
    .pipe(reload({stream: true}));
});


// server
gulp.task('serve', ['lang','html','styles', 'scripts','templates'], () => {
  browserSync({
    notify: false,
    port: 9000,
    https: false,
    server: {
      baseDir: ['code/dist'],
      routes: {
        '/bower_components': 'bower_components'
      }
    }
  });

  gulp.watch([
    'code/dist/*.html',
  ]).on('change', reload);

  gulp.watch('code/src/scripts/**/*.js', ['scripts']);
  gulp.watch('code/src/styles/**/*.scss', ['styles']);
  gulp.watch('code/src/**/*.html', ['html']);
  gulp.watch('code/src/templates/**/*.hbs', ['templates']);
  gulp.watch('code/src/lang/**/*.xml', ['lang']);
});

///////////
// debug //
///////////

gulp.task('clean:debug', del.bind(null, ['code/dist/debug/*.*']));


gulp.task('injectstring',['copy'], function(){
    return gulp.src('code/dist/index.html')
        .pipe(wait(250))
        .pipe(injectstring.before('</head>', '\n<!-- inject:css -->\n<!-- endinject -->\n'))
        .pipe(injectstring.before('</body>', '\n<!-- inject:js -->\n<!-- endinject -->\n'))
        .pipe(rename('debug.html'))
        .pipe(gulp.dest('code/dist'));

});

gulp.task('copy',['lint'], function(){
    return gulp.src('code/src/styles/**/*.scss')
        .pipe($.plumber())
        .pipe($.sourcemaps.init())
        .pipe($.sass.sync({
          outputStyle: 'expanded',
          precision: 10,
          includePaths: ['.']
        }).on('error', $.sass.logError))
        .pipe($.autoprefixer({browsers: ['> 1%', 'last 2 versions', 'ie >= 9', 'Firefox ESR']}))
        .pipe($.sourcemaps.write())
        .pipe(gulp.dest('code/dist/debug'))
        .pipe(reload({stream: true}))
        .pipe(gulp.src('code/src/scripts/**/*.js'))
        .pipe(gulp.dest('code/dist/debug'));

});

gulp.task('inject',['injectstring'], function () {
    return gulp.src("./code/dist/debug.html")
    .pipe(wait(250))
    .pipe(inject(gulp.src(['./code/dist/debug/**/*.js', './code/dist/debug/*.css'],{read: false})))
    .pipe(gulp.dest("./code/dist/"));

});

gulp.task('replace',['inject'], function(){
  return gulp.src(['code/dist/debug.html'])
    .pipe(wait(250))
    .pipe(replace('<title>', '<title>DEBUG '))
    .pipe(replace('<link rel="stylesheet" href="main.css">', ''))
    .pipe(replace('<script src="js/main.min.js"></script>', ''))
    .pipe(replace('/code/dist', ''))
    .pipe(gulp.dest('code/dist/'));
});

gulp.task('serve:debug',['replace'], () => {

  browserSync({
    notify: true,
    port: 9000,
    ui: false,
    server: {
      baseDir: 'code/dist',
      index: "debug.html"
    }
  });

  gulp.watch([
    'code/src/*.html',
    'code/src/scripts/**/*.js',
    'code/src/styles/**/*.scss',
    'code/src/templates/**/*.hbs'
  ]).on('change', reload);

  gulp.watch('code/src/scripts/**/*.js', ['replace']);
  gulp.watch('code/src/styles/**/*.scss', ['replace']);
  gulp.watch('code/src/**/*.html', ['replace']);
  gulp.watch('code/src/templates/**/*.hbs', ['replace']);

});


