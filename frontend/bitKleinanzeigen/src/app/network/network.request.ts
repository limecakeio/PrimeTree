import { RequestMethod } from '@angular/http';

export class NetworkRequest {

  private headers : any[] = [];

  private hostname : string = 'localhost';

  private port : number;
  private hasPort : boolean = false;

  private query : string = '';
  private hasQuery : boolean = false;

  private path : string = '';
  private hasPath : boolean = false;

  private body : any = null;

  private verb : RequestMethod;

  setHttpMethod(verb : RequestMethod) : NetworkRequest {
    this.verb = verb;
    return this;
  }

  setHostname(host : string) : NetworkRequest {
    this.hostname = host;
    return this;
  }

  setPort(port : number) : NetworkRequest {
    this.hasPort = true;
    this.port = port;
    return this;
  }

  addPath(path : string) : NetworkRequest {
    if (!this.hasPath) {
      this.hasPath = true;
      this.path += path;
    } else {
      this.path += '/' + path;
    }
    return this;
  }

  addQuery(key : string, value : string) : NetworkRequest {
    if (!this.hasQuery) {
      this.hasQuery = true;
      this.query += key + '=' + value;
    } else {
      this.query += '&' + key + '=' + value;
    }
    return this;
  }

  setBody(body : any) : NetworkRequest {
    this.body = body;
    return this;
  }

  addHeader(key : string, value : string) : NetworkRequest {
    this.headers.push({
      key: key,
      value: value
    });
    return this;
  }

  getUrl() : string {
    let url : string = 'http://';
    url += this.hostname;
    if (this.hasPort) {
      url += ':' + this.port;
    }
    if (this.hasPath) {
      url += '/' + this.path;
    }
    if (this.hasQuery) {
      url += '?' + this.query;
    }
    return url;
  }

  getHeaders() : any[] {
    return this.headers;
  }

  hasHeaders() : boolean {
    return this.headers.length > 0;
  }

  getBody() : any {
    return this.body;
  }

  getJSONBody() : string {
    return JSON.stringify(this.body);
  }

  getHttpMethod() : RequestMethod {
    return this.verb;
  }

}
