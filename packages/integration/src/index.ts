import { defineAuth, getAuthData, AuthData } from "./base/auth";
import {
  HttpProxyRequestOptions,
  HttpProxyResponse,
  HttpProxyResponseError,
} from "./base/http";
import { defineSecret, SecretData } from "./base/secret";
import { defineSubscription } from "./base/subscription";
import { defineTask } from "./base/task";
import { defineVariable, getVariableData, VariableData } from "./base/variable";
import { defineWebhook, getWebhookData } from "./base/webhook";
import {
  BaseConnector,
  BaseConnectorOptions,
} from "./connectors/BaseConnector";
import {
  AuthConnector,
  AuthConnectorOptions,
} from "./connectors/AuthConnector";
import {
  OauthConnector,
  OauthConnectorProps,
  OauthConfigData,
} from "./connectors/OauthConnector";
import {
  RestConnector,
  RestConnectorOptions,
} from "./connectors/RestConnector";
import { deploy } from "./base/deploy";
import { run } from "./run";
import { logs } from "./logging";
import { handler } from "./handler";
import toTimestamp from "./util/toTimestamp";
import { PollingData, WebhookDeliveryData } from "./base/runData";
import deCamelize from "./util/deCamelize";

export {
  defineTask,
  defineAuth,
  getAuthData,
  defineVariable,
  getVariableData,
  defineSecret,
  defineSubscription,
  defineWebhook,
  getWebhookData,
  BaseConnector,
  AuthConnector,
  OauthConnector,
  RestConnector,
  deploy,
  run,
  logs,
  handler,
  toTimestamp,
  deCamelize,
  HttpProxyResponseError,
};

export type {
  AuthData,
  VariableData,
  SecretData,
  BaseConnectorOptions,
  AuthConnectorOptions,
  HttpProxyRequestOptions,
  HttpProxyResponse,
  OauthConnectorProps,
  OauthConfigData,
  RestConnectorOptions,
  PollingData,
  WebhookDeliveryData,
};