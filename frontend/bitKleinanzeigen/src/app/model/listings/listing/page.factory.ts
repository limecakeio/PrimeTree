import { Page } from './page.model';
import { ListingCreator } from './listing.creator';

/**
 * This class builds a page from incoming JSON objects.
 */
export class PageFactory {

  private pageProperties : string[] = [
    'listings',
    'price_min',
    'price_max',
    'count',
    'pages',
    'pageNumber'
  ];

  constructor(
    private listingCreator : ListingCreator
  ) {  }

  /**
   * Creates a page from the argument object which must contain all necessary properties for a page.
   * Throws an error if some or all properties are missing.
   * @argument {any} body
   * @return {Page}
   */
  public createPage(body : any) : Page {
    let page : Page;
    if (this.checkPageProperties(body)) {
      page = new Page();
      page.count = body.count;
      page.listings = [];
      body.listings.forEach((element : any) => {
          page.listings.push(this.listingCreator.createListing(element));
      });
      page.pages = body.pages;
      page.price_max = body.price_max;
      page.price_min = body.price_min;
      page.pageNumber = body.pageNumber;
    } else {
      throw new Error('Cannot convert JSON object in a page, some or all properties are missing!');
    }
    return page;
  }

  /**
   *
   */
  private checkPageProperties(body : any) : boolean {
    this.pageProperties.forEach((property : string) => {
      if (!body.hasOwnProperty(property)) {
        return false;
      }
    });
    return true;
  }

}
