import { createAuthClient } from 'better-auth/react';
import { usernameClient } from 'better-auth/client/plugins';

export const authClient = createAuthClient({
  baseURL: import.meta.env.VITE_BACKEND_URL || 'http://localhost:4000',
  plugins: [
    usernameClient()
  ]
});
