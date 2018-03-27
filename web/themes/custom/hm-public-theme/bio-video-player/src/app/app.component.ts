import { Component, Input, ElementRef, ViewChild } from '@angular/core';
import { DetailedStory } from './detailed-story';
import { TimedTextMatch } from './timed-text-match';
import { TranscriptTiming } from './transcript-timing';
import { VgCoreModule }         from 'videogular2/core';
import { VgControlsModule }     from 'videogular2/controls';
import { VgOverlayPlayModule }  from 'videogular2/overlay-play';
import { VgBufferingModule }    from 'videogular2/buffering';
import { VgAPI }                from 'videogular2/core';

export interface IMedia {
  title: string;
  src: string;
  type: string;
  thumb: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  @ViewChild('myVideoArea') videoPlayerAndControlsAreaRef: ElementRef;
  @ViewChild('myVideoPlayer') videoPlayerRef: any;
  @ViewChild('transcript') transcript: any;

  source: string;
  source2: string;
  title: string;
  title2: string;
  thumb: string;
  thumb2: string;
  mobileDetails: boolean = false;
  transcriptAreaHeight: number = 100;
  transcriptText: string;
  transcriptText1: string;
  transcriptText2: string;
  myStory: DetailedStory;
  myMatchContext: TimedTextMatch[] = [];
  timingPairs: string;
  timingPairsVideo1: TranscriptTiming[];
  timingPairsVideo2: TranscriptTiming[];
  wideScreen: boolean = false;
  storyHasMatches: boolean = true;
  videoPositionInSeconds: number = 0;

  // Support interfaces for transcript scrolling
  currentActiveTranscriptPiece: number;
  transcriptPieces: string[];
  transcriptHeightInitialized: boolean = false;

  public api: VgAPI;
  
  playlist: Array<IMedia>;
  currentIndex = 0;
  currentItem: IMedia;
  previousItem: IMedia;

  constructor(private elementRef:ElementRef) {
    this.source = this.elementRef.nativeElement.getAttribute('source');
    this.source2 = this.elementRef.nativeElement.getAttribute('source2');
    this.title = this.elementRef.nativeElement.getAttribute('title');
    this.title2 = this.elementRef.nativeElement.getAttribute('title2');
    this.thumb = this.source.replace('video','image');
    this.thumb2 = this.source2.replace('video','image');
    this.timingPairs = this.elementRef.nativeElement.getAttribute('timingPairs');
    this.transcriptText = this.elementRef.nativeElement.getAttribute('transcriptText');

    this.transcriptText = this.transcriptText.replace( /(\$)\1+/gi, "\n\n").replace(/[\\]/, '');;
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
    this.currentItem = this.playlist[ this.currentIndex ];
    this.previousItem = this.playlist[ this.currentIndex + 1 ];
  }

  timingPairsToJSON(timingPairs) {
    let currentNum = "";
    let newTimingPairs = [];
    let newTimingPair: TranscriptTiming = {offset: 0, time: 0};
    for (let ch of timingPairs) {
      if (ch === ',') {
        newTimingPair.time = Number(currentNum);
        currentNum = "";
      }
      else if (ch === ':') {
        newTimingPair.offset = Number(currentNum);
        newTimingPairs.push(newTimingPair);
        currentNum = "";
        newTimingPair = {offset: 0, time: 0};
      }
      else {
        currentNum = currentNum + ch;
      }
    }
    return newTimingPairs;
  }

  ngOnInit() {
    this.myStory = {
      transcript: this.transcriptText1,
      timingPairs: this.timingPairsVideo1
    }
    this.transcriptPieces = [];
    this.transcriptPieces.push("");
    this.currentActiveTranscriptPiece = -1;
    this.ComputeTimesForOffsets();
    this.ComputeTimedTranscriptWithMatches();
  }

    // Helper function to bold match text in the transcript, and break transcript up into pieces to
    // highlight a piece based on video transcript timing.  If there are no matches, then no text will get bolded.
    private ComputeTimedTranscriptWithMatches() {
      var matchOffset: number;
      var matchEndOffset: number;
      var textWithBoldedMatches: string;
      var outOfBoundsOffset: number;
      var timingIndexToCheckFirst: number;

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
      for (var iMatch: number = this.myMatchContext.length - 1; iMatch >= 0; iMatch--) {
          matchOffset = this.myMatchContext[iMatch].startOffset;
          matchEndOffset = this.myMatchContext[iMatch].endOffset;
          if (matchOffset < outOfBoundsOffset) { // there is room in text to highlight this match
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
              else { // the match extends to the end of this chunk being considered.
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
      var transcriptPiece: string;
      var re = /\n/g;

      // Pass 2: use the adjusted this.myStory.timingPairs (to account for <b></b> inserts) to break
      // textWithBoldedMatches(i.e., the transcript with matches) into this.transcriptPieces.
      if (this.myStory.timingPairs.length > 1) {
          // Fill transcript by breaking it into N pieces, corresponding to the N timing pieces.

          for (var i = 0; i < this.myStory.timingPairs.length - 1; i++) {
              if (this.myStory.timingPairs[i + 1].offset > this.myStory.timingPairs[i].offset) {
                  // Something worthwhile for this piece.
                  transcriptPiece = textWithBoldedMatches.substring(this.myStory.timingPairs[i].offset,
                          this.myStory.timingPairs[i + 1].offset)
                  transcriptPiece = transcriptPiece.replace(re,'<br>');
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
          transcriptPiece = textWithBoldedMatches.replace(re,'<br>');
          this.transcriptPieces.push(transcriptPiece);
      }
  }

  // Something off about the offset. Will look into when I return
  advanceTranscript(offset) {
    if (offset > 18) this.transcript.nativeElement.scrollTop = offset - 22;
  }

  isTranscriptPieceActive(whichPiece: number) { return (whichPiece == this.currentActiveTranscriptPiece); }

  onPlayerReady(api: VgAPI) {
    this.api = api;
    this.api.getDefaultMedia().subscriptions.ended.subscribe(this.nextVideo.bind(this));
  }

  nextVideo() {
    this.previousItem = this.currentItem;
    this.currentIndex++;

    if (this.currentIndex === this.playlist.length) {
        this.currentIndex = 0;
        this.myStory = {
            transcript: this.transcriptText1,
            timingPairs: this.timingPairsVideo1
        }
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
        }
        this.transcriptPieces = [];
        this.transcriptPieces.push("");
        this.currentActiveTranscriptPiece = -1;
        this.ComputeTimesForOffsets();
        this.ComputeTimedTranscriptWithMatches();
    }

    this.currentItem = this.playlist[ this.currentIndex ];

  }

  onClickPlaylistItem(item: IMedia, index: number) {
      this.currentIndex = index;
      this.currentItem = item;
  }

  isLoaded() {
    this.initTranscriptHeight();
  }

  public initTranscriptHeight() {
    this.computeTranscriptAreaHeight(window.innerWidth, window.innerHeight);
  }

  private computeTranscriptAreaHeight(fullWindowWidth: number, fullWindowHeight: number) {
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
        const aspectRatio = this.videoPlayerRef.api.videogularElement.offsetWidth / this.videoPlayerRef.api.videogularElement.offsetHeight
        if (fullWindowWidth >= 550 && this.wideScreen === false) {
            this.transcriptAreaHeight = 220;
        }
        // Widescreen capability is currently commented out until a design is done
        // else if (fullWindowWidth >= 768 && this.wideScreen === true) {
        //     if (this.storyHasMatches === true) this.transcriptAreaHeight = fullWindowHeight - (this.videoPlayerRef.api.videogularElement.offsetHeight + 120);
        //     else this.transcriptAreaHeight = fullWindowHeight - (this.videoPlayerRef.api.videogularElement.offsetHeight + 70);
        // }
        else {
            if (this.storyHasMatches === true) this.transcriptAreaHeight = fullWindowHeight - (this.videoPlayerRef.api.videogularElement.offsetHeight + 250);
            else this.transcriptAreaHeight = fullWindowHeight - (this.videoPlayerRef.api.videogularElement.offsetHeight + 215);
        }
    }
}

onResize(event) {
    this.computeTranscriptAreaHeight(window.innerWidth, window.innerHeight);
}

  adjustVideoCurrentTime() {
    let movieTimeInSecs: number
    movieTimeInSecs =  this.api.getDefaultMedia().currentTime;
    
      // One-time setup of video transcript height based on video player (and player controls) height:
      if (!this.transcriptHeightInitialized) {
        this.computeTranscriptAreaHeight(window.innerWidth, window.innerHeight);
        this.transcriptHeightInitialized = true;
      }

      this.videoPositionInSeconds = movieTimeInSecs;
      // Possibly adjust which transcript piece is highlighted as well.
      var maxTimingEntries: number = 0;

      if (this.myStory && this.myStory.timingPairs)
          maxTimingEntries = this.myStory.timingPairs.length;

      if (maxTimingEntries > 1) {
          // Only bother with selecting a piece of the transcript if there are 2+ pieces.
          // The means of activating a piece is via this.currentActiveTranscriptPiece.
          // NOTE: max value for this.currentActiveTranscriptPiece == maxTimingEntries - 2 under assumption
          // that final timing entry in this.myStory.timingPairs equals transcript length as offset, video duration as timing, i.e.,
          // that last entry does not help set an active region by itself but sets maximums on offset and video timing.
          // This assumption allows us to safely make use of this.currentActiveTranscriptPiece + 1 as an index into this.myStory.timingPairs.
          var movieTimeInMSecs: number = movieTimeInSecs * 1000;
          if (this.currentActiveTranscriptPiece < 0 ||
              movieTimeInMSecs < this.myStory.timingPairs[this.currentActiveTranscriptPiece].time ||
              movieTimeInMSecs > this.myStory.timingPairs[this.currentActiveTranscriptPiece + 1].time) {
              // There will be a change to this.currentActiveTranscriptPiece based on movieTimeInMSecs
              if (movieTimeInMSecs < this.myStory.timingPairs[1].time)
                  this.currentActiveTranscriptPiece = 0;
              else if (movieTimeInMSecs >= this.myStory.timingPairs[maxTimingEntries - 2].time)
                  this.currentActiveTranscriptPiece = maxTimingEntries - 2;
              else {
                  for (var i: number = 1; i < maxTimingEntries - 1; i++)
                      if (movieTimeInMSecs < this.myStory.timingPairs[i + 1].time) {
                          this.currentActiveTranscriptPiece = i;
                          break;
                      }
              }
          }
      }
  }

  private ComputeTimesForOffsets() {
    // Use this.myStory.timingPairs and this.myStory.matchTerms to compute this.myMatchContext for each match in matchTerms
    var i: number = 0;
    var matchIndex: number = 0;
    var maxTimingPairIndex: number;
    var givenMatchesCount: number;
    var newEntry: TimedTextMatch;

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
}

}
