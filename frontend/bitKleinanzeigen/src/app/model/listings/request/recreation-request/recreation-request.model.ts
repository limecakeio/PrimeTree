import { Request } from '../request.model';
import { Category } from './category.model';

export abstract class RecreationRequest {
  categories : Category[];
  mainImage : string;
  location : string;
}
