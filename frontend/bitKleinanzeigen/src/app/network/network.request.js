var NetworkRequest = (function () {
    function NetworkRequest() {
        this.headers = [];
        this.hostname = 'localhost';
        this.hasPort = false;
        this.query = '';
        this.hasQuery = false;
        this.path = '';
        this.hasPath = false;
        this.body = null;
    }
    NetworkRequest.prototype.setHttpMethod = function (verb) {
        this.verb = verb;
        return this;
    };
    NetworkRequest.prototype.setHostname = function (host) {
        this.hostname = host;
        return this;
    };
    NetworkRequest.prototype.setPort = function (port) {
        this.hasPort = true;
        this.port = port;
        return this;
    };
    NetworkRequest.prototype.addPath = function (path) {
        if (!this.hasPath) {
            this.hasPath = true;
            this.path += path;
        }
        else {
            this.path += '/' + path;
        }
        return this;
    };
    NetworkRequest.prototype.addQuery = function (key, value) {
        if (!this.hasQuery) {
            this.hasQuery = true;
            this.query += key + '=' + value;
        }
        else {
            this.query += '&' + key + '=' + value;
        }
        return this;
    };
    NetworkRequest.prototype.setBody = function (body) {
        this.body = body;
        return this;
    };
    NetworkRequest.prototype.addHeader = function (key, value) {
        this.headers.push({
            key: key,
            value: value
        });
        return this;
    };
    NetworkRequest.prototype.getUrl = function () {
        var url = 'http://';
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
    };
    NetworkRequest.prototype.getHeaders = function () {
        return this.headers;
    };
    NetworkRequest.prototype.hasHeaders = function () {
        return this.headers.length > 0;
    };
    NetworkRequest.prototype.getBody = function () {
        return this.body;
    };
    NetworkRequest.prototype.getHttpMethod = function () {
        return this.verb;
    };
    return NetworkRequest;
}());
export { NetworkRequest };
//# sourceMappingURL=network.request.js.map