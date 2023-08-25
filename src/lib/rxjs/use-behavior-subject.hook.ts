import { BehaviorSubject } from 'rxjs';

import useBehaviorSubjectValue from './use-behavior-subject-value.hook';
import useSetBehaviorSubject from './use-set-behavior-subject.hook';

type Returns<T> = [T, (update: T | ((prev: T) => T)) => void];

// custom hook to get two things: (1) behavior subject value and (2) updater function
// to pass the next value to the behavior subject
const useBehaviorSubject = <T>(subject$: BehaviorSubject<T>): Returns<T> => {
  const value = useBehaviorSubjectValue(subject$);
  const updater = useSetBehaviorSubject(subject$);
  return [value, updater];
};

export default useBehaviorSubject;
