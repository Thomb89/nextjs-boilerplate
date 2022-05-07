import { createContext } from './context';

describe('context', () => {
  it('should return a context Object', async () => {
    const context = await createContext(undefined);
    expect(context).toBeDefined();
    expect(context.prisma).toBeDefined();
    expect(context.authorized).toBeFalsy();
  });
});
