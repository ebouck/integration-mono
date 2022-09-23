import {
  AuthConnectorOptions,
  HttpProxyResponse,
  RestConnector,
  WebhookDeliveryData,
} from "@bigidea/integration";
import createGist, { CreateGistOptions } from "./gists/createGist";
import createIssue, { CreateIssueOptions } from "./issues/createIssue";
import updateIssue, { UpdateIssueOptions } from "./issues/updateIssue";
import createPullRequest, {
  CreatePullRequestOptions,
} from "./pulls/createPullRequest";
import createPullRequestComment, {
  CreatePullRequestCommentOptions,
} from "./pulls/createPullRequestComment";
import updatePullRequest, {
  UpdatePullRequestOptions,
} from "./pulls/updatePullRequest";
import downloadRepoArchiveTar, {
  DownloadRepoArchiveTarOptions,
} from "./repositories/contents/downloadRepoArchiveTar";
import downloadRepoArchiveZip, {
  DownloadRepoArchiveZipOptions,
} from "./repositories/contents/downloadRepoArchiveZip";
import createRepositoryWebhook, {
  CreateRepositoryWebhookOptions,
} from "./webhooks/repositoryWebhooks/createRepositoryWebhook";
import getRepositoryWebhook, {
  GetRepositoryWebhookOptions,
} from "./webhooks/repositoryWebhooks/getRepositoryWebhook";
import listRepositoryWebhooks, {
  ListRepositoryWebhooksOptions,
} from "./webhooks/repositoryWebhooks/listRepositoryWebhooks";
import listRepositoriesForUser, {
  ListRepositoriesForUserOptions,
} from "./repositories/listRepositoriesForUser";
import listOrganizationRepositories, {
  ListOrganizationRepositoriesOptions,
} from "./repositories/listOrganizationRepositories";
import listRepositoriesForAuthenticatedUser, {
  ListRepositoriesForAuthenticatedUserOptions,
} from "./repositories/listRepositoriesForAuthenticatedUser";
import updateRepositoryWebhook, {
  UpdateRepositoryWebhookOptions,
} from "./webhooks/repositoryWebhooks/updateRepositoryWebhook";
import deleteRepositoryWebhook, {
  DeleteRepositoryWebhookOptions,
} from "./webhooks/repositoryWebhooks/deleteRepositoryWebhook";
import pingRepositoryWebhook, {
  PingRepositoryWebhookOptions,
} from "./webhooks/repositoryWebhooks/pingRepositoryWebhook";
import testPushRepositoryWebhook, {
  TestPushRepositoryWebhookOptions,
} from "./webhooks/repositoryWebhooks/testPushRepositoryWebhook";
import pullRequestPayload from "./webhooks/payloads/pullRequestPayload";
import pullRequestReviewPayload from "./webhooks/payloads/pullRequestReviewPayload";
import workflowRunPayload from "./webhooks/payloads/workflowRunPayload";
import pingPayload from "./webhooks/payloads/pingPayload";
import isWebhookEventType from "./webhooks/webhookEventType";
import pushPayload from "./webhooks/payloads/pushPayload";
import defineGithubSubscription from "./webhooks/defineGithubSubscription";
import githubSubscribeArgs from "./webhooks/githubSubscribeArgs";
import WebhookEvent from "./webhooks/WebhookEvent";

/**
 * Connector to the Github API
 *
 * @example
 * ```typescript
 * import { Github } from "@bigidea/github"
 *
 * // List all github repos
 * const githubAuth = Github.defineAuth({ name: "github" });
 * const github = new Github({ auth: githubAuth});
 * await github.repositories.listRepos();
 * ```
 */
export class Github extends RestConnector {
  static defineAuth({ name }: { name: string }) {
    return RestConnector.defineAuth({ name, app: "github" });
  }

  static defineSubscription = defineGithubSubscription;
  static subscribeArgs = githubSubscribeArgs;

  constructor(options: AuthConnectorOptions) {
    super({ ...options, baseUrl: "https://api.github.com" });
  }

  authorizationHeaders(): { [p: string]: string } {
    const { accessToken } = this.getAuthData();

    return {
      Authorization: `token ${accessToken}`,
      Accept: "application/vnd.github+json",
    };
  }

  async createGist(options: CreateGistOptions): Promise<HttpProxyResponse> {
    return createGist(this)(options);
  }

  async createIssue(options: CreateIssueOptions): Promise<HttpProxyResponse> {
    return createIssue(this)(options);
  }

  async updateIssue(options: UpdateIssueOptions): Promise<HttpProxyResponse> {
    return updateIssue(this)(options);
  }

  async createPullRequest(
    options: CreatePullRequestOptions
  ): Promise<HttpProxyResponse> {
    return createPullRequest(this)(options);
  }

  async createPullRequestComment(options: CreatePullRequestCommentOptions) {
    return createPullRequestComment(this)(options);
  }

  async updatePullRequest(options: UpdatePullRequestOptions) {
    return updatePullRequest(this)(options);
  }

  async listOrganizationRepositories(
    options: ListOrganizationRepositoriesOptions
  ) {
    return listOrganizationRepositories(this)(options);
  }

  async listRepositoriesForUser(options: ListRepositoriesForUserOptions) {
    return listRepositoriesForUser(this)(options);
  }

  async listRepositoriesForAuthenticatedUser(
    options: ListRepositoriesForAuthenticatedUserOptions
  ) {
    return listRepositoriesForAuthenticatedUser(this)(options);
  }

  async downloadRepoArchiveTar(options: DownloadRepoArchiveTarOptions) {
    return downloadRepoArchiveTar(this)(options);
  }

  async downloadRepoArchiveZip(options: DownloadRepoArchiveZipOptions) {
    return downloadRepoArchiveZip(this)(options);
  }

  async listRepositoryWebhooks(options: ListRepositoryWebhooksOptions) {
    return listRepositoryWebhooks(this)(options);
  }

  /**
   * Create a repository webhook
   *
   * Repositories can have multiple webhooks installed. Each webhook should have a unique config. Multiple webhooks can share the same config as long as those webhooks do not have any events that overlap.
   */
  async createRepositoryWebhook(options: CreateRepositoryWebhookOptions) {
    return createRepositoryWebhook(this)(options);
  }

  /**
   * Get a repository webhook
   *
   * Returns a webhook configured in a repository.
   */
  async getRepositoryWebhook(options: GetRepositoryWebhookOptions) {
    return getRepositoryWebhook(this)(options);
  }

  /**
   * Update a repository webhook
   *
   * Updates a webhook configured in a repository. If you previously had a secret set, you must provide the same secret or set a new secret or the secret will be removed.
   */
  async updateRepositoryWebhook(options: UpdateRepositoryWebhookOptions) {
    return updateRepositoryWebhook(this)(options);
  }

  /**
   * Delete a repository webhook
   */
  async deleteRepositoryWebhook(options: DeleteRepositoryWebhookOptions) {
    return deleteRepositoryWebhook(this)(options);
  }

  /**
   * Ping a repository webhook
   *
   * This will trigger a ping event to be sent to the hook.
   */
  async pingRepositoryWebhook(options: PingRepositoryWebhookOptions) {
    return pingRepositoryWebhook(this)(options);
  }

  /**
   * Test the push repository webhook
   *
   * This will trigger the hook with the latest push to the current repository if the hook is subscribed to push events. If the hook is not subscribed to push events, the server will respond with 204 but no test POST will be generated.
   */
  async testPushRepositoryWebhook(options: TestPushRepositoryWebhookOptions) {
    return testPushRepositoryWebhook(this)(options);
  }

  /**
   * Verify type of webhook event
   */
  static isWebhookEventType(
    expectedEvent: WebhookEvent,
    deliveryData: WebhookDeliveryData
  ) {
    return isWebhookEventType(expectedEvent, deliveryData);
  }

  /**
   * When you create a new webhook, we'll send you a simple ping event to let you know you've set up the webhook correctly. This event isn't stored so it isn't retrievable via the Events API endpoint.
   */
  static pingPayload(data: WebhookDeliveryData) {
    return pingPayload(data);
  }

  /**
   * Activity related to pull requests. The type of activity is specified in the action property of the payload object.
   */
  static pullRequestPayload(data: WebhookDeliveryData) {
    return pullRequestPayload(data);
  }

  /**
   * Activity related to pull request reviews. The type of activity is specified in the action property of the payload object.
   */
  static pullRequestReviewPayload(data: WebhookDeliveryData) {
    return pullRequestReviewPayload(data);
  }

  /**
   * One or more commits are pushed to a repository branch or tag.
   *
   * Note: You will not receive a webhook for this event when you push more than three tags at once.
   *
   * Availability
   *   Repository webhooks
   *   Organization webhooks
   *   GitHub Apps with the contents permission
   */
  static pushPayload(data: WebhookDeliveryData) {
    return pushPayload(data);
  }

  /**
   * When a GitHub Actions workflow run is requested or completed.
   */
  static workflowRunPayload(data: WebhookDeliveryData) {
    return workflowRunPayload(data);
  }
}
