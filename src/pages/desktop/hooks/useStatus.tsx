import { useMemo } from "react";

type TypeUseStatus = {
  open: boolean;
  notificationContent: string;
  errorMessage: string;
  postIndex: number;
  destinations: Destination[] | undefined | null;
};
const useStatus = (props: TypeUseStatus) => {
  const { open, notificationContent, errorMessage, postIndex, destinations } =
    props;

  const status: Status = useMemo(() => {
    if (errorMessage !== "") return "ERROR";

    if (destinations === undefined) {
      return open ? "GETTING_DESTINATIONS" : "NONE";
    }

    if (destinations === null) return "ZERO_DESTINATIONS";

    if (destinations) {
      if (destinations.length === 0) return "ZERO_DESTINATIONS";

      if (destinations.length > -1) {
        if (postIndex === -1) {
          if (notificationContent !== "") {
            return "POSTABLE_MESSAGE";
          }
          return "GOT_DESTINATIONS";
        }

        if (postIndex > -1 && postIndex < destinations.length) {
          return "POSTING_MESSAGE";
        }
        return "POSTED_MESSAGE";
      }
    }

    return "UNEXPECTED_ERROR";
  }, [open, notificationContent, errorMessage, postIndex, destinations]);

  return {
    status,
  };
};

export { useStatus };
