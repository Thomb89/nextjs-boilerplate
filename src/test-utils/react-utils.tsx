import { render, RenderResult } from '@testing-library/react';
import { Provider } from 'react-redux';
import { getStore } from '../store';

export type renderProps = {
  store?: ReturnType<typeof getStore>;
  component: JSX.Element;
};

export type result = {
  component: RenderResult;
  store: ReturnType<typeof getStore>;
};

const customRender = ({ component, store }: renderProps): result => {
  const newStore = store ?? getStore();

  const wrapper: React.FC<{}> = ({ children }) => {
    return <Provider store={newStore}>{children}</Provider>;
  };

  const renderedComponent = render(component, { wrapper });

  return {
    component: renderedComponent,
    store: newStore,
  };
};

// re-export everything
export * from '@testing-library/react';

// override render method
export { customRender as render };
