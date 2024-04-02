import SendIcon from "@mui/icons-material/Send";
import Button from "@mui/material/Button";
import { t } from "i18next";
import React, { useEffect } from "react";
import { Updater } from "use-immer";

import { postNotificationMessage } from "../functions/utils";

type TypeButtonPostMessage = {
  open: boolean;
  setOpen: Updater<boolean>;
  notificationContent: string;
  setNotificationContent: Updater<string>;
  postIndex: number;
  setPostIndex: Updater<number>;
  destinations: Destination[] | undefined | null;
  setDestinations: Updater<Destination[] | undefined | null>;
  status: Status;
};
const ButtonPostMessage = (props: TypeButtonPostMessage) => {
  const {
    open,
    setOpen,
    notificationContent,
    setNotificationContent,
    postIndex,
    setPostIndex,
    destinations,
    setDestinations,
    status,
  } = props;

  const onClick = () => {
    setPostIndex(0);
  };

  useEffect(() => {
    const f = async () => {
      if (destinations === undefined || destinations === null) return;

      const destination = destinations[postIndex];
      if (!destination) return;

      postNotificationMessage(destination, notificationContent).then((res) => {
        setDestinations((drafts) => {
          if (!drafts) return;

          const draft = drafts[postIndex];
          if (!draft) return;

          if (res.isErr()) {
            draft.result = "ERROR";
            draft.errorMessage = res.error;
          }

          if (res.isOk()) {
            draft.result = "SUCCESS";
          }
        });

        setTimeout(
          () => {
            setPostIndex((draft) => draft + 1);
          },
          postIndex === destinations.length - 1 ? 0 : 1000,
        );
      });
    };

    if (destinations) {
      if (postIndex < destinations.length) {
        const destination = destinations[postIndex];

        if (destination && destination.result === "NA") {
          setPostIndex((draft) => draft + 1);
        } else {
          f();
        }
      }
    }
  }, [postIndex]);

  if (!destinations || ["POSTED_MESSAGE"].includes(status)) {
    return null;
  }

  return (
    <Button
      startIcon={<SendIcon />}
      onClick={onClick}
      variant="contained"
      color="primary"
      disabled={!["POSTABLE_MESSAGE"].includes(status)}
    >
      {t("desktop:buttonPostMessage.label")}
    </Button>
  );
};

export { ButtonPostMessage };
