/**
 * This is the doc comment for the slack package
 *
 * @packageDocumentation
 */
import { RestConnector } from "@bigidea/integration";
import { Slack } from "./Slack";
import { SlackOauth } from "./SlackOauth";
import { Block, Divider, Header, Section } from "./elements/blocks";
import type {
  DividerProps,
  HeaderProps,
  SectionProps,
} from "./elements/blocks";
import { TextObj, TextObj } from "./elements/objects";
import type { ObjProps, TextObjProps } from "./elements/objects";

import type { PostMessageOptions } from "./chat/postMessage";
import type {
  HttpProxyRequestOptions,
  HttpProxyResponse,
} from "@bigidea/integration";

export {
  Slack,
  SlackOauth,
  RestConnector,
  Block,
  Divider,
  Header,
  Section,
  TextObj,
  TextObj,
};

export type {
  PostMessageOptions,
  HttpProxyRequestOptions,
  HttpProxyResponse,
  DividerProps,
  HeaderProps,
  SectionProps,
  ObjProps,
  TextObjProps,
};
