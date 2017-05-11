"use strict";
var router_1 = require("@angular/router");
var sellitem_create_component_1 = require("./model/listings/form/create/sellitem-create.component");
var login_component_1 = require("./login/login.component");
var listing_component_1 = require("./model/listings/listing.component");
var canActivateUser_model_1 = require("./router/canActivateUser.model");
var routes = [{
        path: 'create/sellitem',
        component: sellitem_create_component_1.SellItemCreateFormComponent,
        canActivate: [canActivateUser_model_1.CanActivateUser]
    }, {
        path: 'home',
        component: listing_component_1.ListingComponent
    }, {
        path: '',
        component: login_component_1.LoginComponent
    }];
exports.routing = router_1.RouterModule.forRoot(routes);
//# sourceMappingURL=app.routing.js.map