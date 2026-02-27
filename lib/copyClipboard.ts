import { sileo } from "sileo";

export const copyClipboard = (value: string) => {
  navigator.clipboard.writeText(value);
  sileo.success({
    title: "Success",
    description: "Copied to clipboard",
  });
};
