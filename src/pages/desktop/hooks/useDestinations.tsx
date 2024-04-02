import { t } from "i18next";
import { useEffect } from "react";
import { Updater, useImmer } from "use-immer";

import { convertToMentions, fetchDestinations } from "../functions/utils";

type TypeUseDestinations = {
  fieldCodeGuestSpace: string;
  fieldCodeMention: string;
  open: boolean;
  setErrorMessage: Updater<string>;
};
const useDestinations = (props: TypeUseDestinations) => {
  const { fieldCodeGuestSpace, fieldCodeMention, open, setErrorMessage } =
    props;

  // undefined: not initialized, null: no data
  const [destinations, setDestinations] = useImmer<
    Destination[] | undefined | null
  >(undefined);

  useEffect(() => {
    const f = async () => {
      const app = kintone.app.getId();
      const condition = kintone.app.getQueryCondition();
      if (app === null || condition === null) return;

      const fields = [fieldCodeGuestSpace, fieldCodeMention];
      const res = await fetchDestinations(app, condition, fields);

      if (res.isErr()) {
        setErrorMessage(res.error);
        return;
      }

      const records = res.value[0];
      if (records.length === 0) {
        setDestinations(null);
        return;
      }

      setDestinations(() => {
        return records.map((record) => {
          const guestSpace = record[fieldCodeGuestSpace]?.value as
            | string
            | undefined;
          const mention = record[fieldCodeMention]?.value as string | undefined;
          if (guestSpace === undefined || mention === undefined) {
            return {
              recordId: record.$id?.value as string,
              guestSpace: "",
              mentions: [],
              result: "NA",
              errorMessage: t("desktop:error.na"),
            };
          }

          if (guestSpace.trim() === "" || mention.trim() === "") {
            return {
              recordId: record.$id?.value as string,
              guestSpace: guestSpace.trim(),
              mentions: [],
              result: "NA",
              errorMessage: t("desktop:error.na"),
            };
          }

          const destination: Destination = {
            recordId: record.$id?.value as string,
            guestSpace: guestSpace.trim(),
            mentions: convertToMentions(mention.trim()),
            result: "NONE",
          };
          return destination;
        });
      });
    };
    if (open) f();
  }, [open]);

  return {
    destinations,
    setDestinations,
  };
};

export { useDestinations };
