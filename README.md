# Next.js Boilerplate
this boilerplate includes thw following packages:
- [Jest](https://jestjs.io/) + [Testing Library](https://testing-library.com/) (testing)
- [apollo-server-micro + @apollo/client](https://www.apollographql.com/) (API)
- [next-auth](https://next-auth.js.org/) (Authentication API)
- [prisma + @prisma/client](https://www.prisma.io/) (Database / ORM)
- [graphql-code-generator](https://www.graphql-code-generator.com/docs/getting-started/index) (typesafe graphql resolvers / queries / mutations)
- [tailwindcss](https://tailwindcss.com/) + preconfiguration (CSS)
- [typescript](https://www.typescriptlang.org/)
- [headless-UI](https://headlessui.dev/) (Unstyled Components)
- [TippyJs](https://atomiks.github.io/tippyjs/) (Tooltips)
- [react-hook-form](https://react-hook-form.com/) (form state management)

## Setup your Project
**1. Database**
  - create your Database Schema in the **prisma/schema.prisma** file [(help can be found here)](https://www.prisma.io/docs/getting-started)
  - generate the prisma client with `npm exec prisma generate`  
  - you can create a seed file under [prisma/seed.ts](https://www.prisma.io/docs/guides/database/seed-database)

**2. GraphQL**
  - create your graphql schema (types / queries / mutations) under **src/graphql/schema**
  - create your fragments / queries / mutations for the client under **src/graphql/client/gql**
  - add type mappings from *graphql* to *@prisma/client* in the **codegen.yml** file [(look for help here)](https://www.graphql-code-generator.com/docs/plugins/typescript-resolvers#use-your-model-types-mappers)
  - generate typesafe graphql helpers with `npm run gql-generate`. This will create the file **src/graphql/generated.tsx**
  - create your Graphql-Resolvers under **src/graphql/resolvers/**
  ```typescript
  // query.ts

  import { QueryResolvers } from '../generated';

  export const QueryResolver: QueryResolvers = {
    resolver: async ({}, {}, {prisma, authorized}) => {}
  }
  ```
  ```typescript
  // type.ts
  /** 
   * type can be any GraphQL type e.g. User, Post, etc.
   * this example leverages prismas include mechanism
   * to add additional fields to the resolvers
  */
  import { TypeResolvers } from '../generated';
  import { Prisma } from '@prisma/client';

  const parent = Prisma.validator<Prisma.typeArgs>()({
    include: {
      table_1: true
    },
  });
  type parent = Prisma.typeGetPayload<typeof parent>;

  export const ServiceResolver: ServiceResolvers<Context, Partial<parent>> = {
    resolver: async ({ table_1 }, {}, { prisma }) => {}
  }
  ```

**3. Pages + Components**
  - create your pages and components
  - for forms, react-hook-form is preinstalled
  - TippyJs can be used for tooltips
  - headless-UI can be used for Dialogs, etc.
  - if you need to query the GraphQL API, just import your created query / mutation from src/graphql/generated.tsx


## How to use

Execute [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app) with [npm](https://docs.npmjs.com/cli/init) or [Yarn](https://yarnpkg.com/lang/en/docs/cli/create/) to bootstrap the example:

```bash
npx create-next-app --example https://github.com/Thomb89/nextjs-boilerplate
# or
yarn create next-app --example https://github.com/Thomb89/nextjs-boilerplate
```

