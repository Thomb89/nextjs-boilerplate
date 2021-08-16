import { mergeTypeDefs } from '@graphql-tools/merge';

import { typesDefs } from './schema/types';
import { mutationDefs } from './schema/mutation';
import { queryDefs } from './schema/query';
import { cacheControlDefs } from './schema/cache-control';

export const typeDefs = mergeTypeDefs([queryDefs, mutationDefs, typesDefs, cacheControlDefs]);
