import { Github } from "../Github";

/**
 * This is a description of these options
 */
export interface UpdatePullRequestOptions {
  owner: string;
  repo: string;
  pullNumber: number;
  title?: string;
  body?: string;
  state?: "open" | "closed";
  base?: string;
  maintainerCanModify?: boolean;
}

const updatePullRequest =
  (self: Github) => async (options: UpdatePullRequestOptions) => {
    const {
      owner,
      repo,
      pullNumber,
      title,
      body,
      state,
      base,
      maintainerCanModify,
    } = options;

    return await self.patch({
      url: `/repos/${owner}/${repo}/pulls/${pullNumber}`,
      data: {
        title,
        body,
        state,
        base,
        maintainerCanModify,
      },
    });
  };

export default updatePullRequest;
