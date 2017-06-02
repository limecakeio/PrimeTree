import { Comment } from './comment.model';

/**
 * defines a base class which contains all common properties shared by all Listing types
 */
export  class Listing {
  title : string;
  description : string;
  isActive : boolean;
  location : string;
  comments : Comment[];

  type: string;
  creator : string;
  createDate : Date;
  expiryDate : Date;
  id : number;
}
