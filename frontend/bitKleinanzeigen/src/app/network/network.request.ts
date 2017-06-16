import { RequestMethod } from '@angular/http';

/** Describs an normal http header.*/
export interface NetworkHeader {
  field : string;
  value : string;
}

export interface NetworkQuery {
  key : string;
  values : string[]
}

export class NetworkRequest {

  private protocol : string = 'http://';

  private headers : NetworkHeader[] = [];
  private hasHeaders : boolean = false;

  private hostname : string = 'localhost';

  private port : number;
  private hasPort : boolean = false;

  private queries : NetworkQuery[] = [];
  private hasQuery : boolean = false;

  private paths : string[] = [];
  private hasPath : boolean = false;

  private body : any = null;

  private method : RequestMethod;

  /**
   * Sets the method in accordance of the argument.
   */
  setHttpMethod(method : RequestMethod) : NetworkRequest {
    this.method = method;
    return this;
  }

  /**Sets the hostname or ip for an request. Example setHostname('localhost') */
  setHostname(host : string) : NetworkRequest {
    this.hostname = host;
    return this;
  }

  setPort(port : number) : NetworkRequest {
    this.hasPort = true;
    this.port = port;
    return this;
  }

  /**Adds a path to the url. Slashes before and after a path are automatically added. Example addPath('book') */
  addPath(path : string) : NetworkRequest {
    if (!this.hasPath) {
      this.hasPath = true;
    }
    this.paths.push(path);
    return this;
  }

  /**
   * Adds a query to the request.
   * Overwrites a former query with the same key.
   */
  addQuery(key : string, value : string) : NetworkRequest {
    if (!this.hasQuery) {
      this.hasQuery = true;
    }
    let found : boolean = false;
    for (let i = 0; i < this.queries.length && !found; i++) {
      if (this.queries[i].key === key) {
        this.queries[i].values[0] = value;
        found = true;
      }
    }
    if (!found) {
      this.queries.push({
        key: key,
        values: [value]
      })
    }
    return this;
  }

  /**Sets a specific object as the body of this request. */
  setBody(body : any) : NetworkRequest {
    this.body = body;
    return this;
  }

  /**Sets the protocol for this request. It is not necessary to add ://. Example setProtocol('https') */
  setProtocol(protocol : string) : NetworkRequest {
    this.protocol = protocol + '://';
    return this;
  }

  /**Adds a new header for the request. Example addHeader('Content-Type', 'application/json') */
  addHeader(field : string, value : string) : NetworkRequest {
    this.headers.push({
      field: field,
      value : value
    })
    return this;
  }

  /**
   * Appends the value to an existing query or creates a new one if no appropriate key exists.
   */
  appendQuery(key : string, value : string) : NetworkRequest {
    let found : boolean = false;
    for (let i = 0; i < this.queries.length && !found; i++) {
      if (this.queries[i].key === key) {
        found = true;
        this.queries[i].values.push(value);
      }
    }
    if (!found) {
      this.queries.push({
        key: key,
        values: [value]
      });
    }
    return this;
  }

  /**Builds a new url from the former specified request parameters. */
  getUrl() : string {
    let url : string;
    url = this.protocol;
    url += this.hostname;
    if (this.hasPort) {
      url += ':' + this.port;
    }
    if (!this.hasPath && this.hasQuery) {
      url += '/';
    }
    this.paths.forEach((path : string) => {
      url += '/' + path;
    });
    if (this.queries.length > 0) {
      for (let i = 0; i < this.queries.length; i++) {
        url += ((i === 0) ? '?' : '&') + this.queries[i].key + '=' + this.queries[i].values.join(',');
      }
    }

    return url;
  }

  getQueries() : NetworkQuery[] {
    return this.queries;
  }

  getPaths() : string[] {
    return this.paths;
  }

  getHeaders() : NetworkHeader[] {
    return this.headers;
  }

  getBody() : any {
    return this.body;
  }

  getJSONBody() : string {
    return JSON.stringify(this.body);
  }

  getHttpMethod() : RequestMethod {
    return this.method;
  }

}
