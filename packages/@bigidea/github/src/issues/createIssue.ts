import { Github } from "../Github";

export interface CreateIssueOptions {
  owner: string;
  repo: string;
  title: string;
  body?: string;
  milestone?: string | number | null;
  labels?: Array<string> | Array<object>;
  assignees?: Array<string>;
}

const createIssue = (self: Github) => async (options: CreateIssueOptions) => {
  const { owner, repo, title, milestone, labels, assignees } = options;

  return await self.post({
    url: `/repos/${owner}/${repo}/issues`,
    data: {
      title,
      milestone,
      labels,
      assignees,
    },
  });
};

export default createIssue;
