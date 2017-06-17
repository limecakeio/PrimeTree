import { Listing } from './listing.model';
import { ListingCreator } from './listing.creator';

/**
 * ListingFactory
 */
export class ListingFactory {

  public type : string = '';

  constructor(
    type : string
  ) {
    this.type = type;
  }

  private vitalListingProperties : string[] = [
    'comments', 'createDate', 'creatorID', 'description', 'expiryDate', 'id',
    'isActive', 'location', 'title', 'type'
  ];

  /**Returns an array of strings describing all missing properties. */
  protected findMissingProperties(body : any) : string[] {
    let missingProperties : string[] = [];
    this.vitalListingProperties.forEach((property : string) => {
      if (!body.hasOwnProperty(property)) {
        missingProperties.push(property);
      }
    });
    return missingProperties;
  }

  /**
   * creates a new listing from the param body
   * @param {object} body an object with the needed properties
   * @return {Listing}
   */
  public createListing(body : any) : Listing {
    if (this.checkProperties(body)) {
      let listing : Listing = new Listing();
      this.assignProperties(listing, body);
      return listing;
    } else {
      throw new Error('Cannot create Listing from body: ' + this.findMissingProperties(body).join() + ' are missing');
    }
  }



  /**
   * verify if the param object has all necessarily properties to build a Listing object
   * @param {any} body the object which properties should be examined
   * @return {boolean} Returns true if all needed properties are set, otherwise false
   */
  protected checkProperties(body : any) : boolean {
    if (body === null || typeof body === 'undefined' || typeof body !== 'object') {
      return false;
    }
    this.vitalListingProperties.forEach((property : string) => {
      if (!body.hasOwnProperty(property)) {
        return false;
      }
    });
    return true;
  }

  /**
   * Assigns all listings properties from body to listing.
   */
  protected assignProperties(listing : Listing, body : any) : void {
    this.vitalListingProperties.forEach((property : string) => {
      listing[property] = body[property];
    });
  }

}
