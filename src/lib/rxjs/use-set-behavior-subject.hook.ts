import { useCallback } from 'react';
import { BehaviorSubject } from 'rxjs';

// utility hook to get updater function to pass next value to behavior subject
const useSetBehaviorSubject = <T>(
  sub$: BehaviorSubject<T>
): ((update: T | ((prev: T) => T)) => void) => {
  const updater = useCallback(
    (update: T | ((prev: T) => T)) => {
      sub$.next(update instanceof Function ? update(sub$.value) : update);
    },
    [sub$]
  );
  return updater;
};

export default useSetBehaviorSubject;
