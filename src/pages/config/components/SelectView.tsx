import { Autocomplete, Box, TextField } from "@mui/material";
import React, { SyntheticEvent } from "react";
import { Updater } from "use-immer";

type TypeSelectView = {
  pluginConfig: PluginConfig;
  setPluginConfig: Updater<PluginConfig>;
  options: SelectOptionView[];
};
const SelectView = (props: TypeSelectView) => {
  const { pluginConfig, setPluginConfig, options } = props;

  const selectedValue =
    options.find((option) => option.id === pluginConfig.param.view) ?? null;

  const onChange = (
    event: SyntheticEvent<Element, Event>,
    value: SelectOptionView | null | undefined,
  ) => {
    setPluginConfig((draft) => {
      draft.param.view = value?.id ?? null;
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
          <TextField {...params} />
        )}
        onChange={onChange}
        value={selectedValue}
      />
    </Box>
  );
};

export { SelectView };
