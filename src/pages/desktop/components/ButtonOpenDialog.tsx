import SendIcon from "@mui/icons-material/Send";
import { IconButton, Tooltip } from "@mui/material";
import { t } from "i18next";
import React from "react";
import { Updater } from "use-immer";

type TypeButtonOpenDialog = {
  setOpen: Updater<boolean>;
};
const ButtonOpenDialog = (props: TypeButtonOpenDialog) => {
  const { setOpen } = props;

  const onClick = async () => {
    setOpen(true);
  };

  return (
    <Tooltip title={t("desktop:buttonOpenDialog.label")}>
      <IconButton
        onClick={onClick}
        color="primary"
        sx={{
          borderRadius: 0,
          width: "48px",
          height: "48px",
          display: "inline-flex",
          border: "1px solid #e3e7e8",
          verticalAlign: "top",
          marginRight: "8px",
        }}
      >
        <SendIcon />
      </IconButton>
    </Tooltip>
  );

  // return (
  //   <Button
  //     startIcon={<SendIcon />}
  //     onClick={onClick}
  //     variant="outlined"
  //     sx={{ marginX: "8" }}
  //   >
  //     {t("desktop:buttonOpenDialog.label")}
  //   </Button>
  // );
};

export { ButtonOpenDialog };
