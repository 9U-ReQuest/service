// flex-row flex-col
type FlexDirection = "row" | "row-reverse" | "col" | "col-reverse";

// justify-start justify-end justify-center justify-between justify-around justify-evenly
type JustifyContent = "start" | "end" | "center" | "between" | "around" | "evenly";

// items-start items-end items-center items-baseline items-stretch
type AlignItems = "start" | "end" | "center" | "baseline" | "stretch";

// flex-wrap nowrap wrap wrap-reverse
type FlexWrap = "nowrap" | "wrap" | "wrap-reverse";

// gap-0 gap-1 gap-2 gap-3 gap-4 gap-5 gap-6 gap-7 gap-8 gap-9 gap-10 gap-11 gap-12 gap-13 gap-14 gap-15 gap-16 gap-17 gap-18 gap-19 gap-20 gap-21 gap-22 gap-23 gap-24
type Gap<N extends number, Result extends unknown[] = []> = Result["length"] extends N
  ? `${Result["length"]}`
  : `${Result["length"]}` | Gap<N, [...Result, unknown]>;

export type { AlignItems, FlexDirection, FlexWrap, Gap, JustifyContent };
