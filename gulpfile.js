const {src, dest} = require('gulp');
const gts = require('gulp-typescript');

exports.default = () => {
  return src(['src/components/**/*.tsx', 'src/components/**/*.ts'])
    .pipe(gts.createProject('tsconfig.json', {
      declaration: true,
      emitDeclarationOnly: true
    })())
    .pipe(dest('typings'));
};
