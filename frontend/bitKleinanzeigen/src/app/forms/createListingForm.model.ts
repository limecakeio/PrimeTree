/*import { FormControl, FormGroup, Validators } from '@angular/forms';

export class CreateListingFormControl extends FormControl {
  label: string;
  modelProperty: string;
  constructor(label:string, property:string, value: any, validator: any) {
    super(value, validator);
    this.label = label;
    this.modelProperty = property;
  }
}

export class CreateListingFormGroup extends FormGroup {
  _submited : any;
  constructor() {
    super({
      title: new CreateListingFormControl("Title", "title", "", Validators.required),
      description: new CreateListingFormControl("Description", "description", "",
      Validators.compose([Validators.required,
      Validators.pattern("^[A-Za-z ]+$"),
      Validators.minLength(3),
      Validators.maxLength(10)])),
      price: new CreateListingFormControl("price", "price", "",
      Validators.compose([Validators.required,
        Validators.pattern("^[0-9\.]+$")]))
    });
  }

  get productControls(): CreateListingFormControl[] {
    return Object.keys(this.controls)
    .map(k => this.controls[k] as CreateListingFormControl);
  }
}
*/
