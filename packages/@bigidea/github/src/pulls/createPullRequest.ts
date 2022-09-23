import { Github } from "../Github";

export interface CreatePullRequestOptions {
  owner: string;
  repo: string;
  title?: string;
  head: string;
  base: string;
  body?: string;
  maintainerCanModify?: boolean;
  draft?: boolean;
  issue?: number;
}

const createPullRequest =
  (self: Github) => async (options: CreatePullRequestOptions) => {
    const {
      owner,
      repo,
      title,
      head,
      base,
      body,
      maintainerCanModify,
      draft,
      issue,
    } = options;

    return await self.post({
      url: `/repos/${owner}/${repo}/pulls`,
      data: {
        title,
        head,
        base,
        body,
        maintainerCanModify,
        draft,
        issue,
      },
    });
  };

export default createPullRequest;
