import { loadEnvConfig } from '@next/env';

import 'mutationobserver-shim';
import '@testing-library/jest-dom';

const projecctDir = process.cwd();
loadEnvConfig(projecctDir, false, { error: console.error, info: () => {} });

beforeEach(() => jest.useFakeTimers());
afterEach(() => jest.useRealTimers());
