import { Github } from "../Github";

export interface CreatePullRequestCommentOptions {
  owner: string;
  repo: string;
  pullNumber: number;
  body: string;
  commitId?: string;
  path?: string;
  position?: number;
  side?: string;
  line?: number;
  startLine?: number;
  startSide?: string;
  inReplyTo?: number;
}

const createPullRequestComment =
  (self: Github) => async (options: CreatePullRequestCommentOptions) => {
    const {
      owner,
      repo,
      pullNumber,
      body,
      commitId,
      path,
      position,
      side,
      line,
      startLine,
      startSide,
      inReplyTo,
    } = options;

    return await self.post({
      url: `/repos/${owner}/${repo}/pulls/${pullNumber}/comments`,
      data: {
        body,
        commit_id: commitId,
        path,
        position,
        side,
        line,
        start_line: startLine,
        start_side: startSide,
        in_reply_to: inReplyTo,
      },
    });
  };

export default createPullRequestComment;
