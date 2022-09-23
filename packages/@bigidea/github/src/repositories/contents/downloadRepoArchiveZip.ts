import { Github } from "../../Github";

export interface DownloadRepoArchiveZipOptions {
  owner: string;
  repo: string;
  ref: string;
}

const downloadRepoArchiveZip =
  (self: Github) => async (options: DownloadRepoArchiveZipOptions) => {
    const { owner, repo, ref } = options;

    return await self.get({
      url: `/repos/${owner}/${repo}/zipball/${ref}`,
    });
  };

export default downloadRepoArchiveZip;
