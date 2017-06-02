import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: 'listings-host'
})
export class ListingsDirective {

  constructor(
    public viewContainerRef : ViewContainerRef
  ) {  }

}
