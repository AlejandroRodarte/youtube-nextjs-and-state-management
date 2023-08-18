import { DeepPartial } from '../types/deep-partial.type';

// (1) take a full object and patch it with a deeply-optional patcher object
// (2) note: this overrides array values in case the patcher object includes it
const patchObject = <T extends object>(
  original: T,
  patch: DeepPartial<T>
): T => {
  for (const key in original) {
    // get original (always defined) and patched (may be undefined) values
    const originalValue = original[key];
    const patchValue = patch[key];

    // there is something to patch
    if (originalValue && patchValue) {
      // it's an object: go deeper
      if (
        typeof originalValue === 'object' &&
        originalValue.constructor === Object
      )
        patchObject(originalValue, patchValue);
      // its a primitive: assign...
      else original[key] = patchValue as typeof originalValue;
    }
  }
  return original;
};

export default patchObject;
