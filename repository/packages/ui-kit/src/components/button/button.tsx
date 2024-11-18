import {
  Button as ShadcnButton,
  type ButtonProps as ShadcnButtonProps,
} from "@/components/ui/button";
import type { ComponentPropsWithRef } from "react";

export interface ButtonProps extends ShadcnButtonProps, ComponentPropsWithRef<"button"> {}

export default function Button(props: ButtonProps) {
  const { children, ...rest } = props;

  return <ShadcnButton {...rest}>{children}</ShadcnButton>;
}
