import { useCallback, useState } from 'react';

type Args<T> = { initialValue: T[] };
type Returns<T> = {
  arr: T[];
  add: (item: T) => void;
  remove: <I>(
    item: T,
    indexFn: (item: T) => I,
    compare: (a: I, b: I) => boolean
  ) => void;
};

export default function useArray<T>(
  args: Args<T> = { initialValue: [] }
): Returns<T> {
  const [arr, setArr] = useState<T[]>(args.initialValue);

  // add item to end of array
  const add = useCallback(
    (item: T): void => {
      setArr((oldItems) => [...oldItems, item]);
    },
    [setArr]
  );

  // remove item by comparing indexes
  const remove = useCallback(
    <I>(
      item: T,
      indexFn: (item: T) => I,
      compare: (a: I, b: I) => boolean
    ): void => {
      const itemToDeleteIndex = indexFn(item);
      setArr((oldItems) => {
        const filteredItems = oldItems.filter((currentItem) => {
          const currentItemIndex = indexFn(currentItem);
          const areIndexesEqual = compare(itemToDeleteIndex, currentItemIndex);
          return !areIndexesEqual;
        });
        return filteredItems;
      });
    },
    []
  );

  return { arr, add, remove };
}
