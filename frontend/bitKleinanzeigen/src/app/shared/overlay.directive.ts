import {
  Directive,
  ElementRef,
  Input,
  Renderer2,
  OnChanges,
  SimpleChanges
} from '@angular/core';

import { Message, MessageService } from './message.service';

/**Adds a class to the Element if the overlay is active. */
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
      // Subscribe to the MessageService to receive Messages from components outside of the router. 
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

    /**Toggls the overlay if it receive an appropiate message.*/
    private toggleOverlay() : void {
      if (this.overlayState) {
        this.hideOverlay();
      } else {
        this.showOverlay();
      }
    }

    /**Adds a class to the Element. Use this class in .css to describe the look of the overlay. */
    private showOverlay() : void {
      this.overlayState = true;
      this.elementRef.nativeElement.classList.add('overlay');
    }

    /**Removes a class (overlay) to the Element. Deactives the overlay. */
    private hideOverlay() : void {
      this.overlayState = false;
      this.elementRef.nativeElement.classList.remove('overlay')
    }

    /**Detect every change in the Input and toggle the overlay. */
    public ngOnChanges(): void {
      if(this.overlay) {
        this.showOverlay();
      } else {
        this.hideOverlay();
      }
    }
  }
