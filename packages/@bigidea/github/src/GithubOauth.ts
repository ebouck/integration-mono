import { OauthConnector } from "@bigidea/integration";

/**
 * Connector to the Github Oauth2 API
 */
export class GithubOauth extends OauthConnector {
  getAccessTokenUrl(): string {
    return "https://github.com/login/oauth/access_token";
  }
}
