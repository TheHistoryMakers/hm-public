webpackJsonp(["styles"],{

/***/ "../../../../../src/styles.scss":
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__("../../../../css-loader/index.js?{\"sourceMap\":false,\"import\":false}!../../../../postcss-loader/lib/index.js?{\"ident\":\"postcss\",\"sourceMap\":false}!../../../../sass-loader/lib/loader.js?{\"sourceMap\":false,\"precision\":8,\"includePaths\":[\"/Users/shaneardell/projects/hm-public/web/themes/custom/hm-public-theme/hero-video-player/src/app\"]}!../../../../../src/styles.scss");
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__("../../../../style-loader/addStyles.js")(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../node_modules/css-loader/index.js??ref--8-1!../node_modules/postcss-loader/lib/index.js??postcss!../node_modules/sass-loader/lib/loader.js??ref--8-3!./styles.scss", function() {
			var newContent = require("!!../node_modules/css-loader/index.js??ref--8-1!../node_modules/postcss-loader/lib/index.js??postcss!../node_modules/sass-loader/lib/loader.js??ref--8-3!./styles.scss");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ "../../../../css-loader/index.js?{\"sourceMap\":false,\"import\":false}!../../../../postcss-loader/lib/index.js?{\"ident\":\"postcss\",\"sourceMap\":false}!../../../../sass-loader/lib/loader.js?{\"sourceMap\":false,\"precision\":8,\"includePaths\":[\"/Users/shaneardell/projects/hm-public/web/themes/custom/hm-public-theme/hero-video-player/src/app\"]}!../../../../../src/styles.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "/* You can add global styles to this file, and also import other style files */\n.hero-vid__body {\n  font-family: 'Source Sans Pro', sans-serif; }\n.about__link,\n.about__link:visited {\n  font-family: 'Source Sans Pro', sans-serif;\n  font-weight: 600; }\n.header-1, .header-2, .header-3, .header-4, .video-header, .about__heading, .next-vid__da-button, .hero-vid__title {\n  font-family: 'Oswald', sans-serif;\n  font-weight: 500; }\n.header-1 {\n  color: #232323;\n  font-size: 1.85714rem;\n  line-height: 1.22222em;\n  margin: 0 0 2.23077em;\n  text-transform: uppercase; }\n.header-2 {\n  color: #232323;\n  font-size: 1.57143em;\n  line-height: 26px;\n  margin: 0 0 0.71429em;\n  padding: 0; }\n.header-3 {\n  color: #232323;\n  font-size: 1.57142857em;\n  margin-bottom: 0;\n  margin-top: 0;\n  padding-bottom: 1.11111em;\n  padding-top: 0; }\n.header-4 {\n  color: #232323;\n  font-size: 1.57142857em;\n  margin: 0 0 0.3em;\n  padding: 0; }\n.bold {\n  font-weight: 700; }\n.italic {\n  font-style: italic; }\n.list-without-styles {\n  list-style-type: none;\n  padding: 0; }\n@media screen and (min-width: 769px) {\n  .video-header, .about--mobile,\n  .mobile-only {\n    display: none !important; } }\n@media screen and (max-width: 544px) {\n  \n  .tablet-and-above {\n    display: none !important; } }\n@media screen and (max-width: 768px) {\n  .about--desktop,\n  .desktop-only {\n    display: none !important; } }\n.container-fluid {\n  font-size: 1rem;\n  padding-top: 1.14285714em;\n  padding-bottom: 1.14285714em;\n  max-width: 107.14285714em; }\n.container-fluid:focus {\n    outline: 0; }\n@media screen and (min-width: 544px) {\n    .container-fluid {\n      padding-top: 2.14285714em; } }\n@media screen and (min-width: 768px) {\n    .container-fluid {\n      padding-left: 2.14285714em;\n      padding-right: 2.14285714em;\n      padding-bottom: 2.14285714em; } }\nvideo {\n  max-width: 500px;\n  margin: 0 auto; }\nvg-player {\n  height: auto; }\n.vg-controls {\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  background-color: #cccccc;\n  height: 2.14285714em; }\n.vg-controls__inner-wrapper {\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-flex: 2;\n      -ms-flex: 2;\n          flex: 2;\n  margin: 0 auto;\n  max-width: 35.71428571em; }\n@media screen and (-ms-high-contrast: active), (-ms-high-contrast: none) {\n    .vg-controls__inner-wrapper {\n      max-width: 100%; } }\n.vg-play-pause {\n  width: 2.14285714em; }\n.vg-scrub-bar-current-time {\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  background-color: #232323;\n  height: 0.14285714em;\n  position: relative;\n  top: initial; }\n.vg-scrub-bar-current-time .background {\n    border: 1px solid #2E2B71; }\n.vg-scrub-bar-current-time .slider {\n    background-color: #2E2B71;\n    -webkit-box-shadow: none;\n            box-shadow: none;\n    height: 0.85714286em;\n    margin-top: 0;\n    width: 0.85714286em; }\n.vg-play-pause,\n.vg-time-display,\n.vg-scrub-bar,\n.vg-volume {\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  color: #232323;\n  height: 2.14285714em; }\n.vg-time-display {\n  -webkit-box-flex: 0;\n      -ms-flex: 0;\n          flex: 0;\n  margin: 0 0.35714286em; }\n@media screen and (-ms-high-contrast: active), (-ms-high-contrast: none) {\n    .vg-time-display {\n      -webkit-box-flex: 0;\n          -ms-flex: 0 1 auto;\n              flex: 0 1 auto;\n      width: auto; } }\n.vg-time-display:not(:root:root) {\n    -webkit-box-flex: 0;\n        -ms-flex: 0 1 auto;\n            flex: 0 1 auto;\n    width: auto; }\n.vg-scrub-bar {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  width: 25.2777777777778%; }\n@media screen and (-ms-high-contrast: active), (-ms-high-contrast: none) {\n    .vg-scrub-bar {\n      height: auto; } }\n.vg-volume {\n  margin: 0 0.71428571em;\n  width: 11.1111111111111%; }\n.vg-volume .volumeBackground {\n  background-color: #232323;\n  height: 0.14285714em; }\n.vg-volume .volumeValue {\n  background-color: #2E2B71;\n  height: 0.14285714em; }\n.vg-volume .volumeKnob {\n  background-color: #2E2B71;\n  height: 0.85714286em;\n  width: 0.85714286em; }\n.vg-full-width {\n  margin: 0 0.71428571em; }\n@media screen and (max-width: 768px) {\n  .vg-volume-speaker,\n  .vg-volume,\n  .vg-full-width {\n    display: none; } }\n*::-webkit-media-controls-panel {\n  display: none !important;\n  -webkit-appearance: none; }\n*::-webkit-media-controls-start-playback-button {\n  display: none !important;\n  -webkit-appearance: none; }\n*::\\--webkit-media-controls-play-button {\n  display: none !important;\n  -webkit-appearance: none; }\n@media screen and (width: 768px) {\n  .col-sm-5,\n  .col-sm-7 {\n    width: 100%; } }\n@media screen and (max-width: 768px) {\n  .full-width-mobile {\n    margin-top: -2.85714286em;\n    padding: 0; } }\n.selected {\n  background-color: rgba(45, 133, 211, 0.3);\n  color: black; }\n.row--top {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  margin-bottom: 30px; }\n.row--top .col-left {\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-orient: vertical;\n    -webkit-box-direction: normal;\n        -ms-flex-direction: column;\n            flex-direction: column; }\n.row--top .page-title {\n    -webkit-box-flex: 2;\n        -ms-flex: 2;\n            flex: 2; }\n.row--top .button-bar {\n    margin: 0; }\n.search__links-container {\n  margin-bottom: 0; }\n.search__routerLink {\n  margin-bottom: 0; }\n.search--desktop {\n  margin-bottom: 0; }\n.button-bar {\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  margin-top: 1.14285714em;\n  margin-bottom: 0.5em; }\n.video-header {\n  background-color: #232323;\n  color: #fff;\n  font-size: 1.28571429rem;\n  letter-spacing: -.5px;\n  line-height: 1.22222222em;\n  margin-bottom: 0;\n  padding: .5rem 1rem;\n  text-transform: uppercase; }\n.video-header__category {\n  text-transform: capitalize; }\n.video-title {\n  display: inline-block; }\n.video-container {\n  margin: 0 auto 1.875rem;\n  max-width: 90rem; }\n.videoBlock {\n  display: block;\n  margin: 0 auto;\n  max-width: 320px;\n  /* TODO: decide if we want greater than 1x display width, or stay at max 1x display width which is 320 pixels */\n  min-height: 180px;\n  height: auto;\n  -o-object-fit: fill;\n     object-fit: fill; }\n.no-padding {\n  padding: 0; }\n.no-left-padding {\n  padding-left: 0; }\n.no-right-padding {\n  padding-right: 0; }\n.about {\n  /* TODO: Later, dress up with gradient backgrounds, e.g.,\n    background-color: transparent;\n    background-image: linear-gradient(to bottom, rgba(30, 87, 153, 0.2) 0%, rgba(125, 185, 232, 0) 100%);\n    background-repeat: repeat;\n    */\n  padding: 2.64285714em 0;\n  margin-bottom: 0.5em; }\n.about--mobile {\n    display: none;\n    padding: 1em 0; }\n@media screen and (max-width: 769px) {\n    .about--mobile-active {\n      display: inherit; } }\n.about p:last-of-type {\n    margin-bottom: 0; }\n.about__section {\n  border-bottom: 1px solid #cccccc;\n  margin-bottom: 0.71428571em;\n  padding-bottom: 0.85714286em; }\n@media screen and (min-width: 768px) {\n    .about__section {\n      margin-bottom: 1.14285714em;\n      padding-bottom: 1.14285714em; } }\n.about__section:first-of-type {\n    margin-top: 1.57142857em; }\n@media screen and (min-width: 768px) {\n      .about__section:first-of-type {\n        margin-top: 0; } }\n.about__section:last-of-type {\n    border-bottom: 0; }\n.about__heading {\n  color: #232323;\n  font-size: 1.14285714em;\n  letter-spacing: -.4px;\n  line-height: 1.25em;\n  text-transform: uppercase; }\n.about__copy--favorites {\n  margin: 0; }\n.about__link,\n.about__link:visited {\n  color: #2E2B71; }\n.transcriptTextArea {\n  display: inline; }\n.shadowview {\n  width: 50%;\n  -webkit-box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.75);\n          box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.75);\n  margin-top: 2px;\n  margin-bottom: 6px; }\n.storyduration {\n  text-align: center;\n  color: #1E1810;\n  font-size: 0.9em;\n  line-height: 0.95em;\n  margin-top: 0.4em; }\n.bumpUp {\n  margin-top: 0.0em;\n  margin-bottom: 0.3em;\n  margin-right: 0em;\n  margin-left: 0em; }\ninput {\n  color: #1E1810;\n  font-family: 'Roboto', sans-serif;\n  font-weight: 300;\n  font-size: 1em; }\n.adjust-height {\n  overflow-x: hidden;\n  overflow-y: auto; }\n.next-vid__row {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex; }\n.next-vid__row:hover {\n    cursor: pointer; }\n.video__title,\n.next-vid__title {\n  color: #941A1D;\n  font-weight: 700; }\n.video__title {\n  font-size: 1.28571429rem; }\n.next-vid__preview:hover {\n  cursor: pointer; }\n.next-vid__thumb {\n  font-size: 1rem;\n  max-width: 100%; }\n.next-vid__da-button {\n  background-color: #682052;\n  border: 1px solid transparent;\n  color: #fff;\n  display: block;\n  font-size: 1.78571429rem;\n  font-weight: 400;\n  line-height: 1.2;\n  padding: 0.6em;\n  margin-top: 0.4em;\n  -webkit-transition: all .2s ease-in-out;\n  transition: all .2s ease-in-out; }\n.next-vid__da-button:hover {\n    background-color: #fff;\n    border: 1px solid #682052;\n    color: #682052;\n    text-decoration: none; }\n.overlay-play-container::before {\n  background: #fff;\n  border-radius: 100%;\n  color: #941A1D; }\n.hero-vid__right-col {\n  background-color: #fff;\n  padding: 1.875rem 4.375rem 3.75rem 1.875rem; }\n.hero-vid__title {\n  font-size: 2rem; }\n.hero-vid__body {\n  font-size: 1.5rem;\n  line-height: 120%; }\n", ""]);

// exports


/***/ }),

/***/ "../../../../css-loader/index.js?{\"sourceMap\":false,\"import\":false}!../../../../postcss-loader/lib/index.js?{\"ident\":\"postcss\",\"sourceMap\":false}!../../../../videogular2/fonts/videogular.css":
/***/ (function(module, exports, __webpack_require__) {

var escape = __webpack_require__("../../../../css-loader/lib/url/escape.js");
exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "@font-face {\n  font-family: 'videogular';\n  src:  url('data:application/vnd.ms-fontobject;base64,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');\n  src:  url(" + escape(__webpack_require__("../../../../videogular2/fonts/videogular.eot?hj1wei")) + "#iefix) format('embedded-opentype'),\n    url('data:font/ttf;base64,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') format('truetype'),\n    url('data:font/woff;base64,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') format('woff'),\n    url(" + escape(__webpack_require__("../../../../videogular2/fonts/videogular.svg?hj1wei")) + "#videogular) format('svg');\n  font-weight: normal;\n  font-style: normal;\n}\n\n[class^=\"vg-icon-\"], [class*=\" vg-icon-\"] {\n  /* use !important to prevent issues with browser extensions that change fonts */\n  font-family: 'videogular' !important;\n  speak: none;\n  font-style: normal;\n  font-weight: normal;\n  font-variant: normal;\n  text-transform: none;\n  line-height: 1;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n  width: 50px;\n  font-size: 24px;\n\n  /* Better Font Rendering =========== */\n  -webkit-font-smoothing: antialiased;\n  -moz-osx-font-smoothing: grayscale;\n}\n\n.vg-icon-closed_caption:before {\n  content: \"\\E006\";\n}\n\n.vg-icon-pause:before {\n  content: \"\\E018\";\n}\n\n.vg-icon-play_arrow:before {\n  content: \"\\E01B\";\n}\n\n.vg-icon-repeat:before {\n  content: \"\\E023\";\n}\n\n.vg-icon-replay:before {\n  content: \"\\E025\";\n}\n\n.vg-icon-skip_next:before {\n  content: \"\\E027\";\n}\n\n.vg-icon-skip_previous:before {\n  content: \"\\E028\";\n}\n\n.vg-icon-stop:before {\n  content: \"\\E02A\";\n}\n\n.vg-icon-volume_down:before {\n  content: \"\\E030\";\n}\n\n.vg-icon-volume_mute:before {\n  content: \"\\E031\";\n}\n\n.vg-icon-volume_off:before {\n  content: \"\\E032\";\n}\n\n.vg-icon-volume_up:before {\n  content: \"\\E033\";\n}\n\n.vg-icon-hd:before {\n  content: \"\\E035\";\n}\n\n.vg-icon-forward_10:before {\n  content: \"\\E038\";\n}\n\n.vg-icon-forward_30:before {\n  content: \"\\E039\";\n}\n\n.vg-icon-replay_10:before {\n  content: \"\\E03B\";\n}\n\n.vg-icon-replay_30:before {\n  content: \"\\E03C\";\n}\n\n.vg-icon-fullscreen:before {\n  content: \"\\E20C\";\n}\n\n.vg-icon-fullscreen_exit:before {\n  content: \"\\E20D\";\n}\n\nvg-player video {\n    width: 100%;\n    height: 100%;\n}\n", ""]);

// exports


/***/ }),

/***/ "../../../../css-loader/lib/css-base.js":
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function(useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if(item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}


/***/ }),

/***/ "../../../../css-loader/lib/url/escape.js":
/***/ (function(module, exports) {

module.exports = function escape(url) {
    if (typeof url !== 'string') {
        return url
    }
    // If url is already wrapped in quotes, remove them
    if (/^['"].*['"]$/.test(url)) {
        url = url.slice(1, -1);
    }
    // Should url be wrapped?
    // See https://drafts.csswg.org/css-values-3/#urls
    if (/["'() \t\n]/.test(url)) {
        return '"' + url.replace(/"/g, '\\"').replace(/\n/g, '\\n') + '"'
    }

    return url
}


/***/ }),

/***/ "../../../../style-loader/addStyles.js":
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
var stylesInDom = {},
	memoize = function(fn) {
		var memo;
		return function () {
			if (typeof memo === "undefined") memo = fn.apply(this, arguments);
			return memo;
		};
	},
	isOldIE = memoize(function() {
		return /msie [6-9]\b/.test(self.navigator.userAgent.toLowerCase());
	}),
	getHeadElement = memoize(function () {
		return document.head || document.getElementsByTagName("head")[0];
	}),
	singletonElement = null,
	singletonCounter = 0,
	styleElementsInsertedAtTop = [];

module.exports = function(list, options) {
	if(typeof DEBUG !== "undefined" && DEBUG) {
		if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};
	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (typeof options.singleton === "undefined") options.singleton = isOldIE();

	// By default, add <style> tags to the bottom of <head>.
	if (typeof options.insertAt === "undefined") options.insertAt = "bottom";

	var styles = listToStyles(list);
	addStylesToDom(styles, options);

	return function update(newList) {
		var mayRemove = [];
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			domStyle.refs--;
			mayRemove.push(domStyle);
		}
		if(newList) {
			var newStyles = listToStyles(newList);
			addStylesToDom(newStyles, options);
		}
		for(var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];
			if(domStyle.refs === 0) {
				for(var j = 0; j < domStyle.parts.length; j++)
					domStyle.parts[j]();
				delete stylesInDom[domStyle.id];
			}
		}
	};
}

function addStylesToDom(styles, options) {
	for(var i = 0; i < styles.length; i++) {
		var item = styles[i];
		var domStyle = stylesInDom[item.id];
		if(domStyle) {
			domStyle.refs++;
			for(var j = 0; j < domStyle.parts.length; j++) {
				domStyle.parts[j](item.parts[j]);
			}
			for(; j < item.parts.length; j++) {
				domStyle.parts.push(addStyle(item.parts[j], options));
			}
		} else {
			var parts = [];
			for(var j = 0; j < item.parts.length; j++) {
				parts.push(addStyle(item.parts[j], options));
			}
			stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
		}
	}
}

function listToStyles(list) {
	var styles = [];
	var newStyles = {};
	for(var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};
		if(!newStyles[id])
			styles.push(newStyles[id] = {id: id, parts: [part]});
		else
			newStyles[id].parts.push(part);
	}
	return styles;
}

function insertStyleElement(options, styleElement) {
	var head = getHeadElement();
	var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
	if (options.insertAt === "top") {
		if(!lastStyleElementInsertedAtTop) {
			head.insertBefore(styleElement, head.firstChild);
		} else if(lastStyleElementInsertedAtTop.nextSibling) {
			head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			head.appendChild(styleElement);
		}
		styleElementsInsertedAtTop.push(styleElement);
	} else if (options.insertAt === "bottom") {
		head.appendChild(styleElement);
	} else {
		throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
	}
}

function removeStyleElement(styleElement) {
	styleElement.parentNode.removeChild(styleElement);
	var idx = styleElementsInsertedAtTop.indexOf(styleElement);
	if(idx >= 0) {
		styleElementsInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement(options) {
	var styleElement = document.createElement("style");
	styleElement.type = "text/css";
	insertStyleElement(options, styleElement);
	return styleElement;
}

function createLinkElement(options) {
	var linkElement = document.createElement("link");
	linkElement.rel = "stylesheet";
	insertStyleElement(options, linkElement);
	return linkElement;
}

function addStyle(obj, options) {
	var styleElement, update, remove;

	if (options.singleton) {
		var styleIndex = singletonCounter++;
		styleElement = singletonElement || (singletonElement = createStyleElement(options));
		update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
		remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
	} else if(obj.sourceMap &&
		typeof URL === "function" &&
		typeof URL.createObjectURL === "function" &&
		typeof URL.revokeObjectURL === "function" &&
		typeof Blob === "function" &&
		typeof btoa === "function") {
		styleElement = createLinkElement(options);
		update = updateLink.bind(null, styleElement);
		remove = function() {
			removeStyleElement(styleElement);
			if(styleElement.href)
				URL.revokeObjectURL(styleElement.href);
		};
	} else {
		styleElement = createStyleElement(options);
		update = applyToTag.bind(null, styleElement);
		remove = function() {
			removeStyleElement(styleElement);
		};
	}

	update(obj);

	return function updateStyle(newObj) {
		if(newObj) {
			if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
				return;
			update(obj = newObj);
		} else {
			remove();
		}
	};
}

var replaceText = (function () {
	var textStore = [];

	return function (index, replacement) {
		textStore[index] = replacement;
		return textStore.filter(Boolean).join('\n');
	};
})();

function applyToSingletonTag(styleElement, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (styleElement.styleSheet) {
		styleElement.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = styleElement.childNodes;
		if (childNodes[index]) styleElement.removeChild(childNodes[index]);
		if (childNodes.length) {
			styleElement.insertBefore(cssNode, childNodes[index]);
		} else {
			styleElement.appendChild(cssNode);
		}
	}
}

function applyToTag(styleElement, obj) {
	var css = obj.css;
	var media = obj.media;

	if(media) {
		styleElement.setAttribute("media", media)
	}

	if(styleElement.styleSheet) {
		styleElement.styleSheet.cssText = css;
	} else {
		while(styleElement.firstChild) {
			styleElement.removeChild(styleElement.firstChild);
		}
		styleElement.appendChild(document.createTextNode(css));
	}
}

function updateLink(linkElement, obj) {
	var css = obj.css;
	var sourceMap = obj.sourceMap;

	if(sourceMap) {
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	var blob = new Blob([css], { type: "text/css" });

	var oldSrc = linkElement.href;

	linkElement.href = URL.createObjectURL(blob);

	if(oldSrc)
		URL.revokeObjectURL(oldSrc);
}


/***/ }),

/***/ "../../../../videogular2/fonts/videogular.css":
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__("../../../../css-loader/index.js?{\"sourceMap\":false,\"import\":false}!../../../../postcss-loader/lib/index.js?{\"ident\":\"postcss\",\"sourceMap\":false}!../../../../videogular2/fonts/videogular.css");
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__("../../../../style-loader/addStyles.js")(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../../css-loader/index.js??ref--7-1!../../postcss-loader/lib/index.js??postcss!./videogular.css", function() {
			var newContent = require("!!../../css-loader/index.js??ref--7-1!../../postcss-loader/lib/index.js??postcss!./videogular.css");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ "../../../../videogular2/fonts/videogular.eot?hj1wei":
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "videogular.535a6d96e96b8bc4549f.eot";

/***/ }),

/***/ "../../../../videogular2/fonts/videogular.svg?hj1wei":
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "videogular.d4f9c9f4aca582e94b2a.svg";

/***/ }),

/***/ 2:
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__("../../../../videogular2/fonts/videogular.css");
module.exports = __webpack_require__("../../../../../src/styles.scss");


/***/ })

},[2]);
//# sourceMappingURL=styles.bundle.js.map