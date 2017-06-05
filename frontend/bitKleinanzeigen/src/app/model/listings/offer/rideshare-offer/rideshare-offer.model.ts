import { Offer } from '../offer.model';

export class RideShareOffer {
  fromLocation : string;
  journeyStops : string[];
  toLocation : string;
  availableSeats : number;
  travelDateAndTime : Date;
}
