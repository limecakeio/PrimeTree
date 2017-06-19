import { Request } from '../request.model';

export class BorrowRequest extends Request {
  mainImage : string;
  borrowFromDate : number;
  borrowToDate : number;
}
