import { createAuthClient } from 'better-auth/react';
import { usernameClient, inferAdditionalFields } from 'better-auth/client/plugins';

export const authClient = createAuthClient({
  baseURL: import.meta.env.VITE_BACKEND_URL || 'http://localhost:4000',
  plugins: [
    inferAdditionalFields({
      user: {
        role: {
          type: "string",
          optional: true,
        },
        isOnboarded: {
          type: "boolean",
          optional: true,
        },
        creatorCategoryId: {
          type: "string",
          optional: true,
        }
      }
    }),
    usernameClient(),
  ]
});
