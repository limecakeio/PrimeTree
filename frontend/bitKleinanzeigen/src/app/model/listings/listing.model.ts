

export interface Listing {
  title : string;
  description : string;
  lifetimeInDays : number;
  active : boolean;
  image : string;
  imageObj : File;
  id: number;
  owner : string;
}

export class Offering implements Listing {
  title : string = '';
  description : string = '';
  lifetimeInDays : number = 0;
  active : boolean = true;
  image : string = '';
  imageObj : File;
  id: number;
  owner : string;
}
