import { Injectable } from '@angular/core';

/**
 * This class prevent the use of an output to create a cummunication canal
 * between the ListingCreateComponent, which is a placeholder for listing forms
 * and does the preserving of the listing and the actual forms.
 */
@Injectable()
export class ListingCreateService {

  public model : any;

  public data : any;


}
