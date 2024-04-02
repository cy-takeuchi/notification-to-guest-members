import { TextField, Typography } from "@mui/material";
import { t } from "i18next";
import React from "react";
import { Updater } from "use-immer";

type TypeTextNotificationContent = {
  notificationContent: string;
  setNotificationContent: Updater<string>;
  destinations: Destination[] | undefined | null;
  status: Status;
};
const TextNotificationContent = (props: TypeTextNotificationContent) => {
  const { notificationContent, setNotificationContent, destinations, status } =
    props;

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNotificationContent(event.target.value);
  };

  if (destinations === undefined || destinations === null) return null;

  return (
    <>
      <Typography>
        {t("desktop:textNotificationContent.title", {
          count: destinations.length,
        })}
      </Typography>
      <TextField
        multiline
        rows={8}
        value={notificationContent}
        onChange={onChange}
        disabled={!["GOT_DESTINATIONS", "POSTABLE_MESSAGE"].includes(status)}
        fullWidth
      />
    </>
  );
};

export { TextNotificationContent };
