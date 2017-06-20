import { Offer } from '../offer.model';

export class RideShareOffer extends Offer {
  fromLocation : string;
  journeyStops : string[];
  toLocation : string;
  availableSeats : number;
  travelDateAndTime : number;
}
