import { swiss } from "@theme-ui/presets";
export default {
  ...swiss,
  styles: {
    ...swiss.styles,
  },
  cards: {
    primary: {
      padding: 2,
      borderRadius: 4,
      borderTop: "3px solid rgba(94, 102, 253, 1)",
      boxShadow: "0 0 8px rgba(0, 0, 0, 0.25)",
    },
    compact: {
      padding: 1,
      borderRadius: 2,
      border: "1px solid",
      borderColor: "muted",
    },
  },
};
