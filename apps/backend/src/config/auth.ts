import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { username } from "better-auth/plugins";
import { prisma } from "../lib/prisma";

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  emailAndPassword: {
    enabled: true,
  },
  plugins: [
    username()
  ],
  user: {
    additionalFields: {
      role: {
        type: "string",
        required: true,
        defaultValue: "CUSTOMER",
      }
    }
  },
  trustedOrigins: ["http://localhost:5173"],
  databaseHooks: {
    user: {
      create: {
        after: async (user) => {
          try {
            const { getEventBus } = await import('../events/event-bus');
            getEventBus().publish({
              type: 'user.registered',
              payload: { userId: user.id, email: user.email, name: user.name }
            });
          } catch (e) {
            // Bus may not be initialized in test environments — safe to ignore
            console.warn('[Auth] EventBus not available for user.registered event:', e);
          }
        }
      }
    }
  }
});
