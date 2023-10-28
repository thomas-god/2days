// plugins/kv_oauth.ts
import { createGitHubOAuthConfig, createHelpers } from "deno-kv-oauth";
import type { Plugin } from "$fresh/server.ts";
import { fetchUserGithubMetadata } from "../repository/github.ts";
import {
  createUserFromGithub,
  getUserByGithubId,
  GithubUserInfo,
  updateUserSession,
} from "../repository/user.ts";

export const { signIn, handleCallback, signOut, getSessionId } = createHelpers(
  createGitHubOAuthConfig(),
);

export default {
  name: "kv-oauth",
  routes: [
    {
      path: "/signin",
      async handler(req) {
        return await signIn(req);
      },
    },
    {
      path: "/callback",
      async handler(req) {
        const { response, sessionId, tokens } = await handleCallback(req);
        const userMetadata = await fetchUserGithubMetadata(tokens.accessToken);
        const user = await getUserByGithubId(userMetadata.id);

        if (user === null) {
          const userInfo: GithubUserInfo = {
            id: crypto.randomUUID(),
            name: userMetadata.login,
            githubId: userMetadata.id,
            sessionId,
          };
          await createUserFromGithub(userInfo);
        } else {
          await updateUserSession(user, sessionId);
        }
        return response;
      },
    },
    {
      path: "/signout",
      async handler(req) {
        return await signOut(req);
      },
    },
    {
      path: "/protected",
      async handler(req) {
        return await getSessionId(req) === undefined
          ? new Response("Unauthorized", { status: 401 })
          : new Response("You are allowed");
      },
    },
  ],
} as Plugin;
