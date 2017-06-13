import { NetworkRequest } from '../../app/network/network.request';

describe('NetworkRequest', () => {

  it('should create a valid url with multiple queries', () => {
    const request : NetworkRequest = new NetworkRequest();
    request.
    setProtocol('http');
    request
    .setHostname('example.com')
    .setPort(8080)
    .addPath('main')
    request.addQuery('key1', 'value1');
    request.addQuery('key2', 'value2');
    expect(request.getUrl()).toBe('http://example.com:8080/main?key1=value1&key2=value2');
  })

  it('should create a valid url with a query containing multiple values', () => {
    const request : NetworkRequest = new NetworkRequest();
    request
    .setProtocol('http')
    .setHostname('example.com')
    .setPort(8080)
    .addPath('main')
    .appendQuery('key1', 'value1')
    .appendQuery('key1', 'value2');
    expect(request.getUrl()).toBe('http://example.com:8080/main?key1=value1,value2');
  })

  it('should override former queries and create a valid url', () => {
    const request : NetworkRequest = new NetworkRequest();
    request.
    setProtocol('http');
    request
    .setHostname('example.com')
    .setPort(8080)
    .addPath('main')
    request.addQuery('key1', 'value1');
    request.addQuery('key1', 'value2');
    expect(request.getUrl()).toBe('http://example.com:8080/main?key1=value2');
  })

})
