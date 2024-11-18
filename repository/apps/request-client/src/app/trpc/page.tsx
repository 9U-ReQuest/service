"use client";
import { trpc } from "@/shared/api/trpc";

const Page = () => {
  const { data, isLoading, error } = trpc.v1.ping.useQuery();

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
