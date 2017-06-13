import { Component, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { ListingCreateFormComponent } from '../../listing/create/listing-create-form.component';
import { Condition } from '../../listing/condition.model';

import { FormService } from '../../../../form/forms.service';
import { SaleOffer } from './sale-offer.model';

import { ListingsImageController } from '../../listings-image.controller';

@Component({
  selector: 'sale-offer-create',
  templateUrl: './sale-offer-create-form.component.html',
  providers: [
    FormService,
    ListingsImageController
  ],
  outputs: [
    'listingcreated'
  ]
})
export class SaleOfferCreateFormComponent extends ListingCreateFormComponent{

  form : FormGroup;


  constructor(
    private service : FormService,
    private listingsImageController : ListingsImageController
  ) {
    super(service);
    this.service.form = new FormGroup({});
    this.service.model = new SaleOffer();
    this.service.data = {};
    this.data = this.service.data;
    this.form = this.service.form;
    this.model = this.service.model;
  }

  submit() : void {
    // this.model.condition = Condition.New;
    // this.model.expiryDate = null;
    this.emitListing((id : number) => {
      if (this.data.imageAsFile) {
        this.listingsImageController.listingMainImageUpload(id, this.data.imageAsFile).subscribe(() => {
          this.updateRepository();
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
        this.updateRepository();
      }
    });
  }
}
