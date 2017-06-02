import { Listing } from './listing.model';

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

  public createListingList(body : any) : ListingList {
    if (this.checkProperties(body)) {
      let listingList : ListingList = new ListingList();
      this.assignProperties(listingList, body);
      return listingList;
    }
    throw new Error('Cannot create a ListingList:' + this.findMissingProperties(body).join(', ') + ' are missing!');
  }

  private checkProperties(body : any) : boolean {
    this.listingListProperties.forEach((property : string) => {
      if (!body.hasOwnProperty(property)) {
        return false;
      }
    });
    return true;
  }

  private findMissingProperties(body : any) : string[] {
    let missingProperties : string[] = [];
    this.listingListProperties.forEach((property : string) => {
      if (!body.hasOwnProperty(property)) {
        missingProperties.push(property);
      }
    });
    return missingProperties;
  }

  private assignProperties(listingList : ListingList, body : any) : void {
    this.listingListProperties.forEach((property : string) => {
      listingList[property] = body[property];
    });
  }

}
