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
