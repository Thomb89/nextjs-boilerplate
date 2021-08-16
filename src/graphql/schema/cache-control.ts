import { gql } from 'apollo-server-micro';

export const cacheControlDefs = gql`
  enum CacheControlScope {
    PUBLIC
    PRIVATE
  }

  directive @cacheControl(maxAge: Int, scope: CacheControlScope, inheritMaxAge: Boolean) on FIELD_DEFINITION | OBJECT | INTERFACE | UNION
`;
