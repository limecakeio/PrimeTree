"use strict";
var testing_1 = require("@angular/core/testing");
var common_1 = require("@angular/common");
var forms_1 = require("@angular/forms");
var date_component_1 = require("../../../app/form/elements/date/date.component");
var form_context_service_1 = require("../../../app/form/form-context.service");
describe('DateFormComponent', function () {
    var fixture;
    var component;
    beforeEach(testing_1.async(function () {
        testing_1.TestBed.configureTestingModule({
            declarations: [date_component_1.DateFormComponent],
            imports: [
                common_1.CommonModule,
                forms_1.FormsModule,
                forms_1.ReactiveFormsModule
            ],
            providers: [
                form_context_service_1.FormContextService
            ]
        });
        testing_1.TestBed.compileComponents().then(function () {
            fixture = testing_1.TestBed.createComponent(date_component_1.DateFormComponent);
            component = fixture.componentInstance;
        });
    }));
    it('is defined', testing_1.async(function () {
        expect(component).toBeDefined();
    }));
});
//# sourceMappingURL=date.component.spec.js.map