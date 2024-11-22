"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { ReactNode } from "react";
import { useEffect, useRef, useState } from "react";

const QueryProvider = ({ children }: { children: ReactNode }) => {
  const [queryClient] = useState(() => new QueryClient());

  const [isMocking, setIsMocking] = useState(false);
  const isWorkerStarted = useRef(false);

  useEffect(() => {
    async function enableApiMocking() {
      if (typeof window !== "undefined" && !isWorkerStarted.current) {
        isWorkerStarted.current = true;

        const { startWorker } = await import("@/shared/mocks/browser");
        await startWorker();

        setIsMocking(true);
      }
    }

    enableApiMocking();
  }, []);

  if (!isMocking) {
    return null;
  }

  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
};

export default QueryProvider;
