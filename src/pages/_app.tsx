import '@/styles/globals.css';

import type { AppProps } from 'next/app';
import { Provider } from 'jotai';

import GlobalContext from '@/lib/context/global.context';
import useStoreRef from '@/lib/jotai/use-store-ref.hook';

export default function App({ Component, pageProps }: AppProps) {
  // get from useStoreRef() our jotai store and api
  const {
    refs: { storeRef },
    api,
  } = useStoreRef(pageProps.preloadedState);

  // inject provider with store and our global context with the api
  return (
    <Provider store={storeRef.current}>
      <GlobalContext.Provider value={api}>
        <Component {...pageProps} />
      </GlobalContext.Provider>
    </Provider>
  );
}
