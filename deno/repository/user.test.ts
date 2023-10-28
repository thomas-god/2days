import { beforeEach, describe, it } from "$std/testing/bdd.ts";
import { assertEquals } from "$std/testing/asserts.ts";
import {
  createUserFromGithub,
  GithubUserInfo,
  User,
  UserInfo,
} from "./user.ts";
import { kv } from "./kv.ts";

describe("Creating a new user from GitHub", () => {
  beforeEach(async () => {
    await kv.delete(["users", "1"]);
    await kv.delete(["users_by_githubId", "gh_1"]);
  });
  it("should create a new user", async () => {
    const githubUserInfo: GithubUserInfo = {
      id: "1",
      name: "username",
      sessionId: "session_1",
      githubId: "gh_1",
    };

    const res = await createUserFromGithub(githubUserInfo);

    assertEquals(res.ok, true);
    const expectedUser: User = {
      id: "1",
      name: "username",
    };
    const user = await kv.get<User>(["users", githubUserInfo.id]);
    assertEquals(user.value, expectedUser);
  });

  it("Should be able to get the user from its githubID", async () => {
    const githubUserInfo: GithubUserInfo = {
      id: "1",
      name: "username",
      githubId: "gh_1",
      sessionId: "session_1",
    };

    await createUserFromGithub(githubUserInfo);

    const expectedUser: User = {
      id: "1",
      name: "username",
    };
    const user = await kv.get<UserInfo>([
      "users_by_githubId",
      githubUserInfo.githubId,
    ]);
    assertEquals(user.value, expectedUser);
  });
  it("Should be able to get the user from its sessionId", async () => {
    const githubUserInfo: GithubUserInfo = {
      id: "1",
      name: "username",
      githubId: "gh_1",
      sessionId: "session_1",
    };

    await createUserFromGithub(githubUserInfo);

    const expectedUser: User = {
      id: "1",
      name: "username",
    };
    const user = await kv.get<UserInfo>([
      "users_by_sessionId",
      githubUserInfo.sessionId,
    ]);
    assertEquals(user.value, expectedUser);
  });

  it("Should fails if an user already exists with this ID", async () => {
    const githubUserInfo: GithubUserInfo = {
      id: "1",
      name: "user",
      sessionId: "session_1",
      githubId: "gh_1",
    };
    await createUserFromGithub(githubUserInfo);

    const anotherUserWithTheSameId: GithubUserInfo = {
      id: "1",
      name: "another_user",
      sessionId: "session_1",
      githubId: "gh_2",
    };

    const res = await createUserFromGithub(anotherUserWithTheSameId);
    assertEquals(res.ok, false);
  });

  it("Should fails if an user already exists with this githubID", async () => {
    const githubUserInfo: GithubUserInfo = {
      id: "1",
      name: "user",
      sessionId: "session_1",
      githubId: "gh_1",
    };
    await createUserFromGithub(githubUserInfo);

    const anotherUserWithTheSameId: GithubUserInfo = {
      id: "2",
      name: "another_user",
      sessionId: "session_1",
      githubId: "gh_1",
    };

    const res = await createUserFromGithub(anotherUserWithTheSameId);
    assertEquals(res.ok, false);
  });
});
