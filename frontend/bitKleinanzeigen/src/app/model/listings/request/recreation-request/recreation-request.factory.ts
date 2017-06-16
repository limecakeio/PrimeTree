import { RecreationRequest } from './recreation-request.model';
import { ListingFactory } from '../../listing/listing.factory';

export class RecreationRequestFactory extends ListingFactory {

  private vitalProperties : string[] = [
    'category', 'activityLocation', 'startDateAndTime', 'reoccurence'
  ];



  /**
   * checks if all neccesarily properties are set to convert the param object into a saleoffer object
   * @param {any} body an object which holds the properties
   * @return {boolean} indicates wheter the body has all properties
   */
  protected checkProperties(body : any) : boolean {
    if (super.checkProperties(body)) {
      for (let i = 0; i <  this.vitalProperties.length; i++) {
        if (!body.hasOwnProperty(this.vitalProperties[i])) {
          return false;
        }
      }
      return true;
    }
    return false;
  }

  protected findMissingProperties(body : any) : string[] {
    let missingProperties : string[] = super.findMissingProperties(body);
    this.vitalProperties.forEach((property : string) => {
      missingProperties.push(property);
    });
    return missingProperties;
  }

  /**
   * creates a saleoffer based on the properties from the param object
   * @param {any} body an instance of object which holds all properties
   * @return {RecreationRequest} a new instance of SaleOffer with all properties set accordingly to the body object
   * @throws {Error} an error if some properties are missing
   */
  public createListing(body : any) : RecreationRequest {
    if (this.checkProperties(body)) {
      let listing : RecreationRequest = new RecreationRequest();
      this.assignProperties(listing, body);
      return listing;
    } else {
      throw new Error('Cannot create RecreationRequest from body: ' + this.findMissingProperties(body).join(', ') + ' are missing.');
    }
  }

  /**
   * Assigns all properties for a RecreationRequest from body to listing.
   */
  protected assignProperties(listing : RecreationRequest, body : any) : void {
    super.assignProperties(listing, body);
    this.vitalProperties.forEach((property : string) => {
      listing[property] = body[property];
    });
    if (body.hasOwnProperty('mainImage')) {
      listing.mainImage = body.mainImage;
    }
    if (body.hasOwnProperty('endDateAndTime')) {
      listing.endDateAndTime = body.endDateAndTime;
    }
  }


}
