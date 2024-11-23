"use client";

import { trpc } from "@/shared/api/trpc";
import { useUserStore } from "@/shared/lib/zustand/user";
import Header from "./header";

const DefaultHeader = () => {
  const user = useUserStore((state) => state.user);
  const isLogin = user?.name || undefined;

  return (
    <Header>
      <Header.Logo />
      <Header.Nav />
      {isLogin ? (
        <div className="flex flex-1 justify-end items-center gap-4">
          <Header.NotificationMenu />
          <Header.MyPageMenu name={user?.name} email={user?.email} />
        </div>
      ) : (
        <Header.LoginAndSignup />
      )}
    </Header>
  );
};

export default trpc.withTRPC(DefaultHeader);
