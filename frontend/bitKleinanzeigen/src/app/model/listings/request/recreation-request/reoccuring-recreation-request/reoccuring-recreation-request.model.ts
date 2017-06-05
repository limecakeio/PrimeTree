import { RecreationRequest } from '../recreation-request.model';
import { Reoccurence } from './reoocurence.model';

export class ReoccuringRecreationRequest {
  startDateAndTime : Date;
  endDateAndTime : Date;
  reoccurence : Reoccurence;
}
