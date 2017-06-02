import { RecreationRequest } from '../recreationrequest.model';
import { Reoccurence } from './reoocurence.model';

export class ReoccuringRecreationRequest {
  startDateAndTime : Date;
  endDateAndTime : Date;
  reoccurence : Reoccurence;
}
