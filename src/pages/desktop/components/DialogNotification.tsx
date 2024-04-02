import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  Typography,
} from "@mui/material";
import { t } from "i18next";
import React from "react";
import { Updater } from "use-immer";

import { ButtonCloseDialog } from "./ButtonCloseDialog";
import { ButtonPostMessage } from "./ButtonPostMessage";
import { TableResult } from "./TableResult";
import { TextNotificationContent } from "./TextNotificationContent";

type TypeDialogNotification = {
  open: boolean;
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
const DialogNotification = (props: TypeDialogNotification) => {
  const {
    open,
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

  return (
    <Dialog
      open={open}
      maxWidth="md"
      fullWidth
      sx={{ "& .MuiPaper-root": { overflowY: "initial" } }}
    >
      <DialogTitle>{t("desktop:dialogNotification.title")}</DialogTitle>
      {["ERROR"].includes(status) && (
        <DialogContent>
          <Typography sx={{ whiteSpace: "pre" }}>{errorMessage}</Typography>
        </DialogContent>
      )}
      {["GETTING_DESTINATIONS"].includes(status) && (
        <DialogContent>
          {t("desktop:dialogNotification.gettingDestinations")}
        </DialogContent>
      )}
      {["ZERO_DESTINATIONS"].includes(status) && (
        <DialogContent>
          {t("desktop:dialogNotification.zeroDestinations")}
        </DialogContent>
      )}
      {["GOT_DESTINATIONS", "POSTABLE_MESSAGE"].includes(status) && (
        <DialogContent>
          <TextNotificationContent
            notificationContent={notificationContent}
            setNotificationContent={setNotificationContent}
            destinations={destinations}
            status={status}
          />
        </DialogContent>
      )}
      {["POSTING_MESSAGE"].includes(status) && destinations && (
        <DialogContent>
          {t("desktop:dialogNotification.postingMessage", {
            count: postIndex + 1,
            total: destinations.length,
          })}
        </DialogContent>
      )}
      {["POSTED_MESSAGE"].includes(status) && destinations && (
        <DialogContent sx={{ overflowY: "initial" }}>
          {t("desktop:dialogNotification.postedMessage", {
            total: destinations.length,
          })}
          <TableResult destinations={destinations} />
        </DialogContent>
      )}
      <DialogActions sx={{ display: "inline-block" }}>
        <Stack
          spacing={2}
          direction="row-reverse"
          justifyContent="space-around"
        >
          <ButtonPostMessage
            open={open}
            setOpen={setOpen}
            notificationContent={notificationContent}
            setNotificationContent={setNotificationContent}
            postIndex={postIndex}
            setPostIndex={setPostIndex}
            destinations={destinations}
            setDestinations={setDestinations}
            status={status}
          />
          <ButtonCloseDialog
            setOpen={setOpen}
            notificationContent={notificationContent}
            setNotificationContent={setNotificationContent}
            errorMessage={errorMessage}
            setErrorMessage={setErrorMessage}
            postIndex={postIndex}
            setPostIndex={setPostIndex}
            destinations={destinations}
            setDestinations={setDestinations}
            status={status}
          />
        </Stack>
      </DialogActions>
    </Dialog>
  );
};

export { DialogNotification };
