"use client";

import { trpc } from "@/shared/api/trpc";
import { setCookie } from "@/shared/lib/cookie";
import { useUserStore } from "@/shared/lib/zustand/user";
import Typography from "@/shared/ui/common/typography/typography";
import Flex from "@/shared/ui/wrapper/flex/flex";
import { Loader2 } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

const CallbackPage = () => {
  const searchParams = useSearchParams();
  const setUser = useUserStore((state) => state.setUser);
  const code = searchParams?.get("code") || "";
  const router = useRouter();
  const {
    data: loginData,
    isLoading,
    isError,
    isSuccess,
  } = trpc.v1.auth.kakao.useQuery({ code }, { enabled: !!code });
  const { data: userData } = trpc.v1.user.me.useQuery();

  const handleRedirectToHome = () => {
    router.replace("/");
  };

  const handleRedirectToOnboardingProfile = () => {
    router.replace("/onboarding/profile");
  };

  const textByLoading = isLoading ? "로그인 중..." : isError ? "로그인 실패" : "로그인 성공!";
  const textByError = isError
    ? "관리자에게 문의 해주세요."
    : loginData?.registered
      ? "메인 페이지로 이동합니다."
      : "ReQuest에 오신 것을 환영합니다!";

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    if (!code) {
      handleRedirectToHome();
    }
  }, [code, router]);

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    if (!isLoading) {
      if (isSuccess) {
        setCookie("accessToken", loginData?.accessToken);
        if (userData) {
          setUser({ name: userData.name, email: userData.email });
        }
      }
      setTimeout(() => {
        if (isError || loginData?.registered) {
          return handleRedirectToHome();
        }
        handleRedirectToOnboardingProfile();
      }, 2000);
    }
  }, [isLoading]);

  return (
    <Flex as="main" direction="col" className="h-fit-height justify-center items-center gap-10">
      <Typography as="p" className="text-primary text-5xl font-bold">
        {textByLoading}
      </Typography>
      {isLoading ? (
        <Loader2 className="w-20 h-20 animate-spin" />
      ) : (
        <Typography as="p" className="text-center text-3xl font-bold">
          {textByError}
        </Typography>
      )}
    </Flex>
  );
};

export default trpc.withTRPC(CallbackPage);
