import pick from 'lodash.pick';
import isMatch from 'lodash.ismatch';
import uniqWith from 'lodash.uniqwith';

export function removeDuplicatedObject<T>(
  objects: T[],
  comparedAttributes: (keyof T)[]
) {
  return uniqWith(objects, function (a, b) {
    return isMatch(a as object, pick(b, comparedAttributes));
  });
}
