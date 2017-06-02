import { Component } from '@angular/core';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';

import { FormService } from '../../forms.service';

@Component({
  selector: 'form-element-image',
  templateUrl: './image.component.html',
  styleUrls: [ './image.component.css' ]
})
export class ImageFormComponent {

  data : any;

  constructor(private formService : FormService) {
    this.data = this.formService.data;
  }

  input(event : Event) : void {
    
  }



}
