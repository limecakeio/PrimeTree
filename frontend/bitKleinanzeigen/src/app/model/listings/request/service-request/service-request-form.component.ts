import { Component, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { ListingFormComponent } from '../../listing/form/listing-form.component';

import { FormContextService } from '../../../../form/form-context.service';

import { ListingsImageController } from '../../listings-image.controller';

@Component({
  selector: 'service-request-form',
  templateUrl: './service-request-form.component.html',
  providers: [
    FormContextService,
    ListingsImageController
  ],
  outputs: [
    'listingcreated'
  ]
})
export class ServiceRequestFormComponent extends ListingFormComponent {

  form : FormGroup;

  public data : any;

  public model : any;


  constructor(
    public formContextService : FormContextService,
    private listingsImageController : ListingsImageController
  ) {
    super(formContextService);
    this.model = this.listing;
    // console.log('putIntoContext sale')
    // this.formContextService.putIntoContext(this.listing);
    this.data = this.formContextService.data;
    this.form = this.formContextService.form;
    this.model = this.formContextService.model;
  }

  submit() : void {
    this.emitListing((id : number) => {
      if (this.data.imageAsFile) {
        this.listingsImageController.listingMainImageUpload(id, this.data.imageAsFile, this.data.imageFileType).subscribe(() => {
          this.updateRepositoryAfter();
        }, (error : Error) => {
          console.error(error);
        });
        if (this.data.gallery) {
          this.listingsImageController.removeGallery(id).subscribe(() => { // remove former gallery
            for (let i = 0; i < this.data.gallery.length; i++) { // upload all image gallery pictures
              this.listingsImageController.galleryImageUpload(id, i, this.data.gallery[i]);
            }
          });
        }
      } else {
        this.updateRepositoryAfter();
      }
    });
  }

}
