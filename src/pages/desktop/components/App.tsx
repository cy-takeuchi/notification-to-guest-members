import React from "react";
import { useImmer } from "use-immer";

import { useDestinations } from "../hooks/useDestinations";
import { useStatus } from "../hooks/useStatus";

import { ButtonOpenDialog } from "./ButtonOpenDialog";
import { DialogNotification } from "./DialogNotification";

type TypeApp = {
  fieldCodeGuestSpace: string;
  fieldCodeMention: string;
};
const App = (props: TypeApp) => {
  const { fieldCodeGuestSpace, fieldCodeMention } = props;

  const [open, setOpen] = useImmer(false);
  const [notificationContent, setNotificationContent] = useImmer("");
  const [errorMessage, setErrorMessage] = useImmer("");
  const [postIndex, setPostIndex] = useImmer(-1);
  const { destinations, setDestinations } = useDestinations({
    fieldCodeGuestSpace,
    fieldCodeMention,
    open,
    setErrorMessage,
  });
  const { status } = useStatus({
    open,
    notificationContent,
    postIndex,
    errorMessage,
    destinations,
  });

  return (
    <>
      <ButtonOpenDialog setOpen={setOpen} />
      <DialogNotification
        open={open}
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
    </>
  );
};

export { App };
