var gulp = require("gulp"),
  http = require("http"),
  concat = require('gulp-concat'),
  minifyCSS = require("gulp-minify-css"),
  fs = require('fs'),
  uglify = require('gulp-uglify'),
  replace = require('gulp-replace-task'),
  bump = require('gulp-bump'),
  git = require('gulp-git'),
  less = require('gulp-less'),
  rename = require("gulp-rename"),
  templateCache = require('gulp-angular-templatecache'),
  connect = require('gulp-connect'),
  argv = require('yargs').argv,
  gulpsync = require('gulp-sync')(gulp),
  ngAnnotate = require('gulp-ng-annotate');

gulp.copy = function(src, dest) {
  return gulp.src(src, {
      base: "."
    })
    .pipe(gulp.dest(dest));
};

var __appId;

var config = {
  path: {
    appsDir: './apps/',
    srcDir: './src/',
    tmpDir: './tmp/'
  },
  defaultName: 'default',
  vendor: {
    js: [
      './bower/ionic/js/ionic.bundle.js',
      './bower/lodash/dist/lodash.js'
    ],
    css: [
      './bower/ionic/css/ionic.min.css'
    ]
  }
}

config.tmpSource = {
  js: config.path.tmpDir + 'scripts',
  scss: config.path.tmpDir + 'styles',
  templates: config.path.tmpDir + 'templates',
}


gulp.task('create', ['_setAppId', '_cloneSrcDir', '_makeAppsDir']);
gulp.task('_cloneSrcDir', function() {
  return fs.mkdir(config.path.srcDir + __appId);
  //return gulp.copy(config.path.src + config.defaultName, config.path.src + __appId);
});
gulp.task('_makeAppsDir', function() {
  return fs.mkdir(config.path.appsDir + __appId);
});

var SRC;

var DEST = {
    vendor: {
      js: 'vendor.js',
      css: 'vendor.css'
    },
    js: 'scripts.js',
    css: 'styles.css',
    templates: 'templates.js'
  }
  /*
  gulp.task('build:scripts-site', function() {
    gulp.src(SRC.site.js)
      .pipe(ngAnnotate())
      .pipe(concat(DEST.site.js))
      .pipe(uglify())
      .pipe(gulp.dest(PATH.pack))

    gulp.src(SRC.vendor.js)
      .pipe(concat(DEST.site.vendor.js))
      .pipe(uglify())
      .pipe(gulp.dest(PATH.pack))
  });*/

gulp.task("watch", function() {
  if (!__appId) {
    console.error('Please, set app id; * * --id APPID');
    process.exit();
  }
  gulp.watch(SRC.source.js, gulpsync.sync(["merge:scripts","pack:scripts"]));
  gulp.watch(SRC.source.scss, gulpsync.sync(["merge:styles","pack:styles"]));
  gulp.watch(SRC.source.templates, gulpsync.sync(["merge:templates","pack:templates"]));
});

/* MERGE */
/* @TODO: выделить в отдельный модуль */
//При мердже сначала копируются в темп дефолтные файлы, а затем файлы текущего приложения
gulp.task('merge', ['merge:scripts', 'merge:styles', 'merge:templates']);
// таск для мерджа скриптов.
gulp.task('merge:scripts', function() {
  return gulp.src(SRC.source.js)
    .pipe(gulp.dest(config.tmpSource.js))
});
// таск для мерджа стилей
gulp.task('merge:styles', function() {
  return gulp.src(SRC.source.scss)
    .pipe(gulp.dest(config.tmpSource.scss))
});
// таск для мерджа шаблонов
gulp.task('merge:templates', function() {
  return gulp.src(SRC.source.templates)
    .pipe(gulp.dest(config.tmpSource.templates))
});

/* PACK */
/* @TODO: выделить в отдельный модуль */
// таск для упаковки/преобразования сорцов из темпа в директорию приложения
gulp.task('pack', ['pack:scripts', 'pack:styles', 'pack:templates', 'pack:scripts-vendor', 'pack:styles-vendor']);

gulp.task('pack:scripts', function() {
  return gulp.src(config.tmpSource.js + '/**/*.js')
    .pipe(replace({
      patterns: [{
        match: 'quiz',
        replacement: getQuiz()
      }]
    }))
    .pipe(ngAnnotate())
    .pipe(concat(DEST.js))
    .pipe(gulp.dest(SRC.packDir));
});

gulp.task('pack:styles', function() {
  return gulp.src(config.tmpSource.scss + '/**/*.scss')
    .pipe(less())
    .pipe(concat(DEST.css))
    .pipe(gulp.dest(SRC.packDir));
});

gulp.task('pack:templates', function() {
  gulp.src(config.tmpSource.templates + '/**/*.html')
    .pipe(templateCache(DEST.templates, {
      standalone: true,
      root: './',
      module: 'app.templates'
    }))
    .pipe(gulp.dest(SRC.packDir));
});

gulp.task('pack:scripts-vendor', function() {
  return gulp.src(SRC.vendor.js)
    .pipe(concat(DEST.vendor.js))
    .pipe(gulp.dest(SRC.packDir))
});

gulp.task('pack:styles-vendor', function() {
  return gulp.src(SRC.vendor.css)
    .pipe(minifyCSS({
      keepBreaks: false
    }))
    .pipe(concat(DEST.vendor.css))
    .pipe(gulp.dest(SRC.packDir))
});



/* PACK */
/* @TODO: выделить в отдельный модуль */
// клонирование www директорий
gulp.task('clone', gulpsync.sync(['clone:default', 'clone:custom']));
gulp.task('clone:default', function() {
  return gulp.src(SRC.default.www)
    .pipe(gulp.dest(SRC.appFolder))
});

gulp.task('clone:custom', function() {
  return gulp.src(SRC.app.www)
    .pipe(gulp.dest(SRC.appFolder))
});

gulp.task('serve', gulpsync.sync(['_setAppId', '_setSrc', 'build', 'watch']), function() {
  connect.server({
    root: SRC.appFolder,
    livereload: false,
    port: 8500
  });
});

gulp.task("_setAppId", function() {
  __appId = argv.id;
  if (!argv.id) {
    console.error('Please, set app id; gulp serve --id APPID');
    process.exit();
  }
  getQuiz();
});
gulp.task("_setSrc", function() {
  SRC = {
    appFolder: config.path.appsDir + __appId,
    vendor: config.vendor,
    default: {
      js: [config.path.srcDir + 'default/**/*.js'],
      scss: [config.path.srcDir + 'default/**/*.scss'],
      templates: [config.path.srcDir + 'default/**/*.html'],
      www: config.path.srcDir + config.defaultName + '/www/**'
    },
    app: {
      js: [config.path.srcDir + __appId + '/**/*.js'],
      scss: [config.path.srcDir + __appId + '/**/*.scss'],
      templates: [config.path.srcDir + __appId + '/**/*.html'],
      www: config.path.srcDir + __appId + '/www/**'
    },
    source: {
      js: [config.path.srcDir + 'default/app/**/*.js', config.path.srcDir + __appId + '/app/**/*.js'],
      scss: [config.path.srcDir + 'default/app/**/*.scss', config.path.srcDir + __appId + '/app/**/*.scss'],
      templates: [config.path.srcDir + 'default/app/**/*.html', config.path.srcDir + __appId + '/app/**/*.html'],
    }
  }

  SRC.packDir = SRC.appFolder + '/pack';
});

gulp.task('build', gulpsync.sync(['_setAppId', '_setSrc', 'clone', 'merge', 'pack']),
  function() {

  });


var getQuiz = function() {
  try {
    return JSON.parse(fs.readFileSync('./data/' + __appId + '.json', 'utf8'));
  } catch (err) {
    console.log('ERROR: ошибка при чтении файла /data/' + __appId + '.json. Либо его нет либо он невалиден');
    process.exit();
    return {};
  }
};
