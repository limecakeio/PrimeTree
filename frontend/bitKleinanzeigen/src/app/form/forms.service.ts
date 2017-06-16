import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

/**Deprecated, don't use this class. */
@Injectable()
/**
 * This service creates a shared context among one FormComponent and multiple Elements.
 */
export class FormService {

  /** Deprecated
   * Reference of a FromGroup. Elements add their FormElements on this object.
   * Connect this object with an implementation
   */
  public form : FormGroup;

  /** Deprecated
   * Reference for an empty object without any properties.
   * The elements will add their properties on this object.
   * This object will be automtically send as a body of a request.
   * If you want to send additional properties to the FormComponent, you may want to use the data property.
   */
  public model : any;

  /** Deprecated
   * Reference for an empty object without any properties.
   * Elements can add additional properties on this object.
   * The FormGroup object will determine which actions to take after inspecting this object.
   */
  public data : any;

}
