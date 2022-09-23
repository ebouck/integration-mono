import { Github } from "../Github";

export interface ListRepositoriesForAuthenticatedUserOptions {
  visibility: "all" | "public" | "private";
  affiliation: Array<"owner" | "collaborator" | "organization_member">;
  type: Array<"all" | "owner" | "public" | "private" | "member">;
  sort?: "created" | "updated" | "pushed" | "full_name";
  direction?: "asc" | "desc";
  perPage?: number;
  page?: number;
  /**
   * Only show notifications updated after the given time. This is a timestamp in ISO 8601 format: YYYY-MM-DDTHH:MM:SSZ.
   */
  since?: string;
  /**
   * Only show notifications updated before the given time. This is a timestamp in ISO 8601 format: YYYY-MM-DDTHH:MM:SSZ.
   */
  before?: string;
}

/**
 * Lists repositories that the authenticated user has explicit permission (:read, :write, or :admin) to access.
 * The authenticated user has explicit permission to access repositories they own, repositories where they are a collaborator, and repositories that they can access through an organization membership.
 */
const listRepositoriesForAuthenticatedUser =
  (self: Github) =>
  async (options: ListRepositoriesForAuthenticatedUserOptions) => {
    const {
      visibility,
      affiliation,
      type,
      sort,
      direction,
      perPage,
      page,
      since,
      before,
    } = options;

    return await self.get({
      url: `/user/repos`,
      params: {
        visibility,
        affiliation: affiliation && affiliation.join(","),
        type: type && type.join(","),
        sort,
        direction,
        per_page: perPage,
        page,
        since,
        before,
      },
    });
  };

export default listRepositoriesForAuthenticatedUser;
