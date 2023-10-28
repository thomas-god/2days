interface GithubUserMetadata {
  login: string;
  id: string;
}

export async function fetchUserGithubMetadata(
  accessToken: string,
): Promise<GithubUserMetadata> {
  const response = await fetch("https://api.github.com/user", {
    headers: { authorization: `Bearer ${accessToken}` },
  });
  if (!response.ok) {
    await response.body?.cancel();
    throw new Error();
  }
  const data = await response.json();
  return {
    login: data.login,
    id: data.id,
  };
}
