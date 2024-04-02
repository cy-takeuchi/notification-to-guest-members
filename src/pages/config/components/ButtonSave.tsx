import { LoadingButton } from "@mui/lab";
import { Box } from "@mui/material";
import { t } from "i18next";
import React from "react";
import { useImmer } from "use-immer";

import { getApp } from "../../shared/functions/utils";
import { setPluginConfig } from "../functions/utils";

type TypeButtonSave = {
  pluginConfig: PluginConfig;
};
const ButtonSave = (props: TypeButtonSave) => {
  const { pluginConfig } = props;

  const [loading, setLoading] = useImmer(false);

  const onClick = async () => {
    setLoading(true);
    const res = await setPluginConfig(pluginConfig.param);
    setLoading(false);
    if (res.isOk()) {
      const app = getApp();
      if (!app) return;

      window.location.href = `../../flow?app=${app}`;
    }
  };

  return (
    <Box>
      <LoadingButton loading={loading} variant="contained" onClick={onClick}>
        {t("config:buttonSave.label")}
      </LoadingButton>
    </Box>
  );
};

export { ButtonSave };
