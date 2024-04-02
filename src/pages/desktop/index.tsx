import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import i18n from "../../i18n";
import { getLng, isEmptyPluginConfig } from "../shared/functions/utils";

import { App } from "./components/App";
import { getPluginConfig, isValidView } from "./functions/utils";

(async () => {
  kintone.events.on(
    ["app.record.index.show"],
    async (event: { viewId: number }) => {
      const spaceElement = kintone.app.getHeaderMenuSpaceElement();
      if (spaceElement === null) return event;

      const pluginConfig = getPluginConfig();

      // プラグインの未設定（未保存）の場合は何もしない
      if (isEmptyPluginConfig(pluginConfig)) return event;

      if (pluginConfig.param.fieldCodeGuestSpace === null) return event;
      if (pluginConfig.param.fieldCodeMention === null) return event;

      if (!isValidView(pluginConfig.param.view, event.viewId)) return event;

      const wrapper = document.createElement("div");

      const { fieldCodeGuestSpace, fieldCodeMention } = pluginConfig.param;

      const root = createRoot(wrapper);
      root.render(
        <StrictMode>
          <App
            fieldCodeGuestSpace={fieldCodeGuestSpace}
            fieldCodeMention={fieldCodeMention}
          />
        </StrictMode>,
      );

      await i18n.changeLanguage(getLng());

      spaceElement?.appendChild(wrapper);

      return event;
    },
  );
})();
