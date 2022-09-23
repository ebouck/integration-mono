import { Github } from "../Github";

export interface UpdateIssueOptions {
  owner: string;
  repo: string;
  issueNumber: number;
  title?: string | number | null;
  body?: string | null;
  state?: string;
  milestone?: string | number | null;
  labels?: Array<string> | Array<object>;
  assignees?: Array<string>;
}

const updateIssue = (self: Github) => async (options: UpdateIssueOptions) => {
  const {
    owner,
    repo,
    issueNumber,
    title,
    body,
    state,
    milestone,
    labels,
    assignees,
  } = options;

  return await self.patch({
    url: `/repos/${owner}/${repo}/issues/${issueNumber}`,
    data: {
      title,
      body,
      state,
      milestone,
      labels,
      assignees,
    },
  });
};

export default updateIssue;
