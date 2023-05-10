import { keyframes, style } from "@vanilla-extract/css";

const logoSpin = keyframes({
  from: {
    transform: "rotate(0deg)"
  },
  to: {
    transform: "rotate(360deg)"
  }
});

export const logo = style({
  height: "6em",
  padding: "1.5em",
  willChange: "filter",
  transition: "filter 300ms",

  selectors: {
    "&:hover": {
      filter: "drop-shadow(0 0 2em #646cffaa)"
    },
    "a:nth-of-type(2) &": {
      "@media": {
        "(prefers-reduced-motion: no-preference)": {
          animation: `${logoSpin} infinite 20s linear`
        }
      }
    }
  }
});

export const logoReact = style([
  logo,
  {
    ":hover": {
      filter: "drop-shadow(0 0 2em #61dafbaa)"
    }
  }
]);

export const card = style({
  padding: "2em"
});

export const readTheDocs = style({
  color: "#888"
});
