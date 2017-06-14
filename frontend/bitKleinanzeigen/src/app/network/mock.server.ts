import { Response, ResponseOptions, RequestMethod, Headers } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject'

import { NetworkRequest, NetworkHeader, NetworkQuery } from './network.request';
import { Page } from '../model/listings/listing/page.model';
import { Listing } from '../model/listings/listing/listing.model';
import { Comment } from '../model/listings/listing/comment.model';
import { Condition } from '../model/listings/listing/condition.model';
import { MockPageFilter, PageCriteria } from './mock-page.filter';


/**
 * This class mocks a listing rest server.
 * Only for testing purpose.
 */
export class MockServer {

  private securityHeader : NetworkHeader = {
    field: 'api_key',
    value: 'B2A03990DE7D7781D6ADCEA41CDCD2BC'
  }

  private pageFilter : MockPageFilter;

  private activeUser : {
    username : string,
    password : string,
    authenticated : boolean;
    isAdmin : boolean;
  } = {
    username : '',
    password : '',
    authenticated : false,
    isAdmin : false
  };

  private users : [[any, any]] = [
    [{
      username: 'akessler',
      password: '123'
    }, {
      userID: 1,
      userImage: 'http://vignette1.wikia.nocookie.net/ozwikia/images/b/b7/Aileen_Quinn_as_Annie.jpg',
      firstName: 'Anne',
      lastName: 'Kessler',
      isAdmin: false,
      phone: '12345678910',
      location: 'mannheim',
      position: 'godfather',
      eMail: 'anne.kessler@hallomail.com'
    }],
    [{
      username: 'mmustermann',
      password: '123'
    }, {
      userID: 2,
      userImage: 'https://pbs.twimg.com/profile_images/839900475205955585/FMzXSOkV.jpg',
      firstName: 'Marigold',
      lastName: 'Mustermann',
      isAdmin: true,
      phone: '12345678910',
      location: 'Hamburg',
      position: 'Lakai',
      eMail: 'm.mustermann@hallomail.com'
    }]
  ];

  private listings : any[] = [
  {
    type: 'SaleOffer',
    creatorID: 2,
    comments: [{
      userID : 1,
      commentID : 1,
      createDate : new Date().getTime(),
      message: 'Würd ich nicht kaufen!',
      userImage : 'https://pbs.twimg.com/profile_images/839900475205955585/FMzXSOkV.jpg'
    }],
    createDate: 1495804073888,
    description: 'My moneys in that office, right? If she start giving me some bullshit about it aint there, and we got to go someplace else and get it, Im gonna shoot you in the head then and there. Then Im gonna shoot that bitch in the kneecaps, find out where my goddamn money is. She gonna tell me too. Hey, look at me when Im talking to you, motherfucker. You listen: we go in there, and that Winston or anybody else is in there, you the first motherfucker to get shot. You understand?',
    expiryDate: 1495804713707,
    id: 1,
    isActive: true,
    location: 'mannheim',
    title: 'Retro Kühlschränke zu vertickern!!!',
    price : 500,
    mainImage : 'https://www.thekitchentimes.com/wp-content/uploads/2012/09/gorenje-fridge.jpg',
    imageGallery : [ 'assets/images/bit-ka-logo.png' ],
    condition : 'new'
  }, {
    type: 'ServiceOffer',
    creatorID: 2,
    comments: [],
    createDate: 1495804073888,
    description: 'Kein Bock selbst den Rasen zu mähen? Ruft meinen Sohn an, der hat eh nix zu tun!',
    expiryDate: 1495804713707,
    id: 2,
    isActive: true,
    location: 'mannheim',
    title: 'Mein Sohn mäht das Gras für lau!',
    price : 0,
    mainImage : 'https://www.greenmoxie.com/wp/wp-content/uploads/lawn-alternatives-850x400.jpg',
    imageGallery : [ 'assets/images/bit-ka-logo.png' ]
  }, {
    type: 'SaleOffer',
    creatorID: 2,
    comments: [],
    createDate: 1495804073888,
    description: 'He (my husband) is always playing with it, so its got to go!',
    expiryDate: 1495804713707,
    id: 3,
    isActive: true,
    location: 'mannheim',
    title: 'Sony Playstation 2 for all the Soccer Fans!',
    price : 250,
    mainImage : 'http://www.geeky-gadgets.com/wp-content/uploads/2015/12/playstation-42-1.jpg',
    imageGallery : [ 'assets/images/bit-ka-logo.png' ],
    condition : 'used'
  }, {
    type: 'ServiceOffer',
    creatorID: 1,
    comments: [],
    createDate: 1495804073888,
    description: 'Meine Schwester Chantal, Schulabbrecherin bei vollem Herzen, lackiert Euch die Fingernägel!',
    expiryDate: 1495804713707,
    id: 4,
    isActive: true,
    location: 'mannheim',
    title: 'Macht Euch die Nägel schön!',
    price : 50000,
    mainImage : 'http://ghk.h-cdn.co/assets/15/49/1600x800/landscape-1449063635-painting-nails.jpg',
    imageGallery : [ 'assets/images/bit-ka-logo.png' ]
  }, {
    type: 'SaleOffer',
    creatorID: 2,
    comments: [],
    createDate: 1495804073888,
    description: 'Ein old-school Eisschrank um die Drinks cool zu halten!',
    expiryDate: 1495804713707,
    id: 5,
    isActive: true,
    location: 'Nürnberg',
    title: 'Eisschrank für die kalte Seele',
    price : 123.45,
    mainImage : 'http://medien.markt.de/bilder/2013/04/28/20/51c60de1/medium_image/0/alter_gruenderzeit_eisschrank.jpg',
    imageGallery : [ 'assets/images/bit-ka-logo.png' ],
    condition : 'used'
  }, {
    type: 'ServiceOffer',
    creatorID: 2,
    comments: [],
    createDate: 1495804073888,
    description: 'Ein Sofa',
    expiryDate: 1495804713707,
    id: 6,
    isActive: true,
    location: 'mannheim',
    title: 'Test 6',
    price : 50000,
    mainImage : 'assets/images/bit-ka-logo.png',
    imageGallery : [ 'assets/images/bit-ka-logo.png' ]
  }, {
    type: 'ServiceOffer',
    creatorID: 2,
    comments: [],
    createDate: 1495804073888,
    description: 'Ein Sofa',
    expiryDate: 1495804713707,
    id: 7,
    isActive: true,
    location: 'mannheim',
    title: 'Test 7',
    price : 50000,
    mainImage : 'assets/images/bit-ka-logo.png',
    imageGallery : [ 'assets/images/bit-ka-logo.png' ]
  }, {
    type: 'ServiceOffer',
    creatorID: 2,
    comments: [],
    createDate: 1495804073888,
    description: 'Ein Sofa',
    expiryDate: 1495804713707,
    id: 8,
    isActive: true,
    location: 'mannheim',
    title: 'Test 8',
    price : 50000,
    mainImage : 'assets/images/bit-ka-logo.png',
    imageGallery : [ 'assets/images/bit-ka-logo.png' ]
  }, {
    type: 'ServiceOffer',
    creatorID: 2,
    comments: [],
    createDate: 1495804073888,
    description: 'Ein Sofa',
    expiryDate: 1495804713707,
    id: 9,
    isActive: true,
    location: 'mannheim',
    title: 'Macht Euch die Nägel schön!',
    price : 50000,
    mainImage : 'http://ghk.h-cdn.co/assets/15/49/1600x800/landscape-1449063635-painting-nails.jpg',
    imageGallery : [ 'assets/images/bit-ka-logo.png' ]
  }
];

  private favourites : number[] = [2, 3, 1, 4];

  constructor(

  ) {
    this.pageFilter = new MockPageFilter();
  }

  /**
   * Receives the incoming request and proceeds them.
   * @argument {NetworkRequest} networkRequest
   * @return {Observable<Response>}
   */
  public process(networkRequest : NetworkRequest) : Observable<Response> {
    let source : Subject<Response> = new Subject<Response>();
    let observable : Observable<Response> = source.asObservable();
    setTimeout(() => {
      source.next(this.processRequest(networkRequest));
    }, (Math.random() * 1000));
    return observable;
  }

  /**
   * Processes the incoming request and creates a corresponding response.
   * @argument {NetworkRequest} networkRequest
   */
  private processRequest(networkRequest : NetworkRequest) : Response {
    console.log('Mockrequest: ', networkRequest);
    let urlFound : boolean = false;
    let responseOptions : ResponseOptions;
    let paths : string[] = networkRequest.getPaths();
    if (paths[0] === 'user') {
      if (paths[1] === 'login') {
        urlFound = true;
        responseOptions = this.login(networkRequest);
      } else if (paths[1] === 'logout') {
        urlFound = true;
        responseOptions = this.logout(networkRequest);
      } else if (paths[1] === 'favourites') {
        if (networkRequest.getHttpMethod() === RequestMethod.Get) {
          urlFound = true;
          responseOptions = this.getFavourites(networkRequest);
        } else if (networkRequest.getHttpMethod() === RequestMethod.Post) {
          urlFound = true;
          responseOptions = this.postFavourite(networkRequest);
        } else if (paths.length > 2) {
          urlFound = true;
          responseOptions = this.deleteFavourite(networkRequest);
        }
      } else if (paths.length === 2) {
        urlFound = true;
        responseOptions = this.getUser(networkRequest);
      }
    } else if (paths[0] === 'users') {
      urlFound = true;
      responseOptions = this.getUsers(networkRequest);
    } else if (paths[0] === 'listings') {
      if (paths.length === 1) {
        urlFound = true;
        responseOptions = this.getListings(networkRequest);
      } else if (paths[1] === 'active') {
        urlFound = true;
        responseOptions = this.getActiveListings(networkRequest);
      } else if (paths[1] === 'inactive') {
        urlFound = true;
        responseOptions = this.getInactiveListings(networkRequest);
      } else if (paths[1] === 'own') {
        urlFound = true;
        responseOptions = this.getOwnListings(networkRequest);
      } else if (paths[1] === 'search') {
        urlFound = true;
        responseOptions = this.searchListings(networkRequest);
      }
    } else if (paths[0] === 'listing') {
      if (paths.length === 1) {
        if (networkRequest.getHttpMethod() === RequestMethod.Post) {
          urlFound = true;
          responseOptions = this.createListing(networkRequest);
        }
      }  else if (paths[1] === 'upload') {
        if (paths[2] === 'main-image') {
          urlFound = true;
          responseOptions = this.listingMainImageUpload(networkRequest);
        }
      } else if (networkRequest.getPaths().length === 2){
        if (networkRequest.getHttpMethod() === RequestMethod.Get) {
          urlFound = true;
          responseOptions = this.getListing(networkRequest);
        } else if (networkRequest.getHttpMethod() === RequestMethod.Delete) {
          urlFound = true;
          responseOptions = this.removeListing(networkRequest);
        }
      } else if (networkRequest.getPaths().length === 3) {
        if (networkRequest.getPaths()[2] === 'comment') {
          urlFound = true;
          responseOptions = this.postComment(networkRequest);
        }
      } else if (networkRequest.getPaths().length === 4) {
        urlFound = true;
        responseOptions = this.removeComment(networkRequest);
      }
    } else if (paths[0] === 'statistics') {
      urlFound = true;
      responseOptions = this.getStatistics(networkRequest);
    }
    if (!urlFound) {
      responseOptions = this.notFound();
    }
    let response : Response = new Response(responseOptions);
    console.log('Mockresponse: ', response);
    return response;
  }

  private removeComment(networkRequest : NetworkRequest) : ResponseOptions {
    let responseOptions : ResponseOptions = this.responseOptions();
    let listingID : number = parseInt(networkRequest.getPaths()[1]);
    let commentID : number = parseInt(networkRequest.getPaths()[3]);
    let listing : any = this.listings.find(listing => listing.id === listingID);
    let found : boolean = false;
    for (let i = 0; i < listing.comments.length && !found; i++) {
      if (listing.comments[i].commentID === commentID) {
        listing.comments.splice(i, 1);
        found = true;
      }
    }
    if (found) {
      responseOptions.status = 200;
    } else {
      responseOptions.status = 403;
    }
    return responseOptions;
  }

  private postComment(networkRequest : NetworkRequest) : ResponseOptions {
    let responseOptions : ResponseOptions = this.responseOptions();
    let id : number = parseInt(networkRequest.getPaths()[1]);
    let listing : any = this.listings.find(listing => listing.id === id);
    listing.comments.push({
      commentID : listing.comments.length,
      userID : this.getActiveUserID(),
      createDate : networkRequest.getBody().createDate,
      message : networkRequest.getBody().message,
      userImage : this.users.find(user => user[1].userID === this.getActiveUserID())[1].userImage
    });
    responseOptions.status = 201;
    return responseOptions;
  }

  private removeListing(networkRequest : NetworkRequest) : ResponseOptions {
    let responseOptions : ResponseOptions = this.responseOptions();
    let id : number = parseInt(networkRequest.getPaths()[1]);
    let found : boolean = false;
    let arrayIndex : number = -1;
    console.log(id)
    for (let i = 0; i < this.listings.length && !found; i++) {
      if (this.listings[i].id === id) {
        found = true;
        arrayIndex = i;
      }
    }
    if (found) {
      if (this.listings[arrayIndex].creatorID === this.getActiveUserID()) {
        responseOptions.status = 200;
        this.listings.splice(arrayIndex, 1);
      } else {
        responseOptions.status = 403;
      }
    } else {
      responseOptions.status = 404;
    }
    return responseOptions;
  }

  private searchListings(networkRequest : NetworkRequest) : ResponseOptions {
    let responseOptions : ResponseOptions = this.responseOptions();
    responseOptions.status = 200;
    let searchQuery : string = networkRequest.getQueries().find(query => query.key === 'query').values[0];
    console.log(searchQuery);
    let body : any = {};
    body['listings'] = this.listings.filter(listing =>
      listing.title.indexOf(searchQuery) > -1 || listing.description.indexOf(searchQuery) > -1);
    let min_price = 0, max_price = 0;
    body.listings.forEach((listing : any) => {
        if (listing.price) {
          if (listing.price > max_price) {
            max_price = listing.price;
          }
        } else {
          min_price = 0;
        }
    });
    body['min_price'] = min_price;
    body['max_price'] = max_price;
    body['count'] = body.listings.length;
    responseOptions.body = body;
    return responseOptions;
  }

  private getUsers(networkRequest : NetworkRequest) : ResponseOptions {
    let responseOptions : ResponseOptions = this.responseOptions();
    let users : any[] = [];
    if (this.activeUser.isAdmin) {
      responseOptions.status = 200;
      this.users.forEach(user => {
        users.push({
          userID : user[1].userID,
          userImage : user[1].userImage,
          firstName : user[1].firstName,
          lastName : user[1].lastName,
          isAdmin : user[1].isAdmin,
          eMail : user[1].eMail
        })
      });
      responseOptions.body = {};
      responseOptions.body['users'] = users;
    } else {
      responseOptions.status = 403;
    }
    return responseOptions;
  }

  private getUser(networkRequest : NetworkRequest) : ResponseOptions {
    let responseOptions : ResponseOptions = this.responseOptions();
    let userID : number = parseInt(networkRequest.getPaths()[1]);
    let employee = this.users.filter(user => user[1].userID === userID);
    if (employee.length !== 1) {
      responseOptions.status = 404;
    } else {
      responseOptions.status = 200;
      responseOptions.body = employee[0][1];
    }
    return responseOptions;
  }

  private getOwnListings(networkRequest : NetworkRequest) : ResponseOptions {
    let responseOptions : ResponseOptions = this.responseOptions();
    let userID : number = this.getActiveUserID();
    let body = {};
    body['listings'] = this.listings.filter(listing => listing.creatorID === userID);
    responseOptions.body = body;
    responseOptions.status = 200;
    return responseOptions;
  }

  private listingMainImageUpload(networkRequest : NetworkRequest) : ResponseOptions {
    let responseOptions : ResponseOptions = this.responseOptions();
    let id : number = parseInt(networkRequest.getPaths()[3]);
    let found : boolean = false;
    for (let i = 0; i < this.listings.length && !found; i++) {
      if (id === this.listings[i].id) {
        found = true;
        this.listings[i].mainImage = 'assets/images/bit-ka-logo.png';
      }
    }
    responseOptions.status = 201;
    return responseOptions;
  }

  public getListing(networkRequest : NetworkRequest) : ResponseOptions {
    let responseOptions : ResponseOptions = this.responseOptions();
    let id : any = networkRequest.getPaths()[1];
    // console.log(id, 'id');
    this.listings.forEach((listing : any) => {
      // console.log(listing.id == id, 'listing')
      if (listing.id == id) {
        // console.log('found')
        responseOptions.status = 200;
        responseOptions.body = listing;
        return responseOptions;
      }
    });
    // responseOptions.status = 404;
    return responseOptions;
  }

  private getFavourites(networkRequest : NetworkRequest) : ResponseOptions {
    let responseOptions : ResponseOptions = this.responseOptions();
    responseOptions.status = 200;
    responseOptions.body = {
      ids: this.favourites
    };
    // responseOptions.status = 404;
    return responseOptions;
  }

  private postFavourite(networkRequest : NetworkRequest) : ResponseOptions {
    let responseOptions : ResponseOptions = this.responseOptions();
    let id : number = networkRequest.getBody().listingID;
    this.favourites.push(id);
    console.log(id + ' marked as favourite!')
    responseOptions.status = 201;
    return responseOptions;
  }

  private deleteFavourite(networkRequest : NetworkRequest) : ResponseOptions {
    let responseOptions : ResponseOptions = this.responseOptions();
    let id : number = parseInt(networkRequest.getPaths()[2]);
    let found : boolean = false;
    for (let i = 0; i < this.favourites.length && !found; i++) {
      if (this.favourites[i] === id) {
        found = true;
        this.favourites.splice(i, 1);
      }
    }
    responseOptions.status = 200;
    return responseOptions;
  }

  // TODO: Research main headers from the actual server.
  /**
   * Creates a new ResponseOptions object with base properties already set.
   */
  private responseOptions() : ResponseOptions {
    let responseOptions : ResponseOptions = new ResponseOptions();

    return responseOptions;
  }

  /**
   *
   */
  private notFound() : ResponseOptions {
    let responseOptions : ResponseOptions = this.responseOptions();
    responseOptions.status === 404;
    return responseOptions;
  }

  /**
   * Verify the user credentionals.
   */
  private login(networkRequest : NetworkRequest) : ResponseOptions {
    let responseOptions : ResponseOptions = this.responseOptions();
    let body : any = networkRequest.getBody();
    if (body.hasOwnProperty('password') && body.hasOwnProperty('username')) {
      let found : boolean = false;
      for (let i = 0; i < this.users.length && !found; i++) {
        if (this.users[i][0].username === body.username && this.users[i][0].password === body.password) {
          responseOptions.body = this.users[i][1];
          responseOptions.status = 200;
          responseOptions.headers = new Headers();
          responseOptions.headers.append(this.securityHeader.field, this.securityHeader.value);
          this.activeUser.username = body.username;
          this.activeUser.password = body.password;
          this.activeUser.authenticated = true;
          this.activeUser.isAdmin = this.users[i][1].isAdmin;
          found = true;
        }
      }
      if (!found) {
        responseOptions.status = 401;
      }
    } else {
      responseOptions.status = 400;
    }
    return responseOptions;
  }

  /**
   * Discard the authentication of an active user.
   */
  private logout(networkRequest : NetworkRequest) : ResponseOptions {
    let responseOptions : ResponseOptions = this.responseOptions();
    if (this.activeUser.authenticated) {
      responseOptions.status = 200;
    } else {
      responseOptions.status = 401;
    }
    return responseOptions;
  }

  /**
   * Returns a card with the specific listings which match the request queries.
   * This method is admin only.
   */
  private getListings(networkRequest : NetworkRequest) : ResponseOptions {
    console.log('getListings')
    let responseOptions : ResponseOptions = this.responseOptions();
    if (this.activeUser.authenticated) {
      if (this.activeUser.isAdmin) {
        responseOptions.status = 200;
        responseOptions.body = this.createPageFromDatabase(networkRequest.getQueries());
      } else {
        responseOptions.status === 403
      }
    } else {
      responseOptions.status === 401;
    }
    return responseOptions;
  }

  /**
   *
   */
  private createPageFromDatabase(queries : NetworkQuery[]) : Page {
    let criteria : PageCriteria = {};
    queries.forEach((query : NetworkQuery) => {
      if (query.key === 'page') {
        criteria.page = parseInt(query.values[0]);
      } else if (query.key === 'location') {
        criteria.location = query.values;
      } else if (query.key === 'price_min') {
        criteria.price_min = parseInt(query.values[0]);
      } else if (query.key === 'price_max') {
        criteria.price_max = parseInt(query.values[0]);
      } else if (query.key === 'type') {
        criteria.type = query.values;
      } else if (query.key === 'sort') {
        criteria.sort = query.values[0];
      } else {
        throw new Error('invalid query: ' + query.key);
      }
    })
    return this.pageFilter.createPage(this.listings, criteria);
  }

  private getActiveListings(networkRequest : NetworkRequest) : ResponseOptions {
    // console.log(networkRequest.getUrl(), 'onetwothree')
    let responseOptions : ResponseOptions = this.responseOptions();
    if (this.activeUser.authenticated) {
      responseOptions.status = 200;
      responseOptions.body = this.createPageFromDatabase(networkRequest.getQueries());
    } else {
      responseOptions.status = 401;
    }
    return responseOptions;
  }

  private getInactiveListings(networkRequest : NetworkRequest) : ResponseOptions {
    let responseOptions : ResponseOptions = this.responseOptions();
    if (this.activeUser.authenticated) {
      let body : any[] = [];
      this.listings.forEach((listing : any) => {
          if (!listing.isActive) {
            body.push(listing);
          }
      });
      responseOptions.body = body;
    } else {
      responseOptions.status = 401;
    }
    return responseOptions;
  }

  private createListing(networkRequest : NetworkRequest) : ResponseOptions {
    let responseOptions : ResponseOptions = this.responseOptions();
    if (this.activeUser.authenticated) {
      let listing : any = networkRequest.getBody();
      listing.id = this.listings.length + 1;
      listing.comments = [];
      listing.creatorID = this.getActiveUserID();
      this.listings.push(listing);
      let id : number = this.listings.length;
      responseOptions.body = {
        id : id
      };
      responseOptions.status = 201;
    } else {
      responseOptions.status = 401;
    }
    return responseOptions;
  }

  private getActiveUserID() : number {
    return this.users.filter((user : [any, any]) => {
      console.log(user);
      return user[0].username === this.activeUser.username;
    })[0][1].userID;
  }

  private getStatistics(networkRequest : NetworkRequest) : ResponseOptions {
    let responseOptions : ResponseOptions = this.responseOptions();
    let body : any = {};
    body.locations = [
      {
        locationName : 'Mannheim',
        numberOfListings : 9
      }, {
        locationName: 'Zug',
        numberOfListings: 80
      }, {
        locationName: 'Heidelberg',
        numberOfListings: 20
      }
    ];
    body.numberOfListings = this.listings.length;
    body.numberOfActiveListings = this.listings.filter(listing => listing.isActive).length;
    body.numberOfInactiveListings = this.listings.filter(listing => !listing.isActive).length;
    body.listingTypes = [{
      listingTypeName: 'SaleOffer',
      numberOfListings: this.listings.filter(listing => listing.type === 'SaleOffer').length
    }, {
      listingTypeName : 'ServiceOffer',
      numberOfListings: this.listings.filter(listing => listing.type === 'ServiceOffer').length
    }];
    body.numberOfUsers = this.users.length;
    body.numberOfAdmins = this.users.filter(user => user[1].isAdmin).length;
    responseOptions.body = body;
    responseOptions.status = 200;
    return responseOptions;
  }

}
