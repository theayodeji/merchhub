---
name: database-safety
description: Critical rules for handling destructive database operations.
---

# Database Safety Rules

1. **Never Drop Data Without Warning**: NEVER execute destructive database commands (such as `prisma db push --accept-data-loss`, `prisma migrate reset`, dropping tables, or clearing collections) without stopping to give the user an explicit, highlighted warning.
2. **Require Explicit Consent**: You must clearly state exactly what data will be lost and wait for a distinct, unambiguous confirmation from the user specifically acknowledging the data loss before proceeding with the destructive action. A general "yes, go ahead" to a previous step does NOT constitute consent for data loss.
