# Gulp Starter Template
This is starter template for projects where Gulp is used for manipulating with CSS and JS files. <br />
SASS, Babel (es6) & Eslint are installed by default.

Main SASS file is located in `src/scss/index.scss`. All changes related to the CSS must be made in that file. At the end of developing that file will be compiled and moved to `prod/css/index.css`.<br />

Main JS file is `src/js/index.js` - All changes related to JS must be made in that file. At the end of developing that file will be compiled and moved to `prod/js/index.js`. <br />

All additional settings you can include in this file: `gulpfile.js`.

## Installation
* Clone the repository `git clone https://github.com/steve-232/gulp-starter-template`
* Run `npm i`

## Usage
Run
* `npm run dev` for developing
* `npm run prod` for the final version - *( Entire code will be minified in one JavaScript and one CSS file. All comments and "console" based functions will be removed from those files. Files will be located in the "prod" folder )*

For Windows OS use
* `npm run dev:win`
* `npm run prod:win`

## License
[MIT license](http://www.opensource.org/licenses/MIT)
