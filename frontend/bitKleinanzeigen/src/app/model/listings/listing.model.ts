

export interface Listing {
  title : string;
  description : string;
  lifetimeInDays : number;
  active : boolean;
  image : string;
}

export class Offering implements Listing {
  title : string = '';
  description : string = '';
  lifetimeInDays : number = 0;
  active : boolean = true;
  image : string = '';
}
