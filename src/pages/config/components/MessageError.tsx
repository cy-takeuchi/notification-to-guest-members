import { Alert, Typography } from "@mui/material";
import React from "react";

type TypeMessageError = {
  messageError: string;
};
const MessageError = (props: TypeMessageError) => {
  const { messageError } = props;

  if (messageError === "") return null;

  return (
    <Alert severity="error" sx={{ whiteSpace: "pre" }}>
      {messageError}
    </Alert>
  );
};

export { MessageError };
