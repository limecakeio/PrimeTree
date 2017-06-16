import { Component } from '@angular/core';

import { DetailViewService } from '../detail.service';

import { Category } from '../../../model/listings/request/recreation-request/category.model';

interface CategoryOption {
  displayText : string;
  value : string;
}

@Component({
  selector: 'view-detail-category',
  templateUrl: './category.component.html',
  styleUrls: [ './category.component.css' ]
})
export class CategoryViewComponent {

  private categoryOptions : CategoryOption[] = [
    {
      displayText: 'Sport',
      value: Category.Sport
    }, {
      displayText: 'Sozial',
      value: Category.Social
    }, {
      displayText: 'Outdoors',
      value: Category.Outdoors
    }, {
      displayText: 'Event',
      value: Category.Events
    }
  ];

  public isDataAvailable : boolean = false;

  public model : any;

  constructor(
    private detailViewService : DetailViewService
  ) {
    this.detailViewService.getModel().subscribe((model : any) => {
      this.model = model;
      this.isDataAvailable = true;
    });
  }

  public getCategoryDisplayTextFromCategory(category : Category) : string {
    this.categoryOptions.forEach((categoryOption : CategoryOption) => {
      if (categoryOption.value === category) {
        return categoryOption.displayText;
      }
    })
    return null;
  }


}
