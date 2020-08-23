import { swiss } from "@theme-ui/presets";

export default {
  ...swiss,
  styles: {
    ...swiss.styles,
    th: {
      verticalAlign: "bottom",
      borderBottomWidth: "2px",
      border: "1px solid black",
    },
    td: {
      verticalAlign: "top",
      borderBottomWidth: "1px",
      border: "1px solid black",
    },
    tb: {
      border: "1px solid black",
    },
  },

  cards: {
    primary: {
      padding: 2,
      borderRadius: 4,
      borderTop: "4px solid rgba(94, 102, 253, 1)",
      boxShadow: "0 8px 12px rgba(0, 0, 0, 0.25)",
    },
    compact: {
      padding: 1,
      borderRadius: 2,
      border: "1px solid",
      borderColor: "muted",
    },
  },
};
