var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Listing = (function () {
    function Listing() {
        this.title = '';
        this.description = '';
        this.active = true;
        this.location = '';
    }
    return Listing;
}());
export { Listing };
var Offering = (function (_super) {
    __extends(Offering, _super);
    function Offering() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Offering;
}(Listing));
export { Offering };
var SellItem = (function (_super) {
    __extends(SellItem, _super);
    function SellItem() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.pictures = [];
        return _this;
    }
    return SellItem;
}(Offering));
export { SellItem };
//# sourceMappingURL=listing.model.js.map