import { BehaviorSubject } from 'rxjs';
import { useObservableState } from 'observable-hooks';

// custom hook to get behavior subject value
const useBehaviorSubjectValue = <T>(subject$: BehaviorSubject<T>): T => {
  const value = useObservableState(subject$);
  return value;
};

export default useBehaviorSubjectValue;
