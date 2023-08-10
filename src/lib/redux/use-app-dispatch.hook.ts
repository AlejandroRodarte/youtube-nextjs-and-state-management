import { useDispatch } from 'react-redux';

import { AppDispatch } from './app-dispatch.type';

// helper hook to add types to useDispatch()
export const useAppDispatch = () => useDispatch<AppDispatch>();
