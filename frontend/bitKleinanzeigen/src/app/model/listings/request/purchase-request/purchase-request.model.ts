import { Request } from '../request.model';
import { Condition } from '../../listing/condition.model';

export class PurchaseRequest extends Request {
  condition : Condition;
  mainImage : string;
  imageGallery : string[];
}
