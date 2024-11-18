import QueryProvider from "@/widgets/query-provider";
import type { PropsWithChildren } from "react";

type ProviderComponent = ({ children }: PropsWithChildren) => JSX.Element;

const providers: ProviderComponent[] = [
  ({ children }) => <QueryProvider>{children}</QueryProvider>,
  // ({ children }) => <TrpcProvider>{children}</TrpcProvider>,
];

export const Provider = ({ children }: PropsWithChildren) => {
  return providers.reduceRight(
    // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
    (acc, Provider, idx) => <Provider key={idx}>{acc}</Provider>,
    children,
  );
};
