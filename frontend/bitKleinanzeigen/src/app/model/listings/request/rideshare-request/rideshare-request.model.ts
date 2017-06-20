import { Request } from '../request.model';

export class RideShareRequest extends Request {
  fromLocation : string;
  toLocation : string;
  travelDateAndTime : number;
}
