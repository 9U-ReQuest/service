type FlexDirection = "row" | "row-reverse" | "col" | "col-reverse";

type JustifyContent = "start" | "end" | "center" | "between" | "around" | "evenly";

type AlignItems = "start" | "end" | "center" | "baseline" | "stretch";

type FlexWrap = "nowrap" | "wrap" | "wrap-reverse";

type Gap<N extends number, Result extends unknown[] = []> = Result["length"] extends N
  ? `${Result["length"]}`
  : `${Result["length"]}` | Gap<N, [...Result, unknown]>;

export type { AlignItems, FlexDirection, FlexWrap, Gap, JustifyContent };
