import { stringToEnum } from '../../../shared/string-enum.model';

export const Condition = stringToEnum(['New', 'Used']);

export type Condition = keyof typeof Condition;
