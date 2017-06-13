import { Page } from '../model/listings/listing/page.model';
// BUG: Weird behaviour when I load this class through a barrel

/**
 * This interface describes all criterias the listings can be filtered.
 */
export interface PageCriteria {
  location? : string[];
  price_min? : number;
  price_max? : number;
  type?: string[];
  kind?: string;
  sort?: string;
  page?: number;
}

export class MockPageFilter {


  constructor(private pageDivider : number = 4) {  }

  /**
   * Creates a page from the argument listings.
   */
  public createPage(listings : any[], criteria : PageCriteria) : Page {
    console.log(criteria);
    if (criteria.hasOwnProperty('kind')) {
      if (criteria.kind === 'offer') {
        listings = listings.filter(this.kindOfferFilter);
      } else if (criteria.kind === 'request') {
        listings = listings.filter(this.kindRequestFilter);
      }
    }
    if (criteria.hasOwnProperty('location')) {
      listings = this.locationFilter(listings, criteria.location);
    }
    if (criteria.hasOwnProperty('price_min') && criteria.hasOwnProperty('price_max')) {
      listings = this.priceFilter(listings, criteria.price_min, criteria.price_max);
    }
    if (criteria.hasOwnProperty('type')) {
      listings = this.typeFilter(listings, criteria.type);
    }
    if (criteria.hasOwnProperty('sort')) {
      listings = this.sort(listings, criteria.sort);
    }

    let page : Page = new Page();

    page.count = listings.length;
    page.pages = Math.ceil(listings.length / this.pageDivider);
    page.price_max = this.getPriceMaximum(listings);
    page.price_min = this.getPriceMinimum(listings);
    page.listings = [];
    let index : number = 0;
    if (criteria.hasOwnProperty('page')) {
      index = criteria.page * this.pageDivider;
      page.pageNumber = criteria.page + 1;
    } else {
      page.pageNumber = 1;
    }
    // console.log('page ' + index + ' ' + page.count)
    // if (index > page.count) {
    //   throw new Error('page > count');
    // }
    for (let i = 0; i < this.pageDivider && i + index < listings.length; i++) {
      page.listings.push(listings[i + index]);
    }
    return page;
  }

  /**
   * Returns the price minimum of all argument listings.
   * All listings without a price property are set to a price of zero.
   */
  private getPriceMinimum(listings : any[]) : number {
    let min : number = 0;
    let minFound : boolean = false;
    for (let i = 0; i < listings.length && !minFound; i++) {
      if (listings[i].hasOwnProperty('price')) {
        if (listings[i].price < min) {
          min = listings[i].price;
        }
      } else {
        min = 0;
        minFound = true;
      }
    }
    return min;
  }

  private getPriceMaximum(listings : any[]) : number {
    let max : number = 0;
    for (let i = 0; i < listings.length; i++) {
      if (listings[i].hasOwnProperty('price')) {
        if (listings[i].price > max) {
          max = listings[i].price;
        }
      }
    }
    return max;
  }

  private kindOfferFilter(element : any) : boolean {
    if (
      element.type === 'SaleOffer' ||
      element.type === 'ServiceOffer' ||
      element.type === 'RideShareOffer'
    ) {
      return true;
    }
    return false;
  }

  private kindRequestFilter(element : any) : boolean {
    if (
      element.type === 'BorrowRequest' ||
      element.type === 'PurchaseRequest' ||
      element.type === 'RideShareRequest' ||
      element.type === 'ReoccuringRecreationRequest' ||
      element.type === 'SingleRecreationRequest'
    ) {
      return true;
    }
    return false;
  }

  /**
   * Filters the argument listings by the argument locations.
   */
  private locationFilter(listings : any[], locations : string[]) : any[] {
    console.log('locationFilter')
    let listingsMatch : any[] = [];
    listings.forEach((listing) => {
      let found : boolean = false;
      for (let i = 0; i < locations.length && !found; i++) {
        if (listing.location === locations[i]) {
          listingsMatch.push(listing);
        }
      }
    });
    return listingsMatch;
  }

  /**
   * Filters the listings by price.
   * A listing meet the criteria if its price is lower or same as the maximum price
   * and if the price is higher or same as the minimum price.
   * Short: min <= price <= max
   */
  private priceFilter(listings : any[], min : number, max : number) : any[] {
    let listingsMatch : any[] = [];
    listings.forEach((listing : any) => {
      if (listing.hasOwnProperty('price')) {
        if (listing.price <= max && listing.price >= min) {
          listingsMatch.push(listing);
        }
      } else if (min <= 0) {
        listingsMatch.push(listing);
      }
    });
    return listingsMatch;
  }

  /**
   * Filtes a listing array after types.
   */
  private typeFilter(listings : any[], types : string[]) : any[] {
    let listingsMatch : any[] = [];
    listings.forEach((listing : any) => {
      let found : boolean = false;
      for (let i = 0; i < types.length && !found; i++) {
        if (listing.type === types[i]) {
          listingsMatch.push(listing);
          found = true;
        }
      }
    });
    return listingsMatch;
  }

  /**
   * Sorts the array by sort criteria.
   * Criteria must be one of:
   * alphabetical_asc, alphabetical_desc, date_asc, date_desc,
   * location_asc, location_desc, price_asc, price_desc
   */
  private sort(listings : any[], sortCriteria : string) : any[] {
    if (sortCriteria === 'alphabetical_asc') {
      return listings.sort((a : any, b : any) => {
        return a.title - b.title;
      });
    } else if (sortCriteria === 'alphabetical_desc') {
      return listings.sort((a : any, b : any) => {
        return b.title - a.title;
      });
    } else if (sortCriteria === 'date_asc') {
      return listings.sort((a : any, b : any) => {
        return a.createDate - b.createDate;
      });
    } else if (sortCriteria === 'date_desc') {
      return listings.sort((a : any, b : any) => {
        return b.createDate - a.createDate;
      });
    } else if (sortCriteria === 'location_asc') {
      return listings.sort((a : any, b : any) => {
        return a.location - b.location;
      });
    } else if (sortCriteria === 'location_desc') {
      return listings.sort((a : any, b : any) => {
        return b.location - a.location;
      });
    } else if (sortCriteria === 'price_asc') {
      return listings.sort((a : any, b : any) => {
        if (a.hasOwnProperty('price') && b.hasOwnProperty('price')) {
          return a.price - b.price;
        } else if (a.hasOwnProperty('price') && !b.hasOwnProperty('price')) {
          return a;
        } else if (!a.hasOwnProperty('price') && b.hasOwnProperty('price')) {
          return -b;
        } else if (!a.hasOwnProperty('price') && !b.hasOwnProperty('price')) {
          return 0;
        }
      });
    } else if (sortCriteria === 'price_desc') {
      return listings.sort((a : any, b : any) => {
        if (a.hasOwnProperty('price') && b.hasOwnProperty('price')) {
          return b.price - a.price;
        } else if (a.hasOwnProperty('price') && !b.hasOwnProperty('price')) {
          return -a;
        } else if (!a.hasOwnProperty('price') && b.hasOwnProperty('price')) {
          return b;
        } else if (!a.hasOwnProperty('price') && !b.hasOwnProperty('price')) {
          return 0;
        }
      });
    } else {
      throw new Error('Invalid sort method!');
    }
  }

}
