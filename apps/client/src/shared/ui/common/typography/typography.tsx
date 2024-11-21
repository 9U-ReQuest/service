import { cn } from "@/shared/lib/utils";
import type { PolymorphicComponentProp } from "@/shared/types/polymorphic-type";
import type { ElementType, ReactElement } from "react";
import type {
  FontSize,
  FontWeight,
  LineClamp,
  TextAlign,
  TextColor,
  TextTransform,
  Whitespace,
  WordBreak,
} from "./typography.type";

interface TypographyProps {
  align?: TextAlign;
  weight?: FontWeight;
  size?: FontSize;
  color?: TextColor;
  transform?: TextTransform;
  className?: string;
  whitespace?: Whitespace;
  wordBreak?: WordBreak;
  lineClamp?: LineClamp;
}

type TypographyComponent = (<C extends ElementType = "p">(
  props: PolymorphicComponentProp<C, TypographyProps>,
) => ReactElement | null) & {
  displayName?: string;
};

const Typography: TypographyComponent = <C extends ElementType = "p">({
  as,
  align = "left",
  weight = "normal",
  size = "base",
  color = "black",
  transform = "none",
  /**
   * whitespace: 텍스트의 공백 처리 방식을 지정합니다.
   * - normal: 연속된 공백을 하나로 처리하고 자동 줄바꿈을 합니다. (기본값)
   * - nowrap: 연속된 공백을 하나로 처리하고 줄바꿈을 하지 않습니다.
   * - pre: 연속된 공백을 그대로 유지하고 줄바꿈은 \n에서만 합니다.
   * - pre-line: 연속된 공백을 하나로 처리하고 줄바꿈은 \n과 자동으로 처리합니다.
   * - pre-wrap: 연속된 공백을 그대로 유지하고 줄바꿈은 \n과 자동으로 처리합니다.
   */
  whitespace = "normal",
  /**
   * wordBreak: 단어의 줄바꿈 규칙을 지정합니다.
   * - normal: 기본 줄바꿈 규칙을 사용합니다. (기본값)
   * - break-all: 문자 단위로 줄바꿈을 합니다.
   * - keep-all: 단어 단위로 줄바꿈을 하되, CJK 문자에 대해서는 줄바꿈을 하지 않습니다.
   * - break-word: 단어 단위로 줄바꿈을 하되, 필요한 경우 단어 내에서도 줄바꿈을 합니다.
   */
  wordBreak = "normal",
  /**
   * lineClamp: 텍스트의 최대 표시 줄 수를 지정합니다.
   * - none: 줄 수 제한 없음 (기본값)
   * - 1 ~ 6: 지정된 줄 수만큼만 텍스트를 표시하고 나머지는 생략 부호(...)로 표시합니다.
   */
  lineClamp = "none",
  className,
  children,
  ...props
}: PolymorphicComponentProp<C, TypographyProps>) => {
  const Component = as || "p";

  const typographyClasses = [
    `text-${align}`,
    `font-${weight}`,
    `text-${size}`,
    `text-${color}`,
    `${transform !== "none" ? `${transform}` : ""}`,
    `whitespace-${whitespace}`,
    `break-${wordBreak}`,
    `${lineClamp !== "none" ? `line-clamp-${lineClamp}` : ""}`,
    className,
  ];

  return (
    <Component className={cn(...typographyClasses)} {...props}>
      {children}
    </Component>
  );
};

Typography.displayName = "Typography";

export default Typography;
