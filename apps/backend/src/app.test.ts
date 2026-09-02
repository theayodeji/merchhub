import request from 'supertest';
import { describe, it, expect } from 'vitest';
import app from './app';

describe('App Integration', () => {
  it('should return 200 for health check', async () => {
    const response = await request(app).get('/health');
    
    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      status: 'ok',
    });
  });

  // Example of testing a public route without auth
  it('should respond with CORS headers', async () => {
    const response = await request(app).options('/api/storefront/creators/test');
    
    // Check if CORS is configured to allow methods
    expect(response.headers['access-control-allow-methods']).toBeDefined();
  });
});
