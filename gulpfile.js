const {src, dest, series} = require('gulp');
const gts = require('gulp-typescript');
const del = require('del');

function scripts() {
  return src(['src/components/**/*.tsx', 'src/components/**/*.ts'])
    .pipe(gts.createProject('src/components/tsconfig.json')())
    .pipe(dest('typings'));
}

function clean() {
  return del(['typings']);
}

exports.default = series(clean, scripts);
