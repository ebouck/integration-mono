import type { GithubTypes } from "../GithubTypes";
import { Github } from "../Github";

export interface CreateGistOptions {
  description?: string;
  files: GithubTypes.Files;
  isPublic?: boolean;
}

const createGist = (self: Github) => async (options: CreateGistOptions) => {
  const { description, files, isPublic } = options;

  return await self.post({
    url: `/gists`,
    data: {
      description,
      files,
      public: isPublic,
    },
  });
};

export default createGist;
