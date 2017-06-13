import {
  Directive,
  ElementRef,
  Input,
  Renderer2,
  OnChanges,
  SimpleChanges
} from '@angular/core';

import { Message, MessageService } from './message.service';

@Directive({
  selector: '[overlay]',
  host: {
    '(showOverlay)' : 'showOverlay()',
    '(hideOverlay)' : 'hideOverlay()'
  }
})
export class OverlayDirective implements OnChanges {

  @Input() overlay : boolean;

  @Input() selector : string;
  private overlayState : boolean = false;

    constructor(
      private elementRef : ElementRef,
      private renderer : Renderer2,
      private messageService : MessageService
    ) {
      this.messageService.getObservable().subscribe((message : Message) => {
        if (message.message.indexOf(this.selector) >= 0) {
          if (message.message.indexOf('show') >= 0) {
            this.showOverlay();
          } else if (message.message.indexOf('hide') >= 0) {
            this.hideOverlay();
          } else if (message.message.indexOf('toggle') >= 0) {
            this.toggleOverlay();
          }
        }
      });
    }

    private toggleOverlay() : void {
      if (this.overlayState) {
        this.hideOverlay();
      } else {
        this.showOverlay();
      }
    }

    private showOverlay() : void {
      this.overlayState = true;
      this.elementRef.nativeElement.classList.add('overlay');
    }

    private hideOverlay() : void {
      this.overlayState = false;
      this.elementRef.nativeElement.classList.remove('overlay')
    }
    ngOnChanges(): void {
      if(this.overlay) {
        this.showOverlay();
      } else {
        this.hideOverlay();
      }
    }
  }
