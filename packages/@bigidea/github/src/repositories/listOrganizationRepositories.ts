import { Github } from "../Github";

export interface ListOrganizationRepositoriesOptions {
  org: string;
  type?:
    | "all"
    | "public"
    | "private"
    | "forks"
    | "sources"
    | "member"
    | "internal";
  sort?: "created" | "updated" | "pushed" | "full_name";
  direction?: "asc" | "desc";
  perPage?: number;
  page?: number;
}

const listOrganizationRepositories =
  (self: Github) => async (options: ListOrganizationRepositoriesOptions) => {
    const { org, type, sort, direction, perPage, page } = options;

    return await self.get({
      url: `/orgs/${org}/repos`,
      params: {
        type,
        sort,
        direction,
        per_page: perPage,
        page,
      },
    });
  };

export default listOrganizationRepositories;
