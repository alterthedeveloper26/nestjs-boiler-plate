import { pick, isMatch, uniqWith } from 'lodash';

export function removeDuplicatedObject<T>(
  objects: T[],
  comparedAttributes: (keyof T)[]
) {
  return uniqWith(objects, function (a, b) {
    return isMatch(a as object, pick(b, comparedAttributes));
  });
}
