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

**1. Pages + Components**
  - create your pages and components
  - for global state us redux-toolkit
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

