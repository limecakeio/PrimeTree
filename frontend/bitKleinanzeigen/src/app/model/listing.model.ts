

export class Listing {
  title : string = '';
  description : string = '';
  lifetimeInDays : number;
  active : boolean = true;
  location : string = '';
}

export class Offering extends Listing {

}

export class SellItem extends Offering {
  condition : string;
  pictures : string[] = [];
  price : number;
}
