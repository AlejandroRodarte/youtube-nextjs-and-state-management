import '@/styles/globals.css';

import { Provider } from 'react-redux';
import type { AppProps } from 'next/app';

import useStoreRef from '@/lib/redux/use-store-ref.hook';
import StoreContext from '@/lib/redux/store-context.context';

export default function App({ Component, pageProps }: AppProps) {
  // get store ref and api and pass it down to the related components
  const { refs, api } = useStoreRef(pageProps.preloadedState);
  return (
    <Provider store={refs.store.current.instance}>
      <StoreContext.Provider value={api}>
        <Component {...pageProps} />
      </StoreContext.Provider>
    </Provider>
  );
}
