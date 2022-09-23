import { Github } from "../../Github";

export interface DownloadRepoArchiveTarOptions {
  owner: string;
  repo: string;
  ref: string;
}

const downloadRepoArchiveTar =
  (self: Github) => async (options: DownloadRepoArchiveTarOptions) => {
    const { owner, repo, ref } = options;

    return await self.get({
      url: `/repos/${owner}/${repo}/tarball/${ref}`,
    });
  };

export default downloadRepoArchiveTar;
