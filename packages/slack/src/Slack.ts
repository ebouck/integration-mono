import {
  RestConnector,
  AuthConnectorOptions,
  HttpProxyRequestOptions,
  HttpProxyResponse,
  defineAuth,
} from "@bigidea/integration";
import postMessage from "./chat/postMessage";
import section from "./elements/blocks/section";
import plainText from "./elements/objects/plainText";
import markdownText from "./elements/objects/markdownText";
import actions from "./elements/blocks/actions";
import context from "./elements/blocks/context";
import divider from "./elements/blocks/divider";
import file from "./elements/blocks/file";
import header from "./elements/blocks/header";
import image from "./elements/blocks/image";
import video from "./elements/blocks/video";
import confirmationDialog from "./elements/objects/confirmationDialog";

export class Slack extends RestConnector {
  static defineAuth({ name }: { name: string }) {
    return defineAuth({ name, app: "slack" });
  }

  constructor(options: AuthConnectorOptions) {
    super({ ...options, baseUrl: "https://slack.com/api/" });
  }

  authorizationHeaders(): { [p: string]: string } {
    const { accessToken, apiKey } = this.getAuthData();

    console.log("got the apiKey", apiKey);

    return {
      Authorization: `Bearer ${accessToken || apiKey}`,
      "Content-Type": "application/json",
    };
  }

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

  postMessage = postMessage(this);

  static blocks = {
    actions: actions,
    context: context,
    divider: divider,
    file: file,
    header: header,
    image: image,
    section: section,
    video: video,
  };

  static objects = {
    plainText: plainText,
    markdownText: markdownText,
    confirmationDialog: confirmationDialog,
  };
}
