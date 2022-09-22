import { Response } from "node-fetch";
import {
  OauthConnector,
  OauthConnectorProps,
  AuthData,
} from "@bigidea/integration";

export class SlackOauth extends OauthConnector {
  constructor(props: OauthConnectorProps) {
    super(props);
  }

  getAccessTokenUrl(): string {
    return "https://slack.com/api/oauth.v2.access";
  }

  processRequestAccessTokenResponse({
    response,
    text,
  }: {
    response: Response;
    text: string;
  }): AuthData {
    const responseData = JSON.parse(text);

    console.log("responseData", responseData);
    if (!responseData.ok) {
      throw new Error(
        `Slack access token request failed: ${responseData.error}`
      );
    }

    return super.processRequestAccessTokenResponse({
      response,
      text,
    });
  }
}
