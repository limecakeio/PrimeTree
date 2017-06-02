import { Offer } from '../offer.model';
import { Condition } from '../../listing/condition.model';

export class SaleOffer extends Offer {
  price : string;
  mainImage : string;
  imageGallery : string[];
  condition : Condition;
}
