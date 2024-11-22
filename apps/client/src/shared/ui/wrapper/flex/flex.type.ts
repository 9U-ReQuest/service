type FlexDirection = "row" | "row-reverse" | "col" | "col-reverse";

type JustifyContent = "start" | "end" | "center" | "between" | "around" | "evenly";

type AlignItems = "start" | "end" | "center" | "baseline" | "stretch";

type FlexWrap = "nowrap" | "wrap" | "wrap-reverse";

// Gap<20> = "0" | "1" ... "20"
// 20부터 0까지 1씩 감소하도록 재귀적으로 타입을 정의
// biome-ignore lint/suspicious/noExplicitAny: <explanation>
type Gap<N extends number, A extends any[] = []> = A["length"] extends N
  ? `${N}`
  :
      | `${
          // biome-ignore lint/suspicious/noExplicitAny: <explanation>
          A["length"]
        }`
      | Gap<N, [any, ...A]>;

export type { AlignItems, FlexDirection, FlexWrap, Gap, JustifyContent };
