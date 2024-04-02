import { Paper, Stack, Typography } from "@mui/material";
import { t } from "i18next";
import React from "react";
import { useImmer } from "use-immer";

import { ButtonSave } from "./ButtonSave";
import { SelectGuestSpace } from "./SelectGuestSpace";
import { SelectMention } from "./SelectMention";
import { SelectView } from "./SelectView";

type TypeApp = {
  pluginConfig: PluginConfig;
  guestSpaceFields: SelectOptionField[];
  mentionFields: SelectOptionField[];
  listViews: SelectOptionView[];
};
const App = (props: TypeApp) => {
  const {
    pluginConfig: initPluginConfig,
    guestSpaceFields,
    mentionFields,
    listViews,
  } = props;

  const [pluginConfig, setPluginConfig] = useImmer(initPluginConfig);

  return (
    <Paper sx={{ m: 2, p: 2 }}>
      <Stack spacing={3}>
        <Typography>{t("config:selectField.title")}</Typography>
        <SelectGuestSpace
          pluginConfig={pluginConfig}
          setPluginConfig={setPluginConfig}
          options={guestSpaceFields}
        />
        <SelectMention
          pluginConfig={pluginConfig}
          setPluginConfig={setPluginConfig}
          options={mentionFields}
        />
        <Typography>{t("config:selectView.title")}</Typography>
        <SelectView
          pluginConfig={pluginConfig}
          setPluginConfig={setPluginConfig}
          options={listViews}
        />

        <ButtonSave pluginConfig={pluginConfig} />
      </Stack>
    </Paper>
  );
};

export { App };
