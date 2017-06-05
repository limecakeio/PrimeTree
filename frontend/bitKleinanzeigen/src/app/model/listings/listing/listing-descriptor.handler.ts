import { Type } from '@angular/core';

import { ListingDescriptor } from './listing.descriptor';
import { ListingFactory } from './listing.factory';
import { ListingPreviewComponent } from './preview/listing-preview.component';
import { ListingComponent } from './detail/listing.component';
import { ListingCreateFormComponent } from './create/listing-create-form.component';

export class ListingDescriptorHandler {

  private listingsDescriptors : ListingDescriptor[] = [];

  private nullListingDescriptor : ListingDescriptor = new ListingDescriptor();

  public addListingDescriptor(listingsDescriptor : ListingDescriptor) : void {
    this.listingsDescriptors.push(listingsDescriptor);
  }

  /**Creates a new instance based on the type of the listing descriptor*/
  public addListingDescriptorTypeof(listingsDescriptorTypeoff : typeof ListingDescriptor) : void {
    this.addListingDescriptor(new listingsDescriptorTypeoff());
  }

/**Returns a listing factory which is used to create a detailed listing object*/
  public findListingFactoryFromListingType(listingType : string) : ListingFactory {
    return this.findListingDescriptorFromListingType(listingType).listingFactory();
  }

/**Returns the type */
  public findListingPreviewComponentTypeFromListingType(listingType : string) : Type<ListingPreviewComponent> {
    return this.findListingDescriptorFromListingType(listingType).listingPreviewComponentType();
  }

  public findListingCreateFormComponentTypeFromLisitingType(listingType : string) : Type<ListingCreateFormComponent> {
    return this.findListingDescriptorFromListingType(listingType).listingCreateForm();
  }

  /**Attempts to match and return a listingComponentType based on a listing type*/
  public getListingComponentTypeFromListingType(listingType : string) : Type<ListingComponent> {
    return this.findListingDescriptorFromListingType(listingType).getListingComponentTypeClassName();
  }

  /**
   * Returns a ListingDescriptor which type matches the argument listing type.
   * Returns the base lisiting descriptor if no matching descriptor is found.
   */
  private findListingDescriptorFromListingType(listingType : string) : ListingDescriptor {
    for (let i = 0; i < this.listingsDescriptors.length; i++) {
      if (this.listingsDescriptors[i].listingType() === listingType) {
        return this.listingsDescriptors[i];
      }
    }
    console.error('No matching listing descriptor found for: ' + listingType + '. Please add one in LisitingModule.')
    return this.nullListingDescriptor;
  }

  public getAllListingPreviewComponentTypes() : Type<ListingPreviewComponent>[] {
    let listingPreviewComponentTypes : Type<ListingPreviewComponent>[] = [];
    this.listingsDescriptors.forEach((listingsDescriptor : ListingDescriptor) => {
      listingPreviewComponentTypes.push(listingsDescriptor.listingPreviewComponentType());
    });
    return listingPreviewComponentTypes;
  }

  public getAllListingComponentTypes() : Type<ListingComponent>[] {
    let listingComponentTypes : Type<ListingComponent>[] = [];
    this.listingsDescriptors.forEach((listingsDescriptor : ListingDescriptor) => {
      listingComponentTypes.push(listingsDescriptor.getListingComponentTypeClassName());
    });
    return listingComponentTypes;
  }

  public getAllListingCreateFormComponentTypes() : Type<ListingCreateFormComponent>[] {
    let listingCreateFormComponentType : Type<ListingCreateFormComponent>[] = [];
    this.listingsDescriptors.forEach((listingsDescriptor : ListingDescriptor) => {
      listingCreateFormComponentType.push(listingsDescriptor.listingCreateForm());
    });
    return listingCreateFormComponentType;
  }

  public getAllComponentTypes() : Type<any>[] {
    let componentTypes : Type<any>[] = [];
    this.listingsDescriptors.forEach((listingDescriptor : ListingDescriptor) => {
      componentTypes.push(
        listingDescriptor.listingCreateForm(),
        listingDescriptor.listingPreviewComponentType(),
        listingDescriptor.getListingComponentTypeClassName()
      );
    });
    return componentTypes;
  }

}
