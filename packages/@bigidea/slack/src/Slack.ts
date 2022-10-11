import {
  RestConnector,
  AuthConnectorOptions,
  HttpProxyRequestOptions,
  HttpProxyResponse,
  defineAuth,
} from "@bigidea/integration";
import postMessage, { PostMessageOptions } from "./chat/postMessage";

/**
 * Connector to the Slack API
 *
 * @group 1. Connector
 *
 * @example Import
 * ```typescript
 * import { Slack } from '@bigidea/slack';
 * ```
 *
 * @example Create an auth
 *
 * ```typescript
 * const slackAuth = Slack.defineAuth({ name: 'slack' })
 * ```
 *
 * @example Use in a task
 *
 * ```typescript
 * defineTask({
 *   name: 'helloSlack',
 *   auths: {
 *     slack: slackAuth,
 *   },
 *   run: async ({ auths }) => {
 *     const slack = new Slack({ auth: auths.slack });
 *     await slack.postMessage({ channel: '#general', text: 'Hello Slack'})
 *   }
 * })
 * ```
 */
export class Slack extends RestConnector {
  /**
   * Define a slack auth
   */
  static defineAuth(options: { name: string }) {
    const { name } = options;

    return defineAuth({ name, app: "slack" });
  }

  /**
   * Create a new slack connector
   *
   * @param options
   */
  constructor(options: AuthConnectorOptions) {
    super({ ...options, baseUrl: "https://slack.com/api/" });
  }

  /**
   * @internal
   */
  authorizationHeaders(): { [p: string]: string } {
    const { accessToken, apiKey } = this.getAuthData();

    console.log("got the apiKey", apiKey);

    return {
      Authorization: `Bearer ${accessToken || apiKey}`,
      "Content-Type": "application/json",
    };
  }

  /**
   * @internal
   */
  async request(options: HttpProxyRequestOptions): Promise<HttpProxyResponse> {
    const response = await super.request(options);
    let data = response.data;

    if (!data.ok && data.error === "token_expired") {
      await this.refreshToken();
      const responseAfterRefresh = await super.request(options);
      data = responseAfterRefresh.data;
    }

    if (!data.ok) {
      throw new Error(data.error);
    }
    return response;
  }

  /**
   * Sends a message to a channel
   *
   * @group Chat
   *
   * @example Import
   *
   * ```typescript
   * import { Slack } from "@bigidea/slack";
   * ```
   *
   * @example Define an auth
   *
   * ```
   * const slackAuth = Slack.defineAuth({ name: "slack" });
   * ```
   *
   * @example Basic hello world as text
   *
   * ```typescript
   * slack.postMessage({ channel: "#general", text: "hello world" });
   * ```
   *
   * @example Use blocks to structure display
   *
   * ```typescript
   * import { Section, SlackText } from "@bigidea/slack";
   *
   * slack.postMessage({
   *   channel: "#general",
   *   blocks: [
   *     new Section("Title section"),
   *     new Section({
   *       fields: [
   *         new SlackText("*Data 1*\nvalue A"),
   *         new SlackText("*Data 2*\nvalue B"),
   *       ]
   *     }),
   *   ],
   *   text: "Use text as a fallback for notifications that can't display blocks",
   * })
   * ```
   *
   * @param options
   */
  async postMessage(options: PostMessageOptions): Promise<HttpProxyResponse> {
    return postMessage(this)(options);
  }
}
