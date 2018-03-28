import { Directive, ElementRef, Input, Renderer, Output, EventEmitter } from '@angular/core';

// NOTE: this directive used to use scrollIntoView with window scrolling removed via CSS. However, it has been updated to pass
// the top offset value of the element to the parent component. From there, the parent uses scrollTop with that value
// on the transcript container. This way, we can scroll the element with overflow rather than the entire window, which is
// better for responsive heights and layouts. We may want to discuss the value of keeping this functionality as a directive vs.
// creating a transcript component. Right now, we still have to do the actual scrolling inside a function in the parent component.
@Directive({ selector: '[thdaScrollTranscript]' })
export class ScrollTranscript {
    private el: HTMLElement;

    constructor(private _renderer: Renderer, el: ElementRef) { this.el = el.nativeElement; }

    @Input() set thdaScrollTranscript(condition: boolean) {
        if (condition) {
            var topPos = this.el.offsetTop;
            this.updatePos(topPos);
        }
    }

    @Output() topPosition: EventEmitter<any> = new EventEmitter();

    updatePos(topPos) {
        this.topPosition.emit(topPos);
    }
}