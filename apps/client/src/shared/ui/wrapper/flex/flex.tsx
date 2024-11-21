import { cn } from "@/shared/lib/utils";
import type { PolymorphicComponentProp } from "@/shared/types/polymorphic-type";
import type { ElementType, ReactElement } from "react";
import type { AlignItems, FlexDirection, FlexWrap, Gap, JustifyContent } from "./flex.type";

interface FlexProps {
  direction?: FlexDirection;
  justifyContent?: JustifyContent;
  alignItems?: AlignItems;
  wrap?: FlexWrap;
  gap?: Gap;
  className?: string;
}

type FlexComponent = (<C extends ElementType = "div">(
  props: PolymorphicComponentProp<C, FlexProps>,
) => ReactElement | null) & {
  displayName?: string;
};

const Flex: FlexComponent = <C extends ElementType = "div">({
  as,
  direction = "row",
  justifyContent = "start",
  alignItems = "stretch",
  wrap = "nowrap",
  gap = "gap-0",
  className,
  children,
  ...props
}: PolymorphicComponentProp<C, FlexProps>) => {
  const Component = as || "div";

  const flexClasses = [
    "flex",
    `flex-${direction}`,
    `justify-${justifyContent}`,
    `items-${alignItems}`,
    `flex-${wrap}`,
    gap,
    className,
  ];

  return (
    <Component className={cn(...flexClasses)} {...props}>
      {children}
    </Component>
  );
};

Flex.displayName = "Flex";

export default Flex;
