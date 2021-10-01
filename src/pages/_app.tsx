import 'tailwindcss/tailwind.css';

import { AppProps } from 'next/app';
import { MenuBar } from '../components';
import { ApolloProvider } from '@apollo/client';
import { getApolloClient } from '../graphql/client';

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <ApolloProvider client={getApolloClient()}>
      <MenuBar />
      <div className="pt-16 md:px-6 lg:px-16 xl:px-24 md:py-24 flex justify-center">
        <div className="w-full max-w-6xl">
          <Component {...pageProps} />
        </div>
      </div>
    </ApolloProvider>
  );
};

export default App;
