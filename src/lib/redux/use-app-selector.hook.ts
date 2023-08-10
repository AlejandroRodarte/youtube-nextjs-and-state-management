import { TypedUseSelectorHook, useSelector } from 'react-redux';

import { RootState } from './root-state.type';

// helper hook to add types to useSelector()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
