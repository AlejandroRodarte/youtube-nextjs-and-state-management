import { useCallback, useMemo } from 'react';

import useArray from './use-array.hook';

type Args = { initialClasses: string[] };
type Returns = {
  classes: string;
  add: (cssClass: string) => void;
  remove: (item: string) => void;
};

// manage CSS classes with useArray() hook
export default function useCssClasses(
  args: Args = { initialClasses: [] }
): Returns {
  const {
    arr: classesArr,
    add,
    remove: removeFromArr,
  } = useArray<string>({
    initialValue: args.initialClasses,
  });
  const classes = useMemo(() => classesArr.join(' '), [classesArr]);

  const remove = useCallback(
    (item: string) =>
      removeFromArr(
        item,
        (item) => item,
        (a, b) => a === b
      ),
    [removeFromArr]
  );

  return { classes, add, remove };
}
