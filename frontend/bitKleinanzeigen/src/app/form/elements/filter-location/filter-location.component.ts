import {
  Component,
  OnChanges,
  Input,
  SimpleChanges
} from '@angular/core';

import { FormService } from '../../forms.service';


@Component({
  selector: 'filter-location',
  templateUrl: './filter-location.component.html',
  styleUrls: [ './filter-location.component.css' ]
})
export class LocationFilter  implements OnChanges {

  @Input() listItems : string[];

  @Input() filterPropertyName : string;

  @Input() mutuallyExclusive : boolean;

  @Input() selectAllEnabled : boolean;

  public model : any;

  public locations : string[] = [
    "Mannheim",
    "Heidelberg",
    "Köln",
    "Nürnberg",
    "München",
    "Zug"
  ];

  constructor(
    private formService : FormService
  ) {

  }

  public triggerFilter(location : string) : void {
    console.log(location);
  }

  ngOnChanges(simpleChanges : SimpleChanges) : void {

  }

}
