import { Autocomplete, Box, TextField } from "@mui/material";
import { t } from "i18next";
import React, { SyntheticEvent } from "react";
import { Updater } from "use-immer";

type TypeSelectGuestSpace = {
  pluginConfig: PluginConfig;
  setPluginConfig: Updater<PluginConfig>;
  options: SelectOptionField[];
};
const SelectGuestSpace = (props: TypeSelectGuestSpace) => {
  const { pluginConfig, setPluginConfig, options } = props;

  const selectedValue =
    options.find(
      (option) => option.code === pluginConfig.param.fieldCodeGuestSpace,
    ) ?? null;

  const onChange = (
    event: SyntheticEvent<Element, Event>,
    value: SelectOptionField | null | undefined,
  ) => {
    setPluginConfig((draft) => {
      draft.param.fieldCodeGuestSpace = value?.code ?? null;
    });
  };

  return (
    <Box>
      <Autocomplete
        disablePortal
        options={options}
        sx={{ width: 300 }}
        renderInput={(params) => (
          // @ts-ignore
          <TextField {...params} label={t("config:selectGuestSpace.label")} />
        )}
        onChange={onChange}
        value={selectedValue}
      />
    </Box>
  );
};

export { SelectGuestSpace };
