type EmptyObject = Record<string, never>;

type PluginConfig = {
  param: PluginConfigParam;
  version: string;
};

type PluginConfigParam = {
  fieldCodeGuestSpace: string | null;
  fieldCodeMention: string | null;
  view: string | null;
};

type PluginConfigUnParsed = Record<keyof PluginConfig, string>;

type Method = "GET" | "POST" | "PUT" | "DELETE";

type SelectOptionField = {
  label: string;
  code: string;
};

type SelectOptionView = {
  label: string;
  id: string;
};

type Status =
  | "NONE"
  | "GETTING_DESTINATIONS"
  | "ZERO_DESTINATIONS"
  | "GOT_DESTINATIONS"
  | "POSTABLE_MESSAGE"
  | "POSTING_MESSAGE"
  | "POSTED_MESSAGE"
  | "ERROR"
  | "UNEXPECTED_ERROR";

type Destination = {
  recordId: string;
  guestSpace: string;
  mentions: string[];
  // NONE: not yet, SUCCESS: posted, ERROR: failed, NA: not available
  result: "NONE" | "SUCCESS" | "ERROR" | "NA";
  errorMessage?: string;
};
