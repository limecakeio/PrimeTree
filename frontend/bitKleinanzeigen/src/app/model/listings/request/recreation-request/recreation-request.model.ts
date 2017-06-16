import { Request } from '../request.model';
import { Category } from './category.model';
import { Reoccurence } from './reoccurence.model';

export class RecreationRequest extends Request {
  categories : Category[];
  mainImage : string;
  activityLocation : string;
  startDateAndTime : number;
  endDateAndTime : number;
  reoccurence: Reoccurence;
}
