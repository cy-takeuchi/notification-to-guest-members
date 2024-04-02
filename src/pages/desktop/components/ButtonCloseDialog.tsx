import CloseIcon from "@mui/icons-material/Close";
import Button from "@mui/material/Button";
import { t } from "i18next";
import React from "react";
import { Updater } from "use-immer";

type TypeButtonCloseDialog = {
  setOpen: Updater<boolean>;
  notificationContent: string;
  setNotificationContent: Updater<string>;
  errorMessage: string;
  setErrorMessage: Updater<string>;
  postIndex: number;
  setPostIndex: Updater<number>;
  destinations: Destination[] | undefined | null;
  setDestinations: Updater<Destination[] | undefined | null>;
  status: Status;
};
const ButtonCloseDialog = (props: TypeButtonCloseDialog) => {
  const {
    setOpen,
    notificationContent,
    setNotificationContent,
    errorMessage,
    setErrorMessage,
    postIndex,
    setPostIndex,
    destinations,
    setDestinations,
    status,
  } = props;

  const onClick = () => {
    setOpen(false);

    // ダイアログが閉じ切ってから状態をリセットする
    setTimeout(() => {
      setPostIndex(-1);
      setErrorMessage("");
      setDestinations(undefined);
    }, 300);
  };

  return (
    <Button
      startIcon={<CloseIcon />}
      onClick={onClick}
      variant="outlined"
      color="inherit"
      disabled={status === "POSTING_MESSAGE"}
    >
      {t("desktop:buttonCloseDialog.label")}
    </Button>
  );
};

export { ButtonCloseDialog };
