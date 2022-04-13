import 'tailwindcss/tailwind.css';

import { AppProps } from 'next/app';
import { MenuBar } from '../components';
import { Provider } from 'react-redux';
import { getStore } from '../store';

export const store = getStore();

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <Provider store={store}>
      <MenuBar />
      <div className="pt-16 md:px-6 lg:px-16 xl:px-24 md:py-24 flex justify-center">
        <div className="w-full max-w-6xl">
          <Component {...pageProps} />
        </div>
      </div>
    </Provider>
  );
};

export default App;
