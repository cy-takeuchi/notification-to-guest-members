import { KintoneRestAPIClient } from "@kintone/rest-api-client";
import { ViewForResponse } from "@kintone/rest-api-client/lib/src/client/types";
import { t } from "i18next";
import { kintonePrettyFields, kintonePrettyType } from "kintone-pretty-fields";
import { ResultAsync } from "neverthrow";

import {
  pluginConfigParam,
  pluginId,
  pluginVersion,
} from "../../../params/param";
import {
  getObjectKeys,
  isEmptyPluginConfig,
  sleepSafe,
} from "../../shared/functions/utils";

export const getPluginConfig = () => {
  const configUnParsed = kintone.plugin.app.getConfig(pluginId) as
    | PluginConfigUnParsed
    | EmptyObject;

  // プラグインインストール直後
  if (isEmptyPluginConfig(configUnParsed)) {
    return {
      param: pluginConfigParam,
      version: pluginVersion,
    };
  }

  const config: Partial<PluginConfig> = {};
  for (const key of getObjectKeys(configUnParsed)) {
    // プラグインのバージョンアップでparamの項目が増えた場合の対応
    if (key === "param") {
      config[key] = {
        ...pluginConfigParam,
        ...JSON.parse(configUnParsed[key]),
      };
      continue;
    }

    config[key] = JSON.parse(configUnParsed[key]);
  }

  return config as PluginConfig;
};

export const setPluginConfig = (param: PluginConfigParam) => {
  const config = {
    param,
    version: pluginVersion.toString(),
  };

  const request = ResultAsync.fromPromise(
    new Promise((resolve) => {
      const newConfig: Partial<PluginConfigUnParsed> = {};
      for (const key of getObjectKeys(config)) {
        newConfig[key] = JSON.stringify(config[key]);
      }
      kintone.plugin.app.setConfig(newConfig, () => {
        resolve(0);
      });
    }),
    (error) => {
      console.error(error);
      if (error instanceof Error) {
        return `${t("config:error.setPluginConfig")}\n${error.message}`;
      }
      return t("config:error.setPluginConfig");
    },
  );

  return ResultAsync.combine([request, sleepSafe(1000)]);
};

export const fetchFieldsAndViews = async (app: number, lang: "ja" | "en") => {
  const client = new KintoneRestAPIClient();

  const requestFields = ResultAsync.fromPromise(
    kintonePrettyFields.getFields({
      client,
      app,
      lang,
      preview: true,
    }),
    (error) => {
      console.error(error);
      if (error instanceof Error) {
        return `${t("config:error.fetchFields")}\n${error.message}`;
      }
      return t("config:error.fetchFields");
    },
  );

  const requestViews = ResultAsync.fromPromise(
    client.app.getViews({
      app,
      lang,
      preview: true,
    }),
    (error) => {
      console.error(error);
      if (error instanceof Error) {
        return `${t("config:error.fetchViews")}\n${error.message}`;
      }
      return t("config:error.fetchViews");
    },
  );

  return ResultAsync.combine([requestFields, requestViews, sleepSafe(1000)]);
};

export const convertToOptionField = (
  field: kintonePrettyType.OneOf,
): SelectOptionField => {
  return {
    label: field.label,
    code: field.code,
  };
};

export const convertToOptionView = (
  view: ViewForResponse,
): SelectOptionView => {
  return {
    label: view.name,
    id: view.id,
  };
};
