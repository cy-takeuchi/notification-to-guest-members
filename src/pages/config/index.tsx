import { Backdrop, CircularProgress } from "@mui/material";
import { t } from "i18next";
import { kintonePrettyFields, kintonePrettyType } from "kintone-pretty-fields";
import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import i18n from "../../i18n";
import { getApp, getLng } from "../shared/functions/utils";

import { App } from "./components/App";
import { MessageError } from "./components/MessageError";
import {
  convertToOptionField,
  convertToOptionView,
  fetchFieldsAndViews,
  getPluginConfig,
} from "./functions/utils";

(async () => {
  const rootElement = document.querySelector("#sdd-plugin-root");
  if (!rootElement) return;

  const pluginConfig = getPluginConfig();

  const lang = getLng();
  await i18n.changeLanguage(lang);

  const root = createRoot(rootElement);
  root.render(
    <Backdrop
      sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open
    >
      <CircularProgress />
    </Backdrop>,
  );

  const app = getApp();
  if (!app) {
    root.render(<MessageError messageError={t("config:error.unexpected")} />);
    return;
  }

  const res = await fetchFieldsAndViews(app, lang);
  if (res.isErr()) {
    root.render(<MessageError messageError={res.error} />);
    return;
  }
  const [{ fields }, { views }] = res.value;

  const guestSpaceFields = fields
    .filter(
      (
        field,
      ): field is kintonePrettyType.SingleLineText | kintonePrettyType.Link =>
        kintonePrettyFields.isSingleLineText(field) ||
        kintonePrettyFields.isLink(field),
    )
    .map(convertToOptionField);

  const mentionFields = fields
    .filter(kintonePrettyFields.isSingleLineText)
    .map(convertToOptionField);

  const listViews = Object.values(views)
    .filter((view) => view.type === "LIST")
    .map(convertToOptionView);

  root.render(
    <StrictMode>
      <App
        pluginConfig={pluginConfig}
        guestSpaceFields={guestSpaceFields}
        mentionFields={mentionFields}
        listViews={listViews}
      />
    </StrictMode>,
  );
})();
