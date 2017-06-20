"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(require("./network.module"));
__export(require("./network.request"));
__export(require("./network.service"));
__export(require("./rest-network.service"));
var http_1 = require("@angular/http");
exports.RequestMethod = http_1.RequestMethod;
exports.Response = http_1.Response;
//# sourceMappingURL=network.js.map