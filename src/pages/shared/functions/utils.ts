import { ResultAsync } from "neverthrow";

export const getObjectKeys = <T extends { [key: string]: unknown }>(
  obj: T,
): Array<keyof T> => {
  return Object.keys(obj);
};

export const isEmptyPluginConfig = (
  config: PluginConfigUnParsed | PluginConfig | EmptyObject,
): config is EmptyObject => {
  return Object.keys(config).length === 0;
};

export const getLng = () =>
  kintone.getLoginUser().language === "ja" ? "ja" : "en";

const sleep = (ms: number) => new Promise((res) => setTimeout(res, ms));
export const sleepSafe = (ms: number) => ResultAsync.fromSafePromise(sleep(ms));

export const getApp = () => kintone.app.getId();
