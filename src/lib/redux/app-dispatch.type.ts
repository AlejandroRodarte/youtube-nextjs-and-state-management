import { Store } from './store.type';

// type safety for useAppDispatch() hook from 'react-redux'
export type AppDispatch = Store['instance']['dispatch'];
