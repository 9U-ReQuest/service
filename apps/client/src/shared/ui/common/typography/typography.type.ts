// text-left text-center text-right text-justify
type TextAlign = "left" | "center" | "right" | "justify";

// font-normal font-medium font-semibold font-bold font-extrabold font-black
type FontWeight = "normal" | "medium" | "semibold" | "bold" | "extrabold" | "black";

// text-xs text-sm text-base text-lg text-xl text-2xl text-3xl text-4xl text-5xl text-6xl text-7xl
type FontSize = "xs" | "sm" | "base" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl" | "6xl" | "7xl";

// text-primary text-secondary text-muted text-accent text-white text-black
type TextColor = "primary" | "secondary" | "muted" | "accent" | "white" | "black";

// normal capitalize uppercase lowercase
type TextTransform = "none" | "capitalize" | "uppercase" | "lowercase";

// whitespace-normal whitespace-nowrap whitespace-pre whitespace-pre-line whitespace-pre-wrap
type Whitespace = "normal" | "nowrap" | "pre" | "pre-line" | "pre-wrap";

// break-all keep-all break-word
type WordBreak = "normal" | "break-all" | "keep-all" | "break-word";

// line-clamp-1 line-clamp-2 line-clamp-3 line-clamp-4 line-clamp-5 line-clamp-6
type LineClamp = "none" | "1" | "2" | "3" | "4" | "5" | "6";

export type {
  FontSize,
  FontWeight,
  LineClamp,
  TextAlign,
  TextColor,
  TextTransform,
  Whitespace,
  WordBreak,
};
