import { Injectable } from '@angular/core';
import { NetworkService } from './network.service';
import { NetworkRequest } from './network.request';
import { Response, ResponseOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { UserService } from '../model/user/user';

@Injectable()
export class MockNetworkService extends NetworkService {
  private mock : MockServer = new MockServer(this.userService);

  constructor(
    private userService : UserService
  ) {
    super();
  }

  public getServerAddress() : string {
    return 'http://localhost:3000';
  }

  send(request : NetworkRequest) : Observable<Response> {
    return this.mock.receive(request);
  }

  networkRequest() : NetworkRequest {
    let networkRequest : NetworkRequest = new NetworkRequest();
    networkRequest.setHostname('141.19.145.175').setPort(8080);
    return networkRequest;
  }

}

/**
 * describs an function which controlls one ressource
 */
interface ControllerHandlerFunction {
  (networkRequest : NetworkRequest) : Observable<Response>;
}



class MockServer {
  private listingReposetory : any[] = [
    {
      title: "Test Listing 1",
      createDate: 1494837196787,
      description: "This is a listing for test purposes",
      expiryDate: null,
      location: "mannheim",
      price: 3000,
      type: "SellItem",
      condition: "bad",
      id: 1,
      active: true,
      creator: "akessler"
    },
    {
      title: "Test Listing 2",
      createDate: 1494837196787,
      description: "This is a listing for test purposes",
      expiryDate: null,
      location: "mannheim",
      price: 5000,
      type: "SellItem",
      condition: "bad",
      id: 2,
      active: true,
      creator: "akessler"
    },
    {
      title: "Test Listing 3",
      createDate: 1494837196787,
      description: "This is a listing for test purposes",
      expiryDate: null,
      location: "mannheim",
      price: 1000,
      type: "SellItem",
      condition: "bad",
      id: 3,
      active: true,
      creator: "akessler"
    },
    {
      title: "Test Listing 4",
      createDate: 1494837196790,
      description: "This is a listing for test purposes",
      expiryDate: null,
      location: "mannheim",
      price: 3000,
      type: "SellItem",
      condition: "bad",
      id: 4,
      active: true,
      creator: "akessler"
    },
    {
      title: "Test Listing 5",
      createDate: 1494837196790,
      description: "This is a listing for test purposes",
      expiryDate: null,
      location: "mannheim",
      price: 3000,
      type: "SellItem",
      condition: "bad",
      id: 5,
      active: true,
      creator: "mmustermann"
    },
    {
      title: "Test Listing 6",
      createDate: 1494837196790,
      description: "This is a listing for test purposes",
      expiryDate: null,
      location: "mannheim",
      price: 3000,
      type: "SellItem",
      condition: "bad",
      id: 6,
      active: true,
      creator: "npilch"
    },
    {
      title: "Test Listing 7",
      createDate: 1494837196790,
      description: "This is a listing for test purposes",
      expiryDate: null,
      location: "mannheim",
      price: 3000,
      type: "SellItem",
      condition: "bad",
      id: 7,
      active: true,
      creator: "rvladimirskij"
    },
    {
      title: "Test Listing 8",
      createDate: 1494837196790,
      description: "This is a listing for test purposes",
      expiryDate: null,
      location: "mannheim",
      price: 3000,
      type: "SellItem",
      condition: "bad",
      id: 8,
      active: true,
      creator: "fkutz"
    }
  ];
  private userReposetory : any[] = [{
    username : 'wschramm',
    password : '123'
  }, {
    username: 'akessler',
    password: '123'
  }, {
    username: 'mmustermann',
    password: '123'
  }];

  handlers : any = [];

  private registerhandler(path : string, handler : ControllerHandlerFunction) : void {

  }



  constructor(
    private userService : UserService
  ) {

  }

  private notFound(networkRequest : NetworkRequest) : Observable<Response> {
    let source : Subject<Response> = new Subject<Response>();
    let observable : Observable<Response> = source.asObservable();
    let options : ResponseOptions = new ResponseOptions();
    options.status = 404;
    let response : Response = new Response(options);
    setTimeout(() => {
      source.next(response);
    }, (Math.random() * 1000));
    return observable;
  }

  private baseResponseOptions() : ResponseOptions {
    let options : ResponseOptions = new ResponseOptions();

    return options;
  }

  public receive(networkRequest : NetworkRequest) : Observable<Response> {
    let response : Response;
    let notFound : boolean = true;
    let url : string = networkRequest.getUrl();
    let paths : string[] = url.split('/');
    if (paths[3] === 'listing') {
      if (paths.length >= 5) {
        if (paths[4] === 'create') {
          notFound = false;
          return this.createListing(networkRequest);
        } else if (paths[4] === 'upload') {
          // if (paths[4] === 'main-image') {
            return this.listingMainImageUpload(networkRequest);
          // }
        } else {
          switch(networkRequest.getHttpMethod()) {
            case 0:
              return this.getListing(networkRequest);
            case 1:
              return this.editListing(networkRequest);
            case 3:
              return this.deleteListing(networkRequest);
            case 4:
              return this.deleteListing(networkRequest);
          }
        }
      }
    } else if (paths[3] === 'user') {

    } else if (paths[3] === 'login') {
      notFound = false;
      return this.login(networkRequest);
    } else if (paths[3] === 'logout') {
      notFound = false;
      return this.logout(networkRequest);
    } else if (paths[3] === 'upload') {
      if (paths[4] === 'main-image') {
        return this.listingMainImageUpload(networkRequest);
      }
    } else if (paths[3] === 'listings') {
      if (paths[4] === 'active') {
        notFound = false;
        return this.getAllActiveListings(networkRequest);
      } else if (paths[4] === 'inactive') {
        notFound = false;
        return this.getAllInactiveListings(networkRequest);
      }
    }
    return this.notFound(networkRequest);
  }

  private login(networkRequest : NetworkRequest) : Observable<Response> {
    console.log(networkRequest.getHttpMethod(), networkRequest.getUrl());
    let source : Subject<Response> = new Subject<Response>();
    let observable : Observable<Response> = source.asObservable();
    let body : FormData = networkRequest.getBody();
    let options : ResponseOptions = this.baseResponseOptions();

    let exisitingUser : boolean = false;
    for (let i = 0; i < this.userReposetory.length && !exisitingUser; i++) {
      // console.log(this.userReposetory[i], this.securityModel);
      if (this.userReposetory[i].username === this.userService.user.username &&
        this.userReposetory[i].password === this.userService.user.password
      ) {
        exisitingUser = true;
      }
    }
    if (exisitingUser) {
      options.status = 200;
    } else {
      options.status = 401;
    }

    let response = new Response(options);
    setTimeout(() => {
      source.next(response);
    }, (Math.random() * 1000));
    return observable;
  }

  private logout(networkRequest : NetworkRequest) : Observable<Response> {
    console.log(networkRequest.getHttpMethod(), networkRequest.getUrl());
    let source : Subject<Response> = new Subject<Response>();
    let observable : Observable<Response> = source.asObservable();
    let options : ResponseOptions = this.baseResponseOptions();
    let response : Response = new Response(options);
    setTimeout(() => {
      source.next(response);
    }, (Math.random() * 1000));
    return observable;
  }

  private createListing(networkRequest : NetworkRequest) : Observable<Response> {
    console.log(networkRequest.getHttpMethod(), networkRequest.getUrl());
    let source : Subject<Response> = new Subject<Response>();
    let observable : Observable<Response> = source.asObservable();
    let body : any = networkRequest.getBody();
    let missingProperties : string[] = this.getMissingProperties(body);
    let options : ResponseOptions = this.baseResponseOptions();

    if (missingProperties.length === 0) {
      body.id = this.listingReposetory.length + 1;
      body.active = true;
      body.creator = this.userService.user.username;
      console.log(body); // For testing purposes
      this.listingReposetory.push(body);
      // console.log(this.listingReposetory);
      options.status = 201;
      options.body = {
        id: this.listingReposetory.length
      }
    } else {
      options.status = 400;
      options.body = {
        status : 'NOT OK',
        message: 'missing: ' + JSON.stringify(missingProperties)
      }
    }
    let response : Response = new Response(options);
    setTimeout(() => {
      source.next(response);
    }, (Math.random() * 1000));
    return observable;
  }



  private getMissingProperties(listing : any) : string[] {
    let baseProperties : string[] = ['description', 'createDate', 'expiryDate', 'location', 'title', 'type'];
    let missingProperties : string[] = [];
    for (let i = 0; i < baseProperties.length; i++) {
      if (!listing.hasOwnProperty(baseProperties[i])) {
        missingProperties.push(baseProperties[i]);
      }
    }

    if (listing.type === 'SellItem') {
      let properties = ['condition', 'price'];
      for (let i = 0; i < properties.length; i++) {
        if (!listing.hasOwnProperty(properties[i])) {
          missingProperties.push(properties[i]);
        }
      }
    }
    return missingProperties;
  }

  private getAllActiveListings(networkRequest : NetworkRequest) : Observable<Response> {
    console.log(networkRequest.getHttpMethod(), networkRequest.getUrl());
    let source : Subject<Response> = new Subject<Response>();
    let observable : Observable<Response> = source.asObservable();
    // console.log(this.listingReposetory);
    let ids : number[] = [];
    for (let i = 0; i < this.listingReposetory.length; i++) {
      if (this.listingReposetory[i].active) {
        ids.push(this.listingReposetory[i].id);
      }
    }
    let options : ResponseOptions = this.baseResponseOptions();
    options.body = {
      ids: ids
    };
    options.status = 200;
    let response : Response = new Response(options);
    setTimeout(() => {
      source.next(response);
    }, (Math.random() * 1000));
    return observable;
  }

  private getAllInactiveListings(networkRequest : NetworkRequest) : Observable<Response> {
    console.log(networkRequest.getHttpMethod(), networkRequest.getUrl());
    let source : Subject<Response> = new Subject<Response>();
    let observable : Observable<Response> = source.asObservable();
    let ids : number[] = [];
    for (let i = 0; i < this.listingReposetory.length; i++) {
      if (!this.listingReposetory[i].active) {
        ids.push(this.listingReposetory[i].id);
      }
    }
    let options : ResponseOptions = this.baseResponseOptions();
    options.body = {
      ids: ids
    };
    options.status = 200;
    let response : Response = new Response(options);
    setTimeout(() => {
      source.next(response);
    }, (Math.random() * 1000));
    return observable;
  }

  private getListing(networkRequest : NetworkRequest) : Observable<Response> {
    console.log(networkRequest.getHttpMethod(), networkRequest.getUrl());
    let source : Subject<Response> = new Subject<Response>();
    let observable : Observable<Response> = source.asObservable();
    let parameter : string = networkRequest.getUrl().split('/')[4];
    let id : number = parseInt(parameter);
    let options : ResponseOptions = this.baseResponseOptions();
    if (id && id > 0 && id <= this.listingReposetory.length) {
      options.status = 200;
      options.body = this.listingReposetory[id - 1];
      // console.log(options.body)
    } else {
      options.body = {
        status: 'NOT OK',
        message: 'forbidden'
      }
      options.status = 403;
    }
    let response : Response = new Response(options);
    setTimeout(() => {
      source.next(response);
    }, (Math.random() * 1000));
    return observable;
  }

  private editListing(networkRequest : NetworkRequest) : Observable<Response> {
    console.log(networkRequest.getHttpMethod(), networkRequest.getUrl());
    let source : Subject<Response> = new Subject<Response>();
    let observable : Observable<Response> = source.asObservable();
    let parameter : string = networkRequest.getUrl().split('/')[4];
    let id : number = parseInt(parameter);
    let options : ResponseOptions = this.baseResponseOptions();
    if (id && id > 0 && id <= this.listingReposetory.length) {
      let body : any = networkRequest.getBody();
      body.id = id;
      this.listingReposetory[id] = body;
      options.status = 200;
      options.body = {
        status: 'OK'
      };
    } else {
      options.body = {
        status: 'NOT OK',
        message: 'forbidden'
      };
      options.status = 403;
    }
    let response : Response = new Response(options);
    setTimeout(() => {
      source.next(response);
    }, (Math.random() * 1000));
    return observable;
  }

  private deleteListing(networkRequest : NetworkRequest) : Observable<Response> {
    console.log(networkRequest.getHttpMethod(), networkRequest.getUrl());
    let source : Subject<Response> = new Subject<Response>();
    let observable : Observable<Response> = source.asObservable();
    let parameter : string = networkRequest.getUrl().split('/')[5];
    let id : number = parseInt(parameter);
    // console.log(parameter, id)
    let options : ResponseOptions = this.baseResponseOptions();
    if (id && id > 0 && id <= this.listingReposetory.length) {
      this.listingReposetory.splice(id - 1, 1);
      options.status = 200;
      options.body = {
        message: 'OK'
      };
    } else {
      options.body = {
        status: 'NOT OK',
        message: 'forbidden'
      };
      options.status = 403;
    }
    let response : Response = new Response(options);
    setTimeout(() => {
      source.next(response);
    }, (Math.random() * 1000));
    return observable;
  }

  private listingMainImageUpload(networkRequest : NetworkRequest) : Observable<Response> {
    console.log(networkRequest.getHttpMethod(), networkRequest.getUrl());
    let source : Subject<Response> = new Subject<Response>();
    let observable : Observable<Response> = source.asObservable();
    let parameter : string = networkRequest.getUrl().split('/')[6];
    let id : number = parseInt(parameter);
    let options : ResponseOptions = this.baseResponseOptions();
    if (id && id > 0 && id <= this.listingReposetory.length) {
      // let file : File = this.byteToFile(networkRequest.getBody());
      let file : File = networkRequest.getBody();
      // console.log(file, 'file');
      // URL.createObjectURL(file);
      // this.listingReposetory[id - 1].mainImage = URL.createObjectURL(file);
      this.listingReposetory[id - 1].mainImage = 'assets/images/bit-ka-logo.png';
      console.log(this.listingReposetory[id - 1].mainImage);
      options.status = 201;
      options.body = {
        message: 'OK'
      }
    } else {
      options.status = 403;
      options.body = {
        message: 'NOT OK'
      };
    }
    let response : Response = new Response(options);
    setTimeout(() => {
      source.next(response);
    }, (Math.random() * 1000));
    return observable;
  }

  private byteToFile(byteArray : Uint8Array[]) : File {
    let mime : string;
    const b0 : any = byteArray[0];
    const b1 : any = byteArray[1];
    const b2 : any = byteArray[2];
    const b3 : any = byteArray[3];
    if (b0 == 0x89 && b1 == 0x50 && b2 == 0x4E && b3 == 0x47)
      mime = 'image/png';
    else if (b0 == 0xff && b1 == 0xd8)
      mime = 'image/jpeg';
    else if (b0 == 0x47 && b1 == 0x49 && b2 == 0x46)
      mime = 'image/gif';
    else
      return null;
      console.log('byteToFile', mime);
    let file : File = new File(byteArray, (Math.random()*1000) +'.jpg', {
      type: mime
    });
    return file;
  }

  // private ByteArrayToImage(byteArray : Uint8Array) : HTMLImageElement {
  //
  // }

}
