import type { PropsWithChildren } from "react";

export default function MaxWidth({ children }: PropsWithChildren) {
  return <div className="max-w-2xl w-full">{children}</div>;
}
