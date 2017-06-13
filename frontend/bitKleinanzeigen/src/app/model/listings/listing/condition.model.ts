// IDEA: https://basarat.gitbooks.io/typescript/docs/types/literal-types.html

/** Utility function to create a K:V from a list of strings */
function strEnum<T extends string>(o: Array<T>): {[K in T]: K} {
  return o.reduce((res, key) => {
    res[key] = key;
    return res;
  }, Object.create(null));
}

export const Condition = strEnum(['New', 'Used']);

export type Condition = keyof typeof Condition;

// export enum Condition {
//   NEW, USED
// }
