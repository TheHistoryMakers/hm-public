webpackJsonp([2,4],{

/***/ 100:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__ = __webpack_require__(107);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_app_module__ = __webpack_require__(109);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__environments_environment__ = __webpack_require__(111);




if (__WEBPACK_IMPORTED_MODULE_3__environments_environment__["a" /* environment */].production) {
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["enableProdMode"])();
}
var INTERPOLATION_REGEXP = /\{\{([\s\S]*?)\}\}/g; // default
__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_2__app_app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 108:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var AppComponent = (function () {
    function AppComponent(elementRef) {
        this.elementRef = elementRef;
        this.mobileDetails = false;
        this.transcriptAreaHeight = 100;
        this.myMatchContext = [];
        this.wideScreen = false;
        this.storyHasMatches = true;
        this.videoPositionInSeconds = 0;
        this.transcriptHeightInitialized = false;
        this.currentIndex = 0;
        this.source = this.elementRef.nativeElement.getAttribute('source');
        this.source2 = this.elementRef.nativeElement.getAttribute('source2');
        this.title = this.elementRef.nativeElement.getAttribute('title');
        this.title2 = this.elementRef.nativeElement.getAttribute('title2');
        this.thumb = this.source.replace('video', 'image');
        this.thumb2 = this.source2.replace('video', 'image');
        this.timingPairs = this.elementRef.nativeElement.getAttribute('timingPairs');
        this.transcriptText = this.elementRef.nativeElement.getAttribute('transcriptText');
        this.transcriptText = this.transcriptText.replace(/(\$)\1+/gi, "\n\n").replace(/[\\]/, '');
        ;
        this.transcriptText1 = this.transcriptText.split(/[\$]/)[0];
        this.transcriptText2 = this.transcriptText.split(/[\$]/)[1];
        var index = this.timingPairs.indexOf("$");
        this.timingPairsVideo1 = this.timingPairsToJSON(this.timingPairs.substr(0, index));
        this.timingPairsVideo2 = this.timingPairsToJSON(this.timingPairs.substr(index + 1) + "}");
        this.playlist = [
            {
                title: this.title,
                src: this.source,
                type: 'video/mp4',
                thumb: this.thumb
            },
            {
                title: this.title2,
                src: this.source2,
                type: 'video/mp4',
                thumb: this.thumb2
            }
        ];
        this.currentItem = this.playlist[this.currentIndex];
        this.previousItem = this.playlist[this.currentIndex + 1];
    }
    AppComponent.prototype.timingPairsToJSON = function (timingPairs) {
        var currentNum = "";
        var newTimingPairs = [];
        var newTimingPair = { offset: 0, time: 0 };
        for (var _i = 0, timingPairs_1 = timingPairs; _i < timingPairs_1.length; _i++) {
            var ch = timingPairs_1[_i];
            if (ch === ',') {
                newTimingPair.time = Number(currentNum);
                currentNum = "";
            }
            else if (ch === ':') {
                newTimingPair.offset = Number(currentNum);
                newTimingPairs.push(newTimingPair);
                currentNum = "";
                newTimingPair = { offset: 0, time: 0 };
            }
            else {
                currentNum = currentNum + ch;
            }
        }
        return newTimingPairs;
    };
    AppComponent.prototype.ngOnInit = function () {
        this.myStory = {
            transcript: this.transcriptText1,
            timingPairs: this.timingPairsVideo1
        };
        this.transcriptPieces = [];
        this.transcriptPieces.push("");
        this.currentActiveTranscriptPiece = -1;
        this.ComputeTimesForOffsets();
        this.ComputeTimedTranscriptWithMatches();
    };
    // Helper function to bold match text in the transcript, and break transcript up into pieces to
    // highlight a piece based on video transcript timing.  If there are no matches, then no text will get bolded.
    AppComponent.prototype.ComputeTimedTranscriptWithMatches = function () {
        var matchOffset;
        var matchEndOffset;
        var textWithBoldedMatches;
        var outOfBoundsOffset;
        var timingIndexToCheckFirst;
        if (this.myStory.transcript == null || this.myStory.transcript.length == 0) {
            this.transcriptPieces = [];
            this.transcriptPieces.push("");
            return; // give up if there is no transcript
        }
        // NOTE: assumes this.myStory.timing.length >= 1
        // Pass 1: for every match BLAH, add in <b> and </b> markers around BLAH in transcript text.
        // As such inserts are done, update the offset numbers in this.myStory.timingPairs.  The plain transcript
        // will transform into textWithBoldedMatches.
        // Pass 2: use this.myStory.timing to break textWithBoldedMatches (i.e., the transcript with matches)
        // into this.transcriptPieces.
        // Pass 1: walk the matches from last one (greatest offset into transcript) to first...
        // Once a match is processed, never consider those characters again, i.e., even if match offsets
        // and scoring words somehow overlap/intermingle, the logic here will never allow for a case like
        // <b>ok here <b>bad, bold in bold</b></b> because the ending </b> of match N will never be placed
        // after the start <b> of match N+1.
        outOfBoundsOffset = this.myStory.transcript.length; // index transcriptText.length out of bounds (index transcriptText.length-1 still valid for length >= 1)
        textWithBoldedMatches = "";
        timingIndexToCheckFirst = this.myStory.timingPairs.length - 1; // working from end of transcript back to front, so start with last timing entry
        for (var iMatch = this.myMatchContext.length - 1; iMatch >= 0; iMatch--) {
            matchOffset = this.myMatchContext[iMatch].startOffset;
            matchEndOffset = this.myMatchContext[iMatch].endOffset;
            if (matchOffset < outOfBoundsOffset) {
                // NOTE: matchEndOffset might be one past the end of transcriptText, which is
                // ok for using it with transcriptText.substring(matchOffset, endingOffset):
                // TODO: The following sort of string appending construction may be time-consuming - re-implement later once the means
                // of transcript contruction with timing has been formalized (e.g., it may be replaced or augmented with closed-captioning).
                // We now have processed transcript from original offset matchOffset to its end.
                // We insert 3 characters at matchOffset and 4 more at matchEndOffset.
                if (matchEndOffset < outOfBoundsOffset) {
                    textWithBoldedMatches = "<b>" +
                        this.myStory.transcript.substring(matchOffset, matchEndOffset) + "</b>" +
                        this.myStory.transcript.substring(matchEndOffset, outOfBoundsOffset) + textWithBoldedMatches;
                }
                else {
                    textWithBoldedMatches = "<b>" +
                        this.myStory.transcript.substring(matchOffset, matchEndOffset) + "</b>" + textWithBoldedMatches;
                }
                outOfBoundsOffset = matchOffset; // from match forward, no longer process (to avoid any overlapping issues)
                while (this.myStory.timingPairs[timingIndexToCheckFirst].offset >= matchOffset && timingIndexToCheckFirst > 0) {
                    timingIndexToCheckFirst--; // determine max number of timing entries to be checked for update based on <b>,</b> inserts
                }
                for (var iTiming = timingIndexToCheckFirst; iTiming < this.myStory.timingPairs.length; iTiming++) {
                    if (this.myStory.timingPairs[iTiming].offset > matchOffset) {
                        // Grow offset by 3 for <b> and perhaps an additional 4 for </b>
                        if (this.myStory.timingPairs[iTiming].offset >= matchEndOffset)
                            this.myStory.timingPairs[iTiming].offset += 7;
                        else
                            this.myStory.timingPairs[iTiming].offset += 3;
                    }
                    // else no offset adjustment needed for time entries at or before the matchOffset insert; e.g.,
                    // if match at "snow" and now we have <b>snow</b> keep timing offset pointed to start of <b>
                }
            }
        }
        if (this.myMatchContext.length > 0) {
            // Transcript from outOfBoundsOffset to end already processed.  Tack on any text
            // that precedes the first match.
            if (outOfBoundsOffset > 0)
                textWithBoldedMatches = this.myStory.transcript.substring(0, outOfBoundsOffset) + textWithBoldedMatches;
        }
        else {
            // With no matches, this.myStory.timingPairs[] is unchanged and textWithBoldedMatches == transcriptText
            textWithBoldedMatches = this.myStory.transcript;
        }
        // NOTE: at this point there has been no replacement of <br> for \n in textWithBoldedMatches, to simplify all the offset adjustments.
        // Do the replacement as chunks of transcript are moved intothis.transcriptPieces.
        this.transcriptPieces = [];
        var transcriptPiece;
        var re = /\n/g;
        // Pass 2: use the adjusted this.myStory.timingPairs (to account for <b></b> inserts) to break
        // textWithBoldedMatches(i.e., the transcript with matches) into this.transcriptPieces.
        if (this.myStory.timingPairs.length > 1) {
            // Fill transcript by breaking it into N pieces, corresponding to the N timing pieces.
            for (var i = 0; i < this.myStory.timingPairs.length - 1; i++) {
                if (this.myStory.timingPairs[i + 1].offset > this.myStory.timingPairs[i].offset) {
                    // Something worthwhile for this piece.
                    transcriptPiece = textWithBoldedMatches.substring(this.myStory.timingPairs[i].offset, this.myStory.timingPairs[i + 1].offset);
                    transcriptPiece = transcriptPiece.replace(re, '<br>');
                    this.transcriptPieces.push(transcriptPiece);
                }
                else
                    // Empty string for this timing entry (ideally bogus timing entry would not even be there ever)
                    this.transcriptPieces.push("");
            }
        }
        else {
            // No timing (or just one entry), so have all of transcript text be in one piece,
            // and do not make it active (keep active indicator == -1).
            transcriptPiece = textWithBoldedMatches.replace(re, '<br>');
            this.transcriptPieces.push(transcriptPiece);
        }
    };
    // Something off about the offset. Will look into when I return
    AppComponent.prototype.advanceTranscript = function (offset) {
        if (offset > 18)
            this.transcript.nativeElement.scrollTop = offset - 22;
    };
    AppComponent.prototype.isTranscriptPieceActive = function (whichPiece) { return (whichPiece == this.currentActiveTranscriptPiece); };
    AppComponent.prototype.onPlayerReady = function (api) {
        this.api = api;
        this.api.getDefaultMedia().subscriptions.ended.subscribe(this.nextVideo.bind(this));
    };
    AppComponent.prototype.nextVideo = function () {
        this.previousItem = this.currentItem;
        this.currentIndex++;
        if (this.currentIndex === this.playlist.length) {
            this.currentIndex = 0;
            this.myStory = {
                transcript: this.transcriptText1,
                timingPairs: this.timingPairsVideo1
            };
            this.transcriptPieces = [];
            this.transcriptPieces.push("");
            this.currentActiveTranscriptPiece = -1;
            this.ComputeTimesForOffsets();
            this.ComputeTimedTranscriptWithMatches();
        }
        else {
            this.myStory = {
                transcript: this.transcriptText2,
                timingPairs: this.timingPairsVideo2
            };
            this.transcriptPieces = [];
            this.transcriptPieces.push("");
            this.currentActiveTranscriptPiece = -1;
            this.ComputeTimesForOffsets();
            this.ComputeTimedTranscriptWithMatches();
        }
        this.currentItem = this.playlist[this.currentIndex];
    };
    AppComponent.prototype.onClickPlaylistItem = function (item, index) {
        this.currentIndex = index;
        this.currentItem = item;
    };
    AppComponent.prototype.isLoaded = function () {
        this.initTranscriptHeight();
    };
    AppComponent.prototype.initTranscriptHeight = function () {
        this.computeTranscriptAreaHeight(window.innerWidth, window.innerHeight);
    };
    AppComponent.prototype.computeTranscriptAreaHeight = function (fullWindowWidth, fullWindowHeight) {
        // Block out height for other elements aside from transcript area.
        // If those heights not computable yet, use a default.
        // This work influenced by: http://stackoverflow.com/questions/35527559/angular2-get-window-width-onresize
        // !!!TBD!!! TODO: Remove numeric constants here that assume certain positioning and sizing and styling.
        // !!!TBD!!! TODO: Remove the need to bring in ElementRef just so that I could get height of videoPlayerAndControlsAreaRef
        // This is frowned upon but I wanted to get a release out "quickly" for beta testing.
        var blockOutHeight = 344;
        var extrasHeight = 54; // !!!TBD!!! very ugly dependency here, of "knowing" that navbar needs at least 54 pixels, but it gets worse...
        // Also, account for increasing font sizes at larger widths for the navbar, plus we are adding in a header image with height 108 when content width >= 768px
        if (fullWindowWidth >= 600) {
            if (fullWindowWidth >= 960) {
                extrasHeight += 120; // !!!TBD!!! more ugliness, knowing that styles.css saves 174px (120+54) for widths >= 960
                blockOutHeight += 20;
            }
            else if (fullWindowWidth >= 768) {
                extrasHeight += 116; // !!!TBD!!! more ugliness, knowing that styles.css saves 170px (116+54) for widths >= 768 but < 960
                blockOutHeight += 20;
            }
            else {
                extrasHeight += 4; // !!!TBD!!! more ugliness, knowing that styles.css saves 58px (4+54) for widths >= 600 but < 768
                blockOutHeight += 20;
            }
        }
        if (this.videoPlayerAndControlsAreaRef) {
            blockOutHeight = this.videoPlayerAndControlsAreaRef.nativeElement.offsetHeight + 10; // TODO: update when possible to remove need to access nativeElement
        }
        var newTranscriptHeight = fullWindowHeight - blockOutHeight - extrasHeight;
        if (newTranscriptHeight < 100)
            newTranscriptHeight = 100;
        if (this.videoPlayerRef) {
            var aspectRatio = this.videoPlayerRef.api.videogularElement.offsetWidth / this.videoPlayerRef.api.videogularElement.offsetHeight;
            if (fullWindowWidth >= 550 && this.wideScreen === false) {
                this.transcriptAreaHeight = 220;
            }
            else {
                if (this.storyHasMatches === true)
                    this.transcriptAreaHeight = fullWindowHeight - (this.videoPlayerRef.api.videogularElement.offsetHeight + 250);
                else
                    this.transcriptAreaHeight = fullWindowHeight - (this.videoPlayerRef.api.videogularElement.offsetHeight + 215);
            }
        }
    };
    AppComponent.prototype.onResize = function (event) {
        this.computeTranscriptAreaHeight(window.innerWidth, window.innerHeight);
    };
    AppComponent.prototype.adjustVideoCurrentTime = function () {
        var movieTimeInSecs;
        movieTimeInSecs = this.api.getDefaultMedia().currentTime;
        // One-time setup of video transcript height based on video player (and player controls) height:
        if (!this.transcriptHeightInitialized) {
            this.computeTranscriptAreaHeight(window.innerWidth, window.innerHeight);
            this.transcriptHeightInitialized = true;
        }
        this.videoPositionInSeconds = movieTimeInSecs;
        // Possibly adjust which transcript piece is highlighted as well.
        var maxTimingEntries = 0;
        if (this.myStory && this.myStory.timingPairs)
            maxTimingEntries = this.myStory.timingPairs.length;
        if (maxTimingEntries > 1) {
            // Only bother with selecting a piece of the transcript if there are 2+ pieces.
            // The means of activating a piece is via this.currentActiveTranscriptPiece.
            // NOTE: max value for this.currentActiveTranscriptPiece == maxTimingEntries - 2 under assumption
            // that final timing entry in this.myStory.timingPairs equals transcript length as offset, video duration as timing, i.e.,
            // that last entry does not help set an active region by itself but sets maximums on offset and video timing.
            // This assumption allows us to safely make use of this.currentActiveTranscriptPiece + 1 as an index into this.myStory.timingPairs.
            var movieTimeInMSecs = movieTimeInSecs * 1000;
            if (this.currentActiveTranscriptPiece < 0 ||
                movieTimeInMSecs < this.myStory.timingPairs[this.currentActiveTranscriptPiece].time ||
                movieTimeInMSecs > this.myStory.timingPairs[this.currentActiveTranscriptPiece + 1].time) {
                // There will be a change to this.currentActiveTranscriptPiece based on movieTimeInMSecs
                if (movieTimeInMSecs < this.myStory.timingPairs[1].time)
                    this.currentActiveTranscriptPiece = 0;
                else if (movieTimeInMSecs >= this.myStory.timingPairs[maxTimingEntries - 2].time)
                    this.currentActiveTranscriptPiece = maxTimingEntries - 2;
                else {
                    for (var i = 1; i < maxTimingEntries - 1; i++)
                        if (movieTimeInMSecs < this.myStory.timingPairs[i + 1].time) {
                            this.currentActiveTranscriptPiece = i;
                            break;
                        }
                }
            }
        }
    };
    AppComponent.prototype.ComputeTimesForOffsets = function () {
        // Use this.myStory.timingPairs and this.myStory.matchTerms to compute this.myMatchContext for each match in matchTerms
        var i = 0;
        var matchIndex = 0;
        var maxTimingPairIndex;
        var givenMatchesCount;
        var newEntry;
        if (this.myStory.timingPairs == null)
            maxTimingPairIndex = -1;
        else
            maxTimingPairIndex = this.myStory.timingPairs.length - 1;
        if (givenMatchesCount == 0 || maxTimingPairIndex <= 0) {
            this.storyHasMatches = false;
            this.myMatchContext = [];
            return;
        }
        this.storyHasMatches = true;
        // As we move through this.myStory.timingPairs in ascending offset order, we don't go back,
        // i.e., i starts at 0 but moves forward within this outer while loop rather than being
        // reset to 0 each time:
        while (matchIndex < givenMatchesCount) {
            if (i == 0)
                newEntry.time = this.myStory.timingPairs[0].time;
            else
                newEntry.time = this.myStory.timingPairs[i - 1].time;
            this.myMatchContext.push(newEntry);
            matchIndex++; // Note: service puts matches in order, so this.myStory.timingPairs[N+1].startOffset >= this.myStory.timingPairs[N].startOffset
        }
    };
    return AppComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('myVideoArea'),
    __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"]) === "function" && _a || Object)
], AppComponent.prototype, "videoPlayerAndControlsAreaRef", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('myVideoPlayer'),
    __metadata("design:type", Object)
], AppComponent.prototype, "videoPlayerRef", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('transcript'),
    __metadata("design:type", Object)
], AppComponent.prototype, "transcript", void 0);
AppComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-root',
        template: __webpack_require__(168),
        styles: [__webpack_require__(166)]
    }),
    __metadata("design:paramtypes", [typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"]) === "function" && _b || Object])
], AppComponent);

var _a, _b;
//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 109:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(105);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_http__ = __webpack_require__(106);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_videogular2_core__ = __webpack_require__(200);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_videogular2_core___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_videogular2_core__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_videogular2_controls__ = __webpack_require__(199);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_videogular2_controls___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_videogular2_controls__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_videogular2_overlay_play__ = __webpack_require__(225);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_videogular2_overlay_play___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_videogular2_overlay_play__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_videogular2_buffering__ = __webpack_require__(198);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_videogular2_buffering___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_videogular2_buffering__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__scroll_transcript_directive__ = __webpack_require__(110);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__app_component__ = __webpack_require__(108);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};










var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["NgModule"])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_9__app_component__["a" /* AppComponent */],
            __WEBPACK_IMPORTED_MODULE_8__scroll_transcript_directive__["a" /* ScrollTranscript */],
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
            __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormsModule */],
            __WEBPACK_IMPORTED_MODULE_3__angular_http__["a" /* HttpModule */],
            __WEBPACK_IMPORTED_MODULE_4_videogular2_core__["VgCoreModule"],
            __WEBPACK_IMPORTED_MODULE_5_videogular2_controls__["VgControlsModule"],
            __WEBPACK_IMPORTED_MODULE_6_videogular2_overlay_play__["VgOverlayPlayModule"],
            __WEBPACK_IMPORTED_MODULE_7_videogular2_buffering__["VgBufferingModule"]
        ],
        providers: [],
        bootstrap: [__WEBPACK_IMPORTED_MODULE_9__app_component__["a" /* AppComponent */]]
    })
], AppModule);

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 110:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ScrollTranscript; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

// NOTE: this directive used to use scrollIntoView with window scrolling removed via CSS. However, it has been updated to pass
// the top offset value of the element to the parent component. From there, the parent uses scrollTop with that value
// on the transcript container. This way, we can scroll the element with overflow rather than the entire window, which is
// better for responsive heights and layouts. We may want to discuss the value of keeping this functionality as a directive vs.
// creating a transcript component. Right now, we still have to do the actual scrolling inside a function in the parent component.
var ScrollTranscript = (function () {
    function ScrollTranscript(_renderer, el) {
        this._renderer = _renderer;
        this.topPosition = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this.el = el.nativeElement;
    }
    Object.defineProperty(ScrollTranscript.prototype, "thdaScrollTranscript", {
        set: function (condition) {
            if (condition) {
                var topPos = this.el.offsetTop;
                this.updatePos(topPos);
            }
        },
        enumerable: true,
        configurable: true
    });
    ScrollTranscript.prototype.updatePos = function (topPos) {
        this.topPosition.emit(topPos);
    };
    return ScrollTranscript;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Boolean),
    __metadata("design:paramtypes", [Boolean])
], ScrollTranscript.prototype, "thdaScrollTranscript", null);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
    __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]) === "function" && _a || Object)
], ScrollTranscript.prototype, "topPosition", void 0);
ScrollTranscript = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Directive"])({ selector: '[thdaScrollTranscript]' }),
    __metadata("design:paramtypes", [typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["Renderer"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["Renderer"]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"]) === "function" && _c || Object])
], ScrollTranscript);

var _a, _b, _c;
//# sourceMappingURL=scroll-transcript.directive.js.map

/***/ }),

/***/ 111:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return environment; });
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
// The file contents for the current environment will overwrite these during build.
var environment = {
    production: false
};
//# sourceMappingURL=environment.js.map

/***/ }),

/***/ 166:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(38)(false);
// imports


// module
exports.push([module.i, ".match__prev-button,\n.match__next-button, .story-nav__prev-button,\n.story-nav__next-button {\n  font-family: 'Source Sans Pro', sans-serif; }\n\n.about__link,\n.about__link:visited, .playlist-button {\n  font-family: 'Source Sans Pro', sans-serif;\n  font-weight: 600; }\n\n.playlist__total {\n  font-family: 'Source Sans Pro', sans-serif;\n  font-style: italic;\n  font-weight: 600; }\n\n.tabs__tab {\n  font-family: 'Source Sans Pro', sans-serif;\n  font-weight: 700; }\n\n.header-1, .header-2, .header-3, .header-4, .video-header, .about__heading, .page-title, .back-button, .playlist__title, .next-vid__da-button {\n  font-family: 'Oswald', sans-serif;\n  font-weight: 500; }\n\n.header-1 {\n  color: #232323;\n  font-size: 1.85714rem;\n  line-height: 1.22222em;\n  margin: 0 0 2.23077em;\n  text-transform: uppercase; }\n\n.header-2 {\n  color: #232323;\n  font-size: 1.57143em;\n  line-height: 26px;\n  margin: 0 0 0.71429em;\n  padding: 0; }\n\n.header-3 {\n  color: #232323;\n  font-size: 1.57142857em;\n  margin-bottom: 0;\n  margin-top: 0;\n  padding-bottom: 1.11111em;\n  padding-top: 0; }\n\n.header-4 {\n  color: #232323;\n  font-size: 1.57142857em;\n  margin: 0 0 0.3em;\n  padding: 0; }\n\n.bold {\n  font-weight: 700; }\n\n.italic {\n  font-style: italic; }\n\n\n.list-without-styles {\n  list-style-type: none;\n  padding: 0; }\n\n@media screen and (min-width: 769px) {\n  .video-header, .about--mobile, .back-button--mobile, .playlist-button--mobile, .tabs,\n  .mobile-only {\n    display: none !important; } }\n\n@media screen and (max-width: 544px) {\n  \n  .tablet-and-above {\n    display: none !important; } }\n\n@media screen and (max-width: 768px) {\n  .about--desktop, .page-title, .back-button--desktop, .playlist-button, .playlist-button--desktop, .playlist,\n  .desktop-only {\n    display: none !important; } }\n\n.container-fluid {\n  font-size: 1rem;\n  padding-top: 1.14285714em;\n  padding-bottom: 1.14285714em;\n  max-width: 107.14285714em; }\n  .container-fluid:focus {\n    outline: 0; }\n  @media screen and (min-width: 544px) {\n    .container-fluid {\n      padding-top: 2.14285714em; } }\n  @media screen and (min-width: 768px) {\n    .container-fluid {\n      padding-left: 2.14285714em;\n      padding-right: 2.14285714em;\n      padding-bottom: 2.14285714em; } }\n\nvideo {\n  max-width: 500px;\n  margin: 0 auto; }\n\nvg-player {\n  height: auto; }\n\n.vg-controls {\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  background-color: #cccccc;\n  height: 2.14285714em; }\n\n.vg-controls__inner-wrapper {\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-flex: 2;\n      -ms-flex: 2;\n          flex: 2;\n  margin: 0 auto;\n  max-width: 35.71428571em; }\n  @media screen and (-ms-high-contrast: active), (-ms-high-contrast: none) {\n    .vg-controls__inner-wrapper {\n      max-width: 100%; } }\n\n.vg-play-pause {\n  width: 2.14285714em; }\n\n.vg-scrub-bar-current-time {\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  background-color: #232323;\n  height: 0.14285714em;\n  position: relative;\n  top: initial; }\n  .vg-scrub-bar-current-time .background {\n    border: 1px solid #2E2B71; }\n  .vg-scrub-bar-current-time .slider {\n    background-color: #2E2B71;\n    box-shadow: none;\n    height: 0.85714286em;\n    margin-top: 0;\n    width: 0.85714286em; }\n\n.vg-play-pause,\n.vg-time-display,\n.vg-scrub-bar,\n.vg-volume {\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  color: #232323;\n  height: 2.14285714em; }\n\n.vg-time-display {\n  -webkit-box-flex: 0;\n      -ms-flex: 0;\n          flex: 0;\n  margin: 0 0.35714286em; }\n  @media screen and (-ms-high-contrast: active), (-ms-high-contrast: none) {\n    .vg-time-display {\n      -webkit-box-flex: 0;\n          -ms-flex: 0 1 auto;\n              flex: 0 1 auto;\n      width: auto; } }\n  .vg-time-display:not(:root:root) {\n    -webkit-box-flex: 0;\n        -ms-flex: 0 1 auto;\n            flex: 0 1 auto;\n    width: auto; }\n\n.vg-scrub-bar {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  width: 25.2777777777778%; }\n  @media screen and (-ms-high-contrast: active), (-ms-high-contrast: none) {\n    .vg-scrub-bar {\n      height: auto; } }\n\n.vg-volume {\n  margin: 0 0.71428571em;\n  width: 11.1111111111111%; }\n\n.vg-volume .volumeBackground {\n  background-color: #232323;\n  height: 0.14285714em; }\n\n.vg-volume .volumeValue {\n  background-color: #2E2B71;\n  height: 0.14285714em; }\n\n.vg-volume .volumeKnob {\n  background-color: #2E2B71;\n  height: 0.85714286em;\n  width: 0.85714286em; }\n\n.vg-full-width {\n  margin: 0 0.71428571em; }\n\n@media screen and (max-width: 768px) {\n  .vg-volume-speaker,\n  .vg-volume,\n  .vg-full-width {\n    display: none; } }\n\n*::-webkit-media-controls-panel {\n  display: none !important;\n  -webkit-appearance: none; }\n\n*::-webkit-media-controls-start-playback-button {\n  display: none !important;\n  -webkit-appearance: none; }\n\n*::\\--webkit-media-controls-play-button {\n  display: none !important;\n  -webkit-appearance: none; }\n\n@media screen and (width: 768px) {\n  .col-sm-5,\n  .col-sm-7 {\n    width: 100%; } }\n\n@media screen and (max-width: 768px) {\n  .full-width-mobile {\n    margin-top: -2.85714286em;\n    padding: 0; } }\n\n.selected {\n  background-color: rgba(45, 133, 211, 0.3);\n  color: black; }\n\n.row--top {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  margin-bottom: 30px; }\n  .row--top .col-left {\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-orient: vertical;\n    -webkit-box-direction: normal;\n        -ms-flex-direction: column;\n            flex-direction: column; }\n  .row--top .page-title {\n    -webkit-box-flex: 2;\n        -ms-flex: 2;\n            flex: 2; }\n  .row--top .button-bar {\n    margin: 0; }\n\n.search__links-container {\n  margin-bottom: 0; }\n\n.search__routerLink {\n  margin-bottom: 0; }\n\n.search--desktop {\n  margin-bottom: 0; }\n\n.button-bar {\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  margin-top: 1.14285714em;\n  margin-bottom: 0.5em; }\n\n.video-header {\n  background-color: #232323;\n  color: #fff;\n  font-size: 1.28571429rem;\n  letter-spacing: -.5px;\n  line-height: 1.22222222em;\n  margin-bottom: 0;\n  padding: .5rem 1rem;\n  text-transform: uppercase; }\n\n.video-header__category {\n  text-transform: capitalize; }\n\n.video-title {\n  display: inline-block; }\n\n.video-container {\n  margin-bottom: 2.14285714rem; }\n\n.videoBlock {\n  display: block;\n  margin: 0 auto;\n  max-width: 320px;\n  /* TODO: decide if we want greater than 1x display width, or stay at max 1x display width which is 320 pixels */\n  min-height: 180px;\n  height: auto;\n  -o-object-fit: fill;\n     object-fit: fill; }\n\n.no-padding {\n  padding: 0; }\n\n.no-left-padding {\n  padding-left: 0; }\n\n.no-right-padding {\n  padding-right: 0; }\n\n.about {\n  /* TODO: Later, dress up with gradient backgrounds, e.g., \n    background-color: transparent;\n    background-image: linear-gradient(to bottom, rgba(30, 87, 153, 0.2) 0%, rgba(125, 185, 232, 0) 100%);\n    background-repeat: repeat;\n    */\n  padding: 2.64285714em 0;\n  margin-bottom: 0.5em; }\n  .about--mobile {\n    display: none;\n    padding: 1em 0; }\n  @media screen and (max-width: 769px) {\n    .about--mobile-active {\n      display: inherit; } }\n  .about p:last-of-type {\n    margin-bottom: 0; }\n\n.about__section {\n  border-bottom: 1px solid #cccccc;\n  margin-bottom: 0.71428571em;\n  padding-bottom: 0.85714286em; }\n  @media screen and (min-width: 768px) {\n    .about__section {\n      margin-bottom: 1.14285714em;\n      padding-bottom: 1.14285714em; } }\n  .about__section:first-of-type {\n    margin-top: 1.57142857em; }\n    @media screen and (min-width: 768px) {\n      .about__section:first-of-type {\n        margin-top: 0; } }\n  .about__section:last-of-type {\n    border-bottom: 0; }\n\n.about__heading {\n  color: #232323;\n  font-size: 1.14285714em;\n  letter-spacing: -.4px;\n  line-height: 1.25em;\n  text-transform: uppercase; }\n\n.about__copy--favorites {\n  margin: 0; }\n\n.about__link,\n.about__link:visited {\n  color: #2E2B71; }\n\n.transcriptTextArea {\n  display: inline; }\n\n.shadowview {\n  width: 50%;\n  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.75);\n  margin-top: 2px;\n  margin-bottom: 6px; }\n\n.storyduration {\n  text-align: center;\n  color: #1E1810;\n  font-size: 0.9em;\n  line-height: 0.95em;\n  margin-top: 0.4em; }\n\n.bumpUp {\n  margin-top: 0.0em;\n  margin-bottom: 0.3em;\n  margin-right: 0em;\n  margin-left: 0em; }\n\ninput {\n  color: #1E1810;\n  font-family: 'Roboto', sans-serif;\n  font-weight: 300;\n  font-size: 1em; }\n\n.page-title {\n  color: #232323;\n  font-size: 1.28571429rem;\n  letter-spacing: -.5px;\n  text-transform: uppercase; }\n  @media screen and (min-width: 768px) {\n    .page-title {\n      font-size: 1.57142857rem;\n      letter-spacing: -.42px; } }\n  @media screen and (min-width: 1200px) {\n    .page-title {\n      font-size: 1.85714286rem;\n      letter-spacing: -.5px; } }\n\n.transcript {\n  display: none;\n  line-height: 1.28571429em;\n  font-size: 0.85714286rem;\n  margin-bottom: 1.42857143em;\n  margin-top: 1.42857143em;\n  position: relative; }\n  @media screen and (min-width: 769px) {\n    .transcript {\n      background-color: #dedede;\n      border: 1px solid #cccccc;\n      display: inherit;\n      line-height: 1.375em;\n      font-size: 1.14285714rem;\n      padding: 1em;\n      margin-bottom: 1.25em;\n      margin-top: 0em; } }\n\n.transcript--mobile-active {\n  display: inherit; }\n\n.back-button {\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  background-color: transparent;\n  color: #2E2B71;\n  display: -webkit-inline-box;\n  display: -ms-inline-flexbox;\n  display: inline-flex;\n  font-size: 1.28571429rem;\n  text-transform: uppercase; }\n  .back-button--mobile {\n    margin-bottom: 0.66666667em; }\n\n.back-button__chevron {\n  margin-right: 0.27777778em; }\n\n.playlist-button {\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  background-color: #941A1D;\n  border-radius: 0;\n  color: #fff;\n  cursor: pointer;\n  display: -webkit-inline-box;\n  display: -ms-inline-flexbox;\n  display: inline-flex;\n  font-size: 1.25em;\n  height: 2.6875em;\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n  letter-spacing: .5px;\n  text-transform: uppercase;\n  transition: box-shadow .15s ease-in-out;\n  width: 100%; }\n  @media screen and (min-width: 544px) {\n    .playlist-button {\n      font-size: 1.14285714em;\n      margin-left: 0.71428571em;\n      width: auto; } }\n  @media screen and (min-width: 1200px) {\n    .playlist-button {\n      -webkit-box-ordinal-group: initial;\n          -ms-flex-order: initial;\n              order: initial; } }\n  .playlist-button:hover {\n    box-shadow: inset 0 0 5px rgba(51, 51, 51, 0.6); }\n  .playlist-button:disabled {\n    cursor: not-allowed;\n    opacity: .4; }\n  .playlist-button--mobile {\n    margin-bottom: 0.66666667em; }\n  .playlist-button svg {\n    margin-left: 0.57142857em;\n    vertical-align: text-top; }\n\n.playlist {\n  background-color: #941A1D;\n  color: #fff;\n  font-size: 1rem;\n  min-height: 10.71428571em;\n  padding: 1.07142857em;\n  width: 100%; }\n\n.playlist__title-row {\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex; }\n\n.playlist__title {\n  font-size: 1.5em;\n  letter-spacing: -.5px;\n  text-transform: uppercase; }\n  @media screen and (min-width: 1200px) {\n    .playlist__title {\n      font-size: 1.57142857em; } }\n\n.playlist__link {\n  cursor: pointer;\n  margin-left: auto; }\n\n.playlist__total {\n  color: #fff;\n  font-size: 1.14285714em;\n  margin-left: 0.35714286em;\n  margin-top: 0.35714286em; }\n\n.playlist__item {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  margin-bottom: 0.71428571em; }\n\n.playlist__item-desc {\n  background-color: #f0f0f0;\n  color: #232323;\n  -webkit-box-flex: 1;\n      -ms-flex: 1;\n          flex: 1;\n  font-size: 0.71428571em;\n  padding: 0.7em 1em; }\n  @media screen and (min-width: 1200px) {\n    .playlist__item-desc {\n      font-size: 0.85714286em;\n      padding: 0.58333333em 0.83333333em; } }\n\n.match {\n  background-color: #2E2B71;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  height: 2.14285714em;\n  position: relative; }\n\n.match__prev,\n.match__next {\n  background-color: transparent;\n  color: black;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex; }\n\n.match__prev-button,\n.match__next-button {\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  background-color: transparent;\n  color: #fff;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex; }\n\n.match__prev-button .match__copy {\n  margin-left: 5px; }\n\n.match__next-button .match__copy {\n  margin-right: 5px; }\n\n.match__tick-line {\n  background-color: #cccccc;\n  -webkit-box-flex: 1;\n      -ms-flex: 1;\n          flex: 1;\n  position: relative;\n  height: 2px;\n  margin: auto 0; }\n\n.match__tick {\n  background-color: #fff;\n  height: 1.07142857em;\n  margin: 0em 0em 0em 0em;\n  padding: 0em 0em 0em 0em;\n  position: absolute;\n  top: -7px;\n  width: 2px; }\n\n.story-nav {\n  background-color: #232323;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  height: 2.14285714em;\n  -webkit-box-pack: justify;\n      -ms-flex-pack: justify;\n          justify-content: space-between; }\n  @media screen and (min-width: 769px) {\n    .story-nav {\n      background-color: transparent; } }\n\n.story-nav__prev,\n.story-nav__next {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex; }\n\n.story-nav__prev-button,\n.story-nav__next-button {\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  background-color: transparent;\n  color: #fff;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex; }\n  @media screen and (min-width: 769px) {\n    .story-nav__prev-button,\n    .story-nav__next-button {\n      color: #232323; } }\n\n.story-nav__prev-button .story-nav__copy {\n  margin-left: 5px; }\n\n.story-nav__next-button .story-nav__copy {\n  margin-right: 5px; }\n\n.wideScreen {\n  margin-bottom: 20px;\n  width: 100% !important; }\n  .wideScreen .about {\n    display: none; }\n\n.tabs {\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  border-bottom: 1px solid #cccccc;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  font-size: 1.14285714rem;\n  margin: 0.875em 0.9375em 0; }\n  @media screen and (width: 768px) {\n    .tabs {\n      float: left;\n      margin: 0.875em 0 0;\n      width: 100%; } }\n\n.tabs__tab {\n  background-color: #f0f0f0;\n  color: #cccccc;\n  padding: 0.8125em 0.625em;\n  text-transform: uppercase; }\n  .tabs__tab:hover {\n    cursor: pointer; }\n  .tabs__tab--active {\n    background-color: #941A1D;\n    color: #fff; }\n\n.tabs__add-story {\n  margin-left: auto; }\n\n.tabs__playlist-buttons {\n  margin-left: auto; }\n\n.tabs__playlist-buttons {\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  height: 2.5em;\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n  position: relative;\n  width: 2.5em; }\n\n.tabs__tooltip {\n  font-size: 0.85714286rem;\n  position: absolute;\n  right: 3.33333333em;\n  background: #941A1D;\n  color: white;\n  text-align: center;\n  padding: 0.66666667em;\n  top: 0;\n  border-radius: 0.25em;\n  white-space: nowrap; }\n  .tabs__tooltip::before {\n    border-bottom: 5px solid transparent;\n    border-left: 5px solid #941A1D;\n    border-top: 5px solid transparent;\n    content: \" \";\n    height: 0;\n    position: absolute;\n    right: -0.33333333em;\n    top: 1.08333333em;\n    width: 0;\n    white-space: nowrap; }\n\n.adjust-height {\n  overflow-x: hidden;\n  overflow-y: auto; }\n\n.next-vid__row {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex; }\n  .next-vid__row:hover {\n    cursor: pointer; }\n\n.video__title,\n.next-vid__title {\n  color: #941A1D;\n  font-weight: 700; }\n\n.video__title {\n  font-size: 1.28571429rem; }\n\n.next-vid__preview:hover {\n  cursor: pointer; }\n\n.next-vid__thumb {\n  font-size: 1rem;\n  max-width: 100%; }\n\n.next-vid__da-button {\n  background-color: #682052;\n  border: 1px solid transparent;\n  color: #fff;\n  display: block;\n  font-size: 1.78571429rem;\n  font-weight: 400;\n  line-height: 1.2;\n  padding: 0.6em;\n  margin-top: 0.4em;\n  transition: all .2s ease-in-out; }\n  .next-vid__da-button:hover {\n    background-color: #fff;\n    border: 1px solid #682052;\n    color: #682052;\n    text-decoration: none; }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 168:
/***/ (function(module, exports) {

module.exports = "<div (window:resize)=\"onResize($event)\">\n    <div class=\"row video-container\">\n        <section class=\"col-sm-8\">\n            <h3 class=\"video__title\">{{currentItem.title}}</h3>\n            <vg-player (onPlayerReady)=\"onPlayerReady($event)\" #myVideoPlayer>\n              <vg-controls class=\"vg-controls\">\n                  <div class=\"vg-controls__inner-wrapper\">\n                      <vg-play-pause class=\"vg-play-pause\"></vg-play-pause>\n                      <vg-time-display class=\"vg-time-display \" [vgProperty]=\"'current'\"></vg-time-display> /\n                      <vg-time-display class=\"vg-time-display \" [vgProperty]=\"'total'\"></vg-time-display>\n                      <vg-scrub-bar class=\"vg-scrub-bar \" >\n                          <vg-scrub-bar-current-time class=\"vg-scrub-bar-current-time\"  [vgSlider]=\"true\"></vg-scrub-bar-current-time>\n                      </vg-scrub-bar>\n                      <svg class=\"vg-volume-speaker\" width=\"21\" height=\"15\" viewBox=\"0 0 21 15\" xmlns=\"http://www.w3.org/2000/svg\">\n                          <title>\n                              Speaker volume icon\n                          </title>\n                          <path d=\"M5.428 3.872l5.428-3.62V14.73l-5.428-3.62H0V3.872h5.428zm7.275-1.03l1.248-.96c1.34 1.628 2.01 3.498 2.01 5.61 0 2.05-.64 3.877-1.92 5.48l-1.21-.994c1.037-1.327 1.555-2.822 1.555-4.487 0-1.748-.56-3.298-1.682-4.65 0 0 1.12 1.352 0 0zM17.623 15l.11-.145c1.713-2.147 2.57-4.59 2.57-7.328 0-2.774-.87-5.235-2.607-7.382L17.588 0l-1.502 1.158.126.145c1.484 1.82 2.226 3.896 2.226 6.224 0 2.28-.718 4.325-2.153 6.134l-.127.146L17.624 15z\" fill=\"#333\" fill-rule=\"evenodd\"/>\n                      </svg>\n                      <vg-volume class=\"vg-volume\" (mouseup)=\"setVolume()\"></vg-volume>\n                      <svg container=\"body\" placement=\"top\" class=\"vg-full-width\" (click)=\"toggleWideView()\" width=\"25\" height=\"15\" viewBox=\"0 0 25 15\" xmlns=\"http://www.w3.org/2000/svg\">\n                          <title>\n                              Full screen icon and button\n                          </title>\n                          <path d=\"M1 1h23v13H1z\" stroke=\"#333\" stroke-width=\"2\" fill=\"none\" fill-rule=\"evenodd\" />\n                      </svg>\n                  </div>\n              </vg-controls>\n              <video aria-label=\"video\" [src]=\"currentItem.src\" [vgMedia]=\"media\" #media class=\"\" preload=\"auto\" playsinline [poster]=\"currentItem.thumb\" (loadeddata)=\"isLoaded()\" (timeupdate)=\"adjustVideoCurrentTime()\" (ended)=\"nextVideo()\"></video>\n            </vg-player>\n        </section>\n    \n        <section class=\"col-sm-4 next-vid\">\n            <h3>Up Next</h3>\n            <div class=\"row next-vid__preview\" (click)=\"nextVideo()\">\n                <div class=\"col-md-6\"><img class=\"next-vid__thumb\" [src]=\"previousItem.thumb\" alt=\"\"></div>\n                <div class=\"col-md-6 next-vid__title\">{{previousItem.title}}</div>\n            </div>\n            <a class=\"next-vid__da-button\" href=\"\">Pay Here to Watch the Entire Interview</a>\n        </section>\n    </div>\n    \n    <!-- Transcript area -->\n    <div class=\"\" *ngIf=\"timingPairs\">\n        <div class=\"\">\n                <div #transcript class=\"transcript adjust-height\" [class.transcript--mobile-active]=\"!mobileDetails\" [style.height.px]=\"transcriptAreaHeight\">\n                <div class=\"containerForTranscriptTextArea\">\n                    <p class=\"transcriptTextArea\" *ngFor=\"let onePiece of transcriptPieces;let i=index\">\n                        <span [class.selected]=\"isTranscriptPieceActive(i)\"\n                            [thdaScrollTranscript]=\"isTranscriptPieceActive(i)\"\n                            [innerHTML]=onePiece\n                            (topPosition)=\"advanceTranscript($event)\"></span>\n                    </p>\n                </div>\n            </div>\n        </div>\n    </div>\n</div>"

/***/ }),

/***/ 246:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(100);


/***/ }),

/***/ 99:
/***/ (function(module, exports) {

function webpackEmptyContext(req) {
	throw new Error("Cannot find module '" + req + "'.");
}
webpackEmptyContext.keys = function() { return []; };
webpackEmptyContext.resolve = webpackEmptyContext;
module.exports = webpackEmptyContext;
webpackEmptyContext.id = 99;


/***/ })

},[246]);
//# sourceMappingURL=main.bundle.js.map