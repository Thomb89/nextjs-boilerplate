import { ApolloCache } from '@apollo/client';
import { MockedProvider, MockedResponse } from '@apollo/client/testing';
import { render, RenderResult } from '@testing-library/react';

export type renderProps = {
  apolloMocks?: MockedResponse[];
  apolloCache?: ApolloCache<{}>;
  component: JSX.Element;
};

const customRender = ({ component, apolloMocks, apolloCache }: renderProps): RenderResult => {
  const wrapper: React.FC<{}> = ({ children }) => {
    return (
      <MockedProvider
        mocks={apolloMocks}
        cache={apolloCache}
        addTypename={false}
        defaultOptions={{ watchQuery: { fetchPolicy: 'no-cache' }, query: { fetchPolicy: 'no-cache' } }}>
        {children}
      </MockedProvider>
    );
  };

  const renderedComponent = render(component, { wrapper });

  return renderedComponent;
};

// re-export everything
export * from '@testing-library/react';

// override render method
export { customRender as render };
