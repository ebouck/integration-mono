import { Github } from "../Github";

export interface ListRepositoriesForUserOptions {
  username: string;
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

const listRepositoriesForUser =
  (self: Github) => async (options: ListRepositoriesForUserOptions) => {
    const { username, type, sort, direction, perPage, page } = options;

    return await self.get({
      url: `/users/${username}/repos`,
      params: {
        type,
        sort,
        direction,
        per_page: perPage,
        page,
      },
    });
  };

export default listRepositoriesForUser;
