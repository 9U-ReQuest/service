"use client";
import { trpc } from "@/shared/api/trpc";
import { useEffect } from "react";

const Page = () => {
  const { data, isLoading, error } = trpc.test.useQuery();
  // trpc.mutation.useMutation({ name: "test" });
  const { mutate } = trpc.mutation.useMutation();

  // call mutation
  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    mutate({ name: "test" });
  }, []);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h1>Ping Response</h1>
      <p>{data}</p>
    </div>
  );
};

export default Page;
