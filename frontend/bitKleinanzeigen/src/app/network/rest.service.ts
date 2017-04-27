import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Listing } from '../model/listing.model';
import 'rxjs/add/operator/map';

@Injectable()
export class RESTService {

  /**
   * the base server url
   */
  private baseServerURL : string = 'http://localhost';

  constructor(private http: Http) {

  }

  /**
   * creates a listing on the server
   * @param {string} type - The type of the listing
   * @param {string} listing - The listing object which shoud be created
   */
  postListing(listingType : string, listing : Listing) : Observable<any> {
      return this.http.post(this.baseServerURL + '/listings', {
        type: listingType,
        listing: JSON.stringify(listing)
      }).map(response => response.json());
  }

  /**
   * get all listings from the server
   */
  getListings() : Observable<Listing[]> {
    return this.http.get(this.baseServerURL + '/listings').map(response => response.json());
  }

  /**
   * get one listing from the Server
   * @param {number} id - an indentifier for the wanted listing
   */
  getListing(id : number) : Observable<Listing> {
    return this.http.get(this.baseServerURL + '/listings?id=' + id).map(response => response.json());
  }

  setBaseUrl(baseUrl : string) {
    this.baseServerURL = baseUrl;
  }

  setPort(port : number) {
    this.baseServerURL += ':' + port;
  }

  get(url: string) : Observable<Response> {
    console.log(this.baseServerURL + url);
    return this.http.get(this.baseServerURL + url);
  }

  post(url: string, body?: any) : Observable<Response> {
    console.log('POST:');
    console.log('URL: ' + this.baseServerURL + url);
    console.log('Body:');
    console.log(body);
    return this.http.post(this.baseServerURL + url, body);
  }



}
