import { Component, ElementRef } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  body: string;
  title: string;
  videoUrl: string;

  constructor(private elementRef: ElementRef ) {
    this.title = this.elementRef.nativeElement.getAttribute('title');
    this.body = this.elementRef.nativeElement.getAttribute('body');
    this.videoUrl = this.elementRef.nativeElement.getAttribute('videoUrl');
  }
}
