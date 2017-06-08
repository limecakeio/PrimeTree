import {
  Directive,
  ElementRef,
  Input,
  OnChanges,
  Renderer2,
  SimpleChanges,
  OnInit
} from '@angular/core';

import { Message, MessageService } from './message.service';

@Directive({
  selector: '[overlay]',
  host: {
    '(showOverlay)' : 'displayOverlay()',
    '(closeOverlay)' : 'closeOverlay()'
  }
})
export class OverlayDirective implements OnInit {

  @Input() overlay : boolean;

  @Input() selector : string;

  constructor(
    private elementRef : ElementRef,
    private renderer : Renderer2,
    private messageService : MessageService
  ) {
    // this.displayOverlay();
    this.renderer.setStyle(this.elementRef.nativeElement, 'z-index', '1000');
    // this.renderer.setStyle(this.elementRef.nativeElement, 'left', '-100%');
    this.renderer.setStyle(this.elementRef.nativeElement, 'width', '100%');
    this.renderer.setStyle(this.elementRef.nativeElement, 'height', '100%');
    this.renderer.setStyle(this.elementRef.nativeElement, 'position', 'absolute');
    this.renderer.setStyle(this.elementRef.nativeElement, 'background-color', 'rgba(0,0,0,0.75)');
    // this.renderer.setStyle(this.elementRef.nativeElement, 'transition', '2s');
    this.messageService.getObservable().subscribe((message : Message) => {
      if (message.message.indexOf(this.selector) >= 0) {
        if (message.message.indexOf('show') >= 0) {
          this.displayOverlay();
        } else if (message.message.indexOf('hide') >= 0) {
          this.hideOverlay();
        }
      }
    });
  }

  private closeOverlay() : void {
    this.elementRef.nativeElement.classList.remove('overlay');
    console.log(this.elementRef.nativeElement)
    this.hideOverlay();
  }

  private displayOverlay() : void {
    this.elementRef.nativeElement.classList.add('overlay');
    console.log(this.elementRef.nativeElement.classList)

    this.renderer.setStyle(this.elementRef.nativeElement, 'display', 'block');

    // angular ignores possible transitions without a delay
    setTimeout(() => {
      this.renderer.setStyle(this.elementRef.nativeElement, 'left', '0');
    }, 10)
  }

  private hideOverlay() : void {
    this.renderer.setStyle(
      this.elementRef.nativeElement,
      'display',
      'none'
    );
    this.renderer.setStyle(this.elementRef.nativeElement, 'left', '-100%');
  }

  ngOnInit() : void {
    // if (
    //   typeof simpleChanges['overlay'] === 'undefined'
    // ) {
    //   throw new Error('Missing input overlay!');
    // }
    // if (
    //   typeof simpleChanges['selector'] === 'undefined'
    // ) {
    //   throw new Error('Missing input selector!');
    // }
    // if (typeof simpleChanges['overlay']['currentValue'] !== 'boolean') {
    //   throw new Error('Overlay input property can only be a boolean, but is ' + typeof simpleChanges['overlay']['currentValue'] + '!');
    // }
    // if (typeof simpleChanges['selector']['currentValue'] !== 'string') {
    //   throw new Error('Selector is needed to detemine when to change overlay states.');
    // }
  }

  ngOnChanges(simpleChanges : SimpleChanges) : void {
    if (this.overlay) {
      this.displayOverlay();
    } else {
      this.hideOverlay();
    }
  }

}
