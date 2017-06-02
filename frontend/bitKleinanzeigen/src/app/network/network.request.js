"use strict";
var NetworkRequest = (function () {
    function NetworkRequest() {
        this.protocol = 'http://';
        this.hasHeaders = false;
        this.hostname = 'localhost';
        this.hasPort = false;
        this.queries = [];
        this.hasQuery = false;
        this.paths = [];
        this.hasPath = false;
        this.body = null;
    }
    /**
     * Sets the method in accordance of the argument.
     */
    NetworkRequest.prototype.setHttpMethod = function (method) {
        this.method = method;
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
        }
        this.paths.push(path);
        return this;
    };
    /**
     * Adds a query to the request.
     * Overwrites a former query with the same key.
     */
    NetworkRequest.prototype.addQuery = function (key, value) {
        if (!this.hasQuery) {
            this.hasQuery = true;
        }
        var found = false;
        for (var i = 0; i < this.queries.length && !found; i++) {
            if (this.queries[i].key === key) {
                this.queries[i].values[0] = value;
                found = true;
            }
        }
        if (!found) {
            this.queries.push({
                key: key,
                values: [value]
            });
        }
        return this;
    };
    NetworkRequest.prototype.setBody = function (body) {
        this.body = body;
        return this;
    };
    NetworkRequest.prototype.setProtocol = function (protocol) {
        this.protocol = protocol + '//';
    };
    NetworkRequest.prototype.addHeader = function (field, value) {
        this.headers.push({
            field: field,
            value: value
        });
        return this;
    };
    /**
     * Appends the value to an existing query or creates a new one if no appropriate key exists.
     */
    NetworkRequest.prototype.appendQuery = function (key, value) {
        var found = false;
        for (var i = 0; i < this.queries.length && !found; i++) {
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
    };
    NetworkRequest.prototype.getUrl = function () {
        var url;
        url = this.protocol;
        url += this.hostname;
        if (this.hasPort) {
            url += ':' + this.port;
        }
        this.paths.forEach(function (path) {
            url += '/' + path;
        });
        this.queries.forEach(function (query) {
            url += '?' + query.key + '=' + query.values[0];
            for (var i = 1; i < query.values.length; i++) {
                url += ',' + query.values[i];
            }
        });
        return url;
    };
    NetworkRequest.prototype.getQueries = function () {
        return this.queries;
    };
    NetworkRequest.prototype.getPaths = function () {
        return this.paths;
    };
    NetworkRequest.prototype.getHeaders = function () {
        return this.headers;
    };
    NetworkRequest.prototype.headerCount = function () {
        return this.headers.length > 0;
    };
    NetworkRequest.prototype.getBody = function () {
        return this.body;
    };
    NetworkRequest.prototype.getJSONBody = function () {
        return JSON.stringify(this.body);
    };
    NetworkRequest.prototype.getHttpMethod = function () {
        return this.method;
    };
    return NetworkRequest;
}());
exports.NetworkRequest = NetworkRequest;
//# sourceMappingURL=network.request.js.map