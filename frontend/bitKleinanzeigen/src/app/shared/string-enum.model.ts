// IDEA: https://basarat.gitbooks.io/typescript/docs/types/literal-types.html

/**Creates a string enum out of the argument array.*/
export function stringToEnum<T extends string>(o: Array<T>): {[K in T]: K} {
  return o.reduce((res, key) => {
    res[key] = key;
    return res;
  }, Object.create(null));
}
