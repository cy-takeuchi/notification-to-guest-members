import manifest from "../../plugin/manifest.json";

export const pluginId = kintone.$PLUGIN_ID;

export const pluginVersion = manifest.version;

// プラグイン設定の初期値
export const pluginConfigParam: PluginConfigParam = {
  fieldCodeGuestSpace: null,
  fieldCodeMention: null,
  view: null,
};
