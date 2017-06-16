import { stringToEnum } from '../../../../shared/string-enum.model';

export const Reoccurence = stringToEnum(['OneOf', 'Daily', 'Weekly', 'Fortnightly', 'Monthly', 'Randomly']);

export type Reoccurence = keyof typeof Reoccurence;
