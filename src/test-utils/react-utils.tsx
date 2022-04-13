import { render, RenderResult } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { rootReducer, RootState } from '../store';

export type renderProps = {
  store?: Partial<RootState>;
  component: JSX.Element;
};

export type result = {
  component: RenderResult;
  store: ReturnType<typeof createStore>;
};

const customRender = ({ component, store }: renderProps): result => {
  const newStore = createStore(store);

  const wrapper: React.FC<{}> = ({ children }) => {
    return <Provider store={newStore}>{children}</Provider>;
  };

  const renderedComponent = render(component, { wrapper });

  return {
    component: renderedComponent,
    store: newStore,
  };
};

export const createStore = (baseState?: Partial<RootState>) => configureStore({ reducer: rootReducer, preloadedState: baseState as any });

// re-export everything
export * from '@testing-library/react';

// override render method
export { customRender as render };
