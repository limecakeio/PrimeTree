"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var listing_model_1 = require("../listing.model");
var SellItem = (function (_super) {
    __extends(SellItem, _super);
    function SellItem() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.condition = '';
        _this.images = [];
        return _this;
    }
    return SellItem;
}(listing_model_1.Offering));
exports.SellItem = SellItem;
//# sourceMappingURL=sellitem.model.js.map