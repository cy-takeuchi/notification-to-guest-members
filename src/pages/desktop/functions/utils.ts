import { KintoneRestAPIClient } from "@kintone/rest-api-client";
import { t } from "i18next";
import { ResultAsync, errAsync } from "neverthrow";

import { pluginId } from "../../../params/param";
import { getApp, getObjectKeys, sleepSafe } from "../../shared/functions/utils";

export const getPluginConfig = () => {
  const configUnParsed = kintone.plugin.app.getConfig(
    pluginId,
  ) as PluginConfigUnParsed;

  const config: Partial<PluginConfig> = {};
  for (const key of getObjectKeys(configUnParsed)) {
    config[key] = JSON.parse(configUnParsed[key]);
  }

  return config as PluginConfig;
};

export const isValidView = (viewIdPlugin: string | null, viewId: number) => {
  // プラグイン設定で一覧が設定されていない場合は全ての一覧で表示
  if (viewIdPlugin === null) return true;
  if (viewIdPlugin === viewId.toString()) return true;
  return false;
};

export const fetchDestinations = async (
  app: number,
  condition: string,
  fields: string[],
) => {
  const client = new KintoneRestAPIClient();

  const request = ResultAsync.fromPromise(
    client.record.getAllRecords({
      app,
      condition,
      fields,
    }),
    (error) => {
      console.error(error);
      if (error instanceof Error) {
        return `${t("desktop:error.fetchDestinations")}\n${error.message}`;
      }
      return t("desktop:error.fetchDestinations");
    },
  );

  return ResultAsync.combine([request, sleepSafe(1000)]);
};

export const convertToMentions = (mention: string) => {
  return mention
    .split(",")
    .map((m) => m.trim())
    .filter((m) => m !== "")
    .map((m) => `guest/${m}`);
};

const parseGuestSpaceUrl = (url: string) => {
  const match1 = url.match(
    /\/k\/guest\/([0-9]+)\/#\/space\/([0-9]+)\/thread\/([0-9]+)/,
  );
  if (match1 && match1.length === 4) {
    return {
      guestSpaceId: match1[1],
      threadId: match1[3],
    };
  }

  const match2 = url.match(/\/k\/guest\/([0-9]+)\/#\/space\/([0-9]+)/);
  if (match2 && match2.length === 3) {
    return {
      guestSpaceId: match2[1],
      threadId: undefined,
    };
  }

  return {
    guestSpaceId: undefined,
    threadId: undefined,
  };
};

export const postNotificationMessage = (
  destination: Destination,
  notificationContent: string,
) => {
  const { guestSpaceId, threadId } = parseGuestSpaceUrl(destination.guestSpace);
  if (!guestSpaceId || !threadId) {
    return errAsync(t("desktop:error.na"));
  }

  const client = new KintoneRestAPIClient({ guestSpaceId });

  const request = client.space.addThreadComment({
    space: guestSpaceId,
    thread: threadId,
    comment: {
      text: notificationContent,
      mentions: destination.mentions.map((mention) => {
        return { code: mention, type: "USER" };
      }),
    },
  });

  return ResultAsync.fromPromise(request, (error) => {
    console.error(error);
    if (error instanceof Error) {
      return `${t("desktop:error.postMessage")}\n${error.message}`;
    }
    return t("desktop:error.postMessage");
  });
};

export const detailUrl = (recordId: string) => {
  const app = getApp();
  if (!app) return "";

  const url = `/k/${app}/show#record=${recordId}`;
  return url;
};
