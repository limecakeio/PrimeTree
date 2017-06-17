import { Listing } from './listing.model';

/**A ListingList contains an array of listings as well as infomation about the listings. */
export class ListingList {

  public price_min : number;

  public price_max : number;

  public listings : Listing[];

  public count : number;

}

export class ListingListFactory {

  private listingListProperties : string[] = [
    'price_min', 'price_max', 'listings', 'count'
  ];

  /**Creates a new ListingList from the request body. */
  public createListingList(body : any) : ListingList {
    if (this.checkProperties(body)) {
      let listingList : ListingList = new ListingList();
      this.assignProperties(listingList, body);
      return listingList;
    }
    throw new Error('Cannot create a ListingList:' + this.findMissingProperties(body).join(', ') + ' are missing!');
  }

  /**Checks whether all properties are includede on the body. */
  private checkProperties(body : any) : boolean {
    this.listingListProperties.forEach((property : string) => {
      if (!body.hasOwnProperty(property)) {
        return false;
      }
    });
    return true;
  }

  /**Returns an array of strings describing  all missing properties. */
  private findMissingProperties(body : any) : string[] {
    let missingProperties : string[] = [];
    this.listingListProperties.forEach((property : string) => {
      if (!body.hasOwnProperty(property)) {
        missingProperties.push(property);
      }
    });
    return missingProperties;
  }

  /**Assign all properties from the request body to the lsting. */
  private assignProperties(listingList : ListingList, body : any) : void {
    this.listingListProperties.forEach((property : string) => {
      listingList[property] = body[property];
    });
  }

}
