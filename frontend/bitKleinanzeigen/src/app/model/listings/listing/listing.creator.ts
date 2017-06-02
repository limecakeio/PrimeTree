import { Injectable } from '@angular/core';


import { Listing } from './listing.model';
import { ListingFactory } from './listing.factory';
import { ListingModule } from './listing.module';
import { ListingDescriptorHandler } from './listing-descriptor.handler';
import { ListingInformationService } from '../listings-information.service';
/**
 * This class creates a listing from the transport bodies or the other way around
 */
@Injectable()
export class ListingCreator {

  private listingDescriptorHandler : ListingDescriptorHandler;

  constructor(
    private listingInformationService : ListingInformationService
  ) {
    this.listingDescriptorHandler = this.listingInformationService.listingDescriptorHandler;
  }

  /**
   * Creates a new listing with all properties set accordingly of the argument body.
   * Throws an error if no ListingFactory matches the type mentioned in the body or when necessary properties are missing in the body.
   * @param {any} body Must be an object which includes all properties which are necessary to create the listing.
   * @throws {Error}
   */
  public createListing(body : any) : Listing {
    let message : string;
    if (typeof body === 'object' && body.hasOwnProperty('type')) {
      // let factory : ListingFactory = this.getListingFactory(body.type);
      let listingFactory : ListingFactory = this.listingDescriptorHandler.findListingFactoryFromListingType(body.type);
      if (listingFactory !== null) {
        return listingFactory.createListing(body);
      } else {
        message = 'No listing factory found for listing of type: ' + body.type;
      }
    } else {
      message = 'No valid body for building listings!';
    }
    throw new Error(message);
  }

  /**
   * Registers a ListingFactory to call it later.
   * @param {ListingFactory} listingFactory an instance of ListingFactory
   * @return {void}
   */
  public registerFactory(listingFactory : ListingFactory) : void {
    // this.listingFactories.push(listingFactory);
  }

}
