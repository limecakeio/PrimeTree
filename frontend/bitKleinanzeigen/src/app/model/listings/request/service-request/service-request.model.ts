import { Request } from '../request.model';

export class ServiceRequest extends Request {

  public price : number;

  public mainImage : string;

  public imageGallery : string[];

}
