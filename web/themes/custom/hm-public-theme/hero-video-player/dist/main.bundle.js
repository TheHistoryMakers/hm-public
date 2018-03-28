webpackJsonp(["main"],{

/***/ "../../../../../src/$$_lazy_route_resource lazy recursive":
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "../../../../../src/$$_lazy_route_resource lazy recursive";

/***/ }),

/***/ "../../../../../src/app/app.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"row video-container no-gutters px-4\">\n  <section class=\"col-md-8 hero-vid__left-col\">\n    <vg-player #myVideoPlayer>\n      <vg-overlay-play [vgFor]=\"hero-video\"></vg-overlay-play>\n      <vg-controls class=\"vg-controls\">\n          <div class=\"vg-controls__inner-wrapper\">\n              <vg-play-pause class=\"vg-play-pause\"></vg-play-pause>\n              <vg-time-display class=\"vg-time-display \" [vgProperty]=\"'current'\"></vg-time-display>\n              <vg-time-display class=\"vg-time-display \" [vgProperty]=\"'total'\"></vg-time-display>\n              <vg-scrub-bar class=\"vg-scrub-bar \" >\n                  <vg-scrub-bar-current-time class=\"vg-scrub-bar-current-time\"  [vgSlider]=\"true\"></vg-scrub-bar-current-time>\n              </vg-scrub-bar>\n              <svg class=\"vg-volume-speaker\" width=\"21\" height=\"15\" viewBox=\"0 0 21 15\" xmlns=\"http://www.w3.org/2000/svg\">\n                  <title>\n                      Speaker volume icon\n                  </title>\n                  <path d=\"M5.428 3.872l5.428-3.62V14.73l-5.428-3.62H0V3.872h5.428zm7.275-1.03l1.248-.96c1.34 1.628 2.01 3.498 2.01 5.61 0 2.05-.64 3.877-1.92 5.48l-1.21-.994c1.037-1.327 1.555-2.822 1.555-4.487 0-1.748-.56-3.298-1.682-4.65 0 0 1.12 1.352 0 0zM17.623 15l.11-.145c1.713-2.147 2.57-4.59 2.57-7.328 0-2.774-.87-5.235-2.607-7.382L17.588 0l-1.502 1.158.126.145c1.484 1.82 2.226 3.896 2.226 6.224 0 2.28-.718 4.325-2.153 6.134l-.127.146L17.624 15z\" fill=\"#333\" fill-rule=\"evenodd\"/>\n              </svg>\n              <vg-volume class=\"vg-volume\"></vg-volume>\n              <svg container=\"body\" placement=\"top\" class=\"vg-full-width\" width=\"25\" height=\"15\" viewBox=\"0 0 25 15\" xmlns=\"http://www.w3.org/2000/svg\">\n                  <title>\n                      Full screen icon and button\n                  </title>\n                  <path d=\"M1 1h23v13H1z\" stroke=\"#333\" stroke-width=\"2\" fill=\"none\" fill-rule=\"evenodd\" />\n              </svg>\n          </div>\n      </vg-controls>\n      <video [vgMedia]=\"media\" #media id=\"hero-video\" preload=\"auto\" [src]=\"videoUrl\" controls></video>\n    </vg-player>\n  </section>\n  <section class=\"col-md-4 hero-vid__right-col\">\n    <h2 class=\"hero-vid__title\">{{title}}</h2>\n    <p class=\"hero-vid__body\">{{body}}</p>\n  </section>\n</div>\n"

/***/ }),

/***/ "../../../../../src/app/app.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".hero-vid__body {\n  font-family: 'Source Sans Pro', sans-serif; }\n\n.about__link,\n.about__link:visited {\n  font-family: 'Source Sans Pro', sans-serif;\n  font-weight: 600; }\n\n.header-1, .header-2, .header-3, .header-4, .video-header, .about__heading, .next-vid__da-button, .hero-vid__title {\n  font-family: 'Oswald', sans-serif;\n  font-weight: 500; }\n\n.header-1 {\n  color: #232323;\n  font-size: 1.85714rem;\n  line-height: 1.22222em;\n  margin: 0 0 2.23077em;\n  text-transform: uppercase; }\n\n.header-2 {\n  color: #232323;\n  font-size: 1.57143em;\n  line-height: 26px;\n  margin: 0 0 0.71429em;\n  padding: 0; }\n\n.header-3 {\n  color: #232323;\n  font-size: 1.57142857em;\n  margin-bottom: 0;\n  margin-top: 0;\n  padding-bottom: 1.11111em;\n  padding-top: 0; }\n\n.header-4 {\n  color: #232323;\n  font-size: 1.57142857em;\n  margin: 0 0 0.3em;\n  padding: 0; }\n\n.bold {\n  font-weight: 700; }\n\n.italic {\n  font-style: italic; }\n\n.list-without-styles {\n  list-style-type: none;\n  padding: 0; }\n\n@media screen and (min-width: 769px) {\n  .video-header, .about--mobile,\n  .mobile-only {\n    display: none !important; } }\n\n@media screen and (max-width: 544px) {\n  \n  .tablet-and-above {\n    display: none !important; } }\n\n@media screen and (max-width: 768px) {\n  .about--desktop,\n  .desktop-only {\n    display: none !important; } }\n\n.container-fluid {\n  font-size: 1rem;\n  padding-top: 1.14285714em;\n  padding-bottom: 1.14285714em;\n  max-width: 107.14285714em; }\n\n.container-fluid:focus {\n    outline: 0; }\n\n@media screen and (min-width: 544px) {\n    .container-fluid {\n      padding-top: 2.14285714em; } }\n\n@media screen and (min-width: 768px) {\n    .container-fluid {\n      padding-left: 2.14285714em;\n      padding-right: 2.14285714em;\n      padding-bottom: 2.14285714em; } }\n\nvideo {\n  max-width: 500px;\n  margin: 0 auto; }\n\nvg-player {\n  height: auto; }\n\n.vg-controls {\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  background-color: #cccccc;\n  height: 2.14285714em; }\n\n.vg-controls__inner-wrapper {\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-flex: 2;\n      -ms-flex: 2;\n          flex: 2;\n  margin: 0 auto;\n  max-width: 35.71428571em; }\n\n@media screen and (-ms-high-contrast: active), (-ms-high-contrast: none) {\n    .vg-controls__inner-wrapper {\n      max-width: 100%; } }\n\n.vg-play-pause {\n  width: 2.14285714em; }\n\n.vg-scrub-bar-current-time {\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  background-color: #232323;\n  height: 0.14285714em;\n  position: relative;\n  top: initial; }\n\n.vg-scrub-bar-current-time .background {\n    border: 1px solid #2E2B71; }\n\n.vg-scrub-bar-current-time .slider {\n    background-color: #2E2B71;\n    -webkit-box-shadow: none;\n            box-shadow: none;\n    height: 0.85714286em;\n    margin-top: 0;\n    width: 0.85714286em; }\n\n.vg-play-pause,\n.vg-time-display,\n.vg-scrub-bar,\n.vg-volume {\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  color: #232323;\n  height: 2.14285714em; }\n\n.vg-time-display {\n  -webkit-box-flex: 0;\n      -ms-flex: 0;\n          flex: 0;\n  margin: 0 0.35714286em; }\n\n@media screen and (-ms-high-contrast: active), (-ms-high-contrast: none) {\n    .vg-time-display {\n      -webkit-box-flex: 0;\n          -ms-flex: 0 1 auto;\n              flex: 0 1 auto;\n      width: auto; } }\n\n.vg-time-display:not(:root:root) {\n    -webkit-box-flex: 0;\n        -ms-flex: 0 1 auto;\n            flex: 0 1 auto;\n    width: auto; }\n\n.vg-scrub-bar {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  width: 25.2777777777778%; }\n\n@media screen and (-ms-high-contrast: active), (-ms-high-contrast: none) {\n    .vg-scrub-bar {\n      height: auto; } }\n\n.vg-volume {\n  margin: 0 0.71428571em;\n  width: 11.1111111111111%; }\n\n.vg-volume .volumeBackground {\n  background-color: #232323;\n  height: 0.14285714em; }\n\n.vg-volume .volumeValue {\n  background-color: #2E2B71;\n  height: 0.14285714em; }\n\n.vg-volume .volumeKnob {\n  background-color: #2E2B71;\n  height: 0.85714286em;\n  width: 0.85714286em; }\n\n.vg-full-width {\n  margin: 0 0.71428571em; }\n\n@media screen and (max-width: 768px) {\n  .vg-volume-speaker,\n  .vg-volume,\n  .vg-full-width {\n    display: none; } }\n\n*::-webkit-media-controls-panel {\n  display: none !important;\n  -webkit-appearance: none; }\n\n*::-webkit-media-controls-start-playback-button {\n  display: none !important;\n  -webkit-appearance: none; }\n\n*::\\--webkit-media-controls-play-button {\n  display: none !important;\n  -webkit-appearance: none; }\n\n@media screen and (width: 768px) {\n  .col-sm-5,\n  .col-sm-7 {\n    width: 100%; } }\n\n@media screen and (max-width: 768px) {\n  .full-width-mobile {\n    margin-top: -2.85714286em;\n    padding: 0; } }\n\n.selected {\n  background-color: rgba(45, 133, 211, 0.3);\n  color: black; }\n\n.row--top {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  margin-bottom: 30px; }\n\n.row--top .col-left {\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-orient: vertical;\n    -webkit-box-direction: normal;\n        -ms-flex-direction: column;\n            flex-direction: column; }\n\n.row--top .page-title {\n    -webkit-box-flex: 2;\n        -ms-flex: 2;\n            flex: 2; }\n\n.row--top .button-bar {\n    margin: 0; }\n\n.search__links-container {\n  margin-bottom: 0; }\n\n.search__routerLink {\n  margin-bottom: 0; }\n\n.search--desktop {\n  margin-bottom: 0; }\n\n.button-bar {\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  margin-top: 1.14285714em;\n  margin-bottom: 0.5em; }\n\n.video-header {\n  background-color: #232323;\n  color: #fff;\n  font-size: 1.28571429rem;\n  letter-spacing: -.5px;\n  line-height: 1.22222222em;\n  margin-bottom: 0;\n  padding: .5rem 1rem;\n  text-transform: uppercase; }\n\n.video-header__category {\n  text-transform: capitalize; }\n\n.video-title {\n  display: inline-block; }\n\n.video-container {\n  margin: 0 auto 1.875rem;\n  max-width: 90rem; }\n\n.videoBlock {\n  display: block;\n  margin: 0 auto;\n  max-width: 320px;\n  /* TODO: decide if we want greater than 1x display width, or stay at max 1x display width which is 320 pixels */\n  min-height: 180px;\n  height: auto;\n  -o-object-fit: fill;\n     object-fit: fill; }\n\n.no-padding {\n  padding: 0; }\n\n.no-left-padding {\n  padding-left: 0; }\n\n.no-right-padding {\n  padding-right: 0; }\n\n.about {\n  /* TODO: Later, dress up with gradient backgrounds, e.g.,\n    background-color: transparent;\n    background-image: linear-gradient(to bottom, rgba(30, 87, 153, 0.2) 0%, rgba(125, 185, 232, 0) 100%);\n    background-repeat: repeat;\n    */\n  padding: 2.64285714em 0;\n  margin-bottom: 0.5em; }\n\n.about--mobile {\n    display: none;\n    padding: 1em 0; }\n\n@media screen and (max-width: 769px) {\n    .about--mobile-active {\n      display: inherit; } }\n\n.about p:last-of-type {\n    margin-bottom: 0; }\n\n.about__section {\n  border-bottom: 1px solid #cccccc;\n  margin-bottom: 0.71428571em;\n  padding-bottom: 0.85714286em; }\n\n@media screen and (min-width: 768px) {\n    .about__section {\n      margin-bottom: 1.14285714em;\n      padding-bottom: 1.14285714em; } }\n\n.about__section:first-of-type {\n    margin-top: 1.57142857em; }\n\n@media screen and (min-width: 768px) {\n      .about__section:first-of-type {\n        margin-top: 0; } }\n\n.about__section:last-of-type {\n    border-bottom: 0; }\n\n.about__heading {\n  color: #232323;\n  font-size: 1.14285714em;\n  letter-spacing: -.4px;\n  line-height: 1.25em;\n  text-transform: uppercase; }\n\n.about__copy--favorites {\n  margin: 0; }\n\n.about__link,\n.about__link:visited {\n  color: #2E2B71; }\n\n.transcriptTextArea {\n  display: inline; }\n\n.shadowview {\n  width: 50%;\n  -webkit-box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.75);\n          box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.75);\n  margin-top: 2px;\n  margin-bottom: 6px; }\n\n.storyduration {\n  text-align: center;\n  color: #1E1810;\n  font-size: 0.9em;\n  line-height: 0.95em;\n  margin-top: 0.4em; }\n\n.bumpUp {\n  margin-top: 0.0em;\n  margin-bottom: 0.3em;\n  margin-right: 0em;\n  margin-left: 0em; }\n\ninput {\n  color: #1E1810;\n  font-family: 'Roboto', sans-serif;\n  font-weight: 300;\n  font-size: 1em; }\n\n.adjust-height {\n  overflow-x: hidden;\n  overflow-y: auto; }\n\n.next-vid__row {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex; }\n\n.next-vid__row:hover {\n    cursor: pointer; }\n\n.video__title,\n.next-vid__title {\n  color: #941A1D;\n  font-weight: 700; }\n\n.video__title {\n  font-size: 1.28571429rem; }\n\n.next-vid__preview:hover {\n  cursor: pointer; }\n\n.next-vid__thumb {\n  font-size: 1rem;\n  max-width: 100%; }\n\n.next-vid__da-button {\n  background-color: #682052;\n  border: 1px solid transparent;\n  color: #fff;\n  display: block;\n  font-size: 1.78571429rem;\n  font-weight: 400;\n  line-height: 1.2;\n  padding: 0.6em;\n  margin-top: 0.4em;\n  -webkit-transition: all .2s ease-in-out;\n  transition: all .2s ease-in-out; }\n\n.next-vid__da-button:hover {\n    background-color: #fff;\n    border: 1px solid #682052;\n    color: #682052;\n    text-decoration: none; }\n\n.overlay-play-container::before {\n  background: #fff;\n  border-radius: 100%;\n  color: #941A1D; }\n\n.hero-vid__right-col {\n  background-color: #fff;\n  padding: 1.875rem 4.375rem 3.75rem 1.875rem; }\n\n.hero-vid__title {\n  font-size: 2rem; }\n\n.hero-vid__body {\n  font-size: 1.5rem;\n  line-height: 120%; }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/app.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var AppComponent = /** @class */ (function () {
    function AppComponent(elementRef) {
        this.elementRef = elementRef;
        this.title = this.elementRef.nativeElement.getAttribute('title');
        this.body = this.elementRef.nativeElement.getAttribute('body');
        this.videoUrl = this.elementRef.nativeElement.getAttribute('videoUrl');
    }
    AppComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-root',
            template: __webpack_require__("../../../../../src/app/app.component.html"),
            styles: [__webpack_require__("../../../../../src/app/app.component.scss")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"]])
    ], AppComponent);
    return AppComponent;
}());



/***/ }),

/***/ "../../../../../src/app/app.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__("../../../platform-browser/esm5/platform-browser.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_videogular2_core__ = __webpack_require__("../../../../videogular2/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_videogular2_core___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_videogular2_core__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_videogular2_controls__ = __webpack_require__("../../../../videogular2/controls.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_videogular2_controls___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_videogular2_controls__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_videogular2_overlay_play__ = __webpack_require__("../../../../videogular2/overlay-play.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_videogular2_overlay_play___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_videogular2_overlay_play__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_videogular2_buffering__ = __webpack_require__("../../../../videogular2/buffering.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_videogular2_buffering___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_videogular2_buffering__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__app_component__ = __webpack_require__("../../../../../src/app/app.component.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};







var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_6__app_component__["a" /* AppComponent */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_2_videogular2_core__["VgCoreModule"],
                __WEBPACK_IMPORTED_MODULE_3_videogular2_controls__["VgControlsModule"],
                __WEBPACK_IMPORTED_MODULE_4_videogular2_overlay_play__["VgOverlayPlayModule"],
                __WEBPACK_IMPORTED_MODULE_5_videogular2_buffering__["VgBufferingModule"],
            ],
            providers: [],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_6__app_component__["a" /* AppComponent */]]
        })
    ], AppModule);
    return AppModule;
}());



/***/ }),

/***/ "../../../../../src/environments/environment.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return environment; });
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
var environment = {
    production: false
};


/***/ }),

/***/ "../../../../../src/main.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__ = __webpack_require__("../../../platform-browser-dynamic/esm5/platform-browser-dynamic.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_app_module__ = __webpack_require__("../../../../../src/app/app.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__environments_environment__ = __webpack_require__("../../../../../src/environments/environment.ts");




if (__WEBPACK_IMPORTED_MODULE_3__environments_environment__["a" /* environment */].production) {
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["enableProdMode"])();
}
Object(__WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_2__app_app_module__["a" /* AppModule */])
    .catch(function (err) { return console.log(err); });


/***/ }),

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("../../../../../src/main.ts");


/***/ })

},[0]);
//# sourceMappingURL=main.bundle.js.map