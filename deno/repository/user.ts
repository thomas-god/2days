import { kv } from "./kv.ts";

export interface User {
  id: string;
  name: string;
}

export interface UserInfo {
  id: string;
  name: string;
  sessionId: string;
}

export interface GithubUserInfo extends UserInfo {
  githubId: string;
}

export const createUserFromGithub = async (
  githubUserInfo: GithubUserInfo,
) => {
  const user: User = {
    id: githubUserInfo.id,
    name: githubUserInfo.name,
  };
  return await kv.atomic()
    .check({ key: ["users", githubUserInfo.id], versionstamp: null })
    .check({
      key: ["users_by_githubId", githubUserInfo.githubId],
      versionstamp: null,
    })
    .set(["users", githubUserInfo.id], user)
    .set(["users_by_githubId", githubUserInfo.githubId], user)
    .set(["users_by_sessionId", githubUserInfo.sessionId], user)
    .commit();
};

export const getUser = async (id: string): Promise<User | null> => {
  const user = await kv.get<User>(["users", id]);
  return user.value;
};

export const getUserBySessionId = async (
  sessionId: string,
): Promise<User | null> => {
  const user = await kv.get<User>(["users_by_sessionId", sessionId]);
  return user.value;
};

export const getUserByGithubId = async (
  githubId: string,
): Promise<User | null> => {
  const user = await kv.get<User>(["users_by_githubId", githubId]);
  return user.value;
};

export const updateUserSession = async (user: User, sessionsId: string) => {
  const newSessionKey = ["users_by_sessionId", sessionsId];
  return await kv.atomic()
    .set(newSessionKey, user)
    .commit();
};
