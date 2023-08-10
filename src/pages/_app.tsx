import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';

import { getStore } from '@/lib/redux/get-store.helper';

export default function App({ Component, pageProps }: AppProps) {
  // create store instance and initialize with a pre-populated root state object
  // that may have been populated by getStaticProps/getServerSideProps
  const store = getStore();
  return (
    <Provider store={store}>
      <Component {...pageProps} />;
    </Provider>
  );
}
