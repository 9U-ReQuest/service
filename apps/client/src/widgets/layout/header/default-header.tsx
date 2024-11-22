"use client";
import { useState } from "react";
import Header from "./header";

// TODO: Remove this mock data
const MOCK_DEFAULT_USER = {
  name: "홍길동",
  githubId: "hongildong@gmail.com",
  profileImageUrl: undefined,
};

export default function DefaultHeader() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  return (
    <Header>
      <Header.Logo />
      <Header.Nav />
      {isLoggedIn ? (
        <div className="flex flex-1 justify-end items-center gap-4">
          <Header.NotificationMenu />
          <Header.MyPageMenu {...MOCK_DEFAULT_USER} />
        </div>
      ) : (
        <Header.LoginAndSignup />
      )}
    </Header>
  );
}
