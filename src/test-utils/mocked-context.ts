import { mockDeep, MockProxy } from 'jest-mock-extended';
import { PrismaClient } from '@prisma/client';
import { Context } from '../graphql/context';

export type { Context } from '../graphql/context';

type setReturnValueParams = {
  proxyFn: any;
  value: any;
};
export type MockedContext = Context & {
  prisma: MockProxy<PrismaClient>;
  setReturnValue: (options: setReturnValueParams) => void;
  setRejectValue: (options: setReturnValueParams) => void;
};

export const createMockedContext = (authorized: boolean = true): MockedContext => {
  const prisma = mockDeep<PrismaClient>();

  const setReturnValue = ({ proxyFn, value }: setReturnValueParams): void => proxyFn.mockReturnValueOnce(value);

  // @ts-ignore
  return {
    prisma,
    authorized,
    setReturnValue,
  };
};
