import { OauthConnector } from "@bigidea/integration";

export class GithubOauth extends OauthConnector {
  getAccessTokenUrl(): string {
    return "https://github.com/login/oauth/access_token";
  }
}
