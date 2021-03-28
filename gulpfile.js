const {src, dest, series} = require('gulp');
const gts = require('gulp-typescript');
const rename = require('gulp-rename');

function scripts() {
  return src(['src/components/**/*.tsx', 'src/components/**/*.ts'])
    .pipe(gts.createProject('tsconfig.json', {
      declaration: true,
      emitDeclarationOnly: true
    })())
    .pipe(dest('lib'));
}

function renameEntryScript() {
  return src('lib/vue-virtual-tree.common.js')
    .pipe(rename("index.js"))
    .pipe(dest('lib'));
}

exports.default = series(scripts, renameEntryScript);
