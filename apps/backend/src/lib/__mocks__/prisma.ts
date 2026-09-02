import { PrismaClient } from '@merchhub/db';
import { beforeEach } from 'vitest';
import { mockDeep, mockReset } from 'vitest-mock-extended';

export const prisma = mockDeep<PrismaClient>();

beforeEach(() => {
  mockReset(prisma);
});
