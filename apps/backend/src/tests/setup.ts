import { vi } from 'vitest';

// Mock the environment variables before tests
process.env.DATABASE_URL = 'postgresql://test:test@localhost:5432/test';
process.env.JWT_SECRET = 'test-secret';
process.env.PORT = '4000';

// Auto-mock the Prisma client (Vitest will resolve to __mocks__/prisma automatically)
vi.mock('../lib/prisma');
