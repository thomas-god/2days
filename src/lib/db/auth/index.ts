import type { PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import type { Adapter } from '@auth/core/adapters';
import { and, eq } from 'drizzle-orm';
import crypto from 'node:crypto';
import { accounts } from './accounts.schema';
import { sessions } from './sessions.schema';
import { users } from './users.schema';
import { verificationTokens } from './verificationTokens.schema';

export const schema = { users, accounts, sessions, verificationTokens };
export type DefaultSchema = typeof schema;

export function pgDrizzleAdapter(client: PostgresJsDatabase<Record<string, never>>): Adapter {
  return {
    createUser: async (data) => {
      return await client
        .insert(users)
        .values({ ...data, id: crypto.randomUUID() })
        .returning()
        .then((res) => res[0] ?? null);
    },
    getUser: async (data) => {
      return await client
        .select()
        .from(users)
        .where(eq(users.id, data))
        .then((res) => res[0] ?? null);
    },
    getUserByEmail: async (data) => {
      return await client
        .select()
        .from(users)
        .where(eq(users.email, data))
        .then((res) => res[0] ?? null);
    },
    createSession: async (data) => {
      return await client
        .insert(sessions)
        .values(data)
        .returning()
        .then((res) => res[0]);
    },
    getSessionAndUser: async (data) => {
      return await client
        .select({
          session: sessions,
          user: users
        })
        .from(sessions)
        .where(eq(sessions.sessionToken, data))
        .innerJoin(users, eq(users.id, sessions.userId))
        .then((res) => res[0] ?? null);
    },
    updateUser: async (data) => {
      if (!data.id) {
        throw new Error('No user id.');
      }

      return await client
        .update(users)
        .set(data)
        .where(eq(users.id, data.id))
        .returning()
        .then((res) => res[0]);
    },
    updateSession: async (data) => {
      return await client
        .update(sessions)
        .set(data)
        .where(eq(sessions.sessionToken, data.sessionToken))
        .returning()
        .then((res) => res[0]);
    },
    linkAccount: async (rawAccount) => {
      const updatedAccount = await client
        .insert(accounts)
        .values(rawAccount)
        .returning()
        .then((res) => res[0]);

      // Drizzle will return `null` for fields that are not defined.
      // However, the return type is expecting `undefined`.
      const account = {
        ...updatedAccount,
        access_token: updatedAccount.access_token ?? undefined,
        token_type: updatedAccount.token_type ?? undefined,
        id_token: updatedAccount.id_token ?? undefined,
        refresh_token: updatedAccount.refresh_token ?? undefined,
        scope: updatedAccount.scope ?? undefined,
        expires_at: updatedAccount.expires_at ?? undefined,
        session_state: updatedAccount.session_state ?? undefined
      };

      return account;
    },
    getUserByAccount: async (account) => {
      const dbAccount =
        (await client
          .select()
          .from(accounts)
          .where(
            and(
              eq(accounts.providerAccountId, account.providerAccountId),
              eq(accounts.provider, account.provider)
            )
          )
          .leftJoin(users, eq(accounts.userId, users.id))
          .then((res) => res[0])) ?? null;

      if (!dbAccount) {
        return null;
      }

      return dbAccount.users;
    },
    deleteSession: async (sessionToken) => {
      const session = await client
        .delete(sessions)
        .where(eq(sessions.sessionToken, sessionToken))
        .returning()
        .then((res) => res[0] ?? null);

      return session;
    },
    createVerificationToken: async (token) => {
      return await client
        .insert(verificationTokens)
        .values(token)
        .returning()
        .then((res) => res[0]);
    },
    useVerificationToken: async (token) => {
      try {
        return await client
          .delete(verificationTokens)
          .where(
            and(
              eq(verificationTokens.identifier, token.identifier),
              eq(verificationTokens.token, token.token)
            )
          )
          .returning()
          .then((res) => res[0] ?? null);
      } catch (err) {
        throw new Error('No verification token found.');
      }
    },
    deleteUser: async (id) => {
      await client
        .delete(users)
        .where(eq(users.id, id))
        .returning()
        .then((res) => res[0] ?? null);
    },
    unlinkAccount: async (account) => {
      const { type, provider, providerAccountId, userId } = await client
        .delete(accounts)
        .where(
          and(
            eq(accounts.providerAccountId, account.providerAccountId),
            eq(accounts.provider, account.provider)
          )
        )
        .returning()
        .then((res) => res[0] ?? null);

      return { provider, type, providerAccountId, userId };
    }
  };
}
