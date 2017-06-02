import { Request } from '../request.model';

export class BorrowRequest extends Request {
  mainImage : string;
  borrowFromDate : Date;
  borrowToDate : Date;
}
