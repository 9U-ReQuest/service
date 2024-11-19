import type { PropsWithChildren } from "react";

export default function FullWidthAndCenter({ children }: PropsWithChildren) {
  return <div className="w-screen flex flex-col items-center">{children}</div>;
}
