"use client";
import CreateSuccess from "@/features/assignment/create/components/funnels/create-success";
import { trpc } from "@/shared/api/trpc";

export default trpc.withTRPC(function Page() {
  return <CreateSuccess />;
});
