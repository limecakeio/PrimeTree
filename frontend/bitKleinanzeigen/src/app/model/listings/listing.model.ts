export enum Location {
  HD, MA
}

export interface Listing {
  createDate : Date;
  creator : string;
  description : string;
  expiryDate : Date;
  location : Location;
  title : string;
  id: number;
  mainImage : string;
}

export class Offering implements Listing {
  createDate : Date;
  creator : string;
  description : string;
  expiryDate : Date;
  location : Location;
  title : string;
  id: number;
  mainImage : string;
}
