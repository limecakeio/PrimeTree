import { stringToEnum } from '../../../../shared/string-enum.model';

export const Category = stringToEnum(['Sport', 'Social', 'Outdoors', 'Events']);

export type Category = keyof typeof Category;
