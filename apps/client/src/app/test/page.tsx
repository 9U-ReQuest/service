"use client";
import InputUserInfo from "@/features/assignment/create/components/funnels/input-userinfo";
import { trpc } from "@/shared/api/trpc";

export default trpc.withTRPC(function Page() {
  return <InputUserInfo onNext={() => {}} />;
});
