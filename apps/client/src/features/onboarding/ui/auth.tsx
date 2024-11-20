"use client";

import kakaoSvg from "@/assets/icons/kakao-logo.svg";
import { Button } from "@/shared/ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Auth() {
  const navigate = useRouter();
  const handleRoutetoHome = () => {
    navigate.push("/");
  };

  const onClickKakaoLogin = () => {};
  return (
    <div className="mt-5 flex flex-col gap-2 items-center">
      <Button
        variant="link"
        className="font-semibold text-xl w-[389px] h-16 rounded-lg text-black bg-[#F0F0F0] hover:no-underline"
        onClick={handleRoutetoHome}
      >
        <p>로그인 없이 둘러보기</p>
      </Button>
      <Button
        variant="link"
        className="font-semibold text-xl w-[389px] h-16 rounded-lg text-black bg-kakao hover:no-underline flex"
        onClick={onClickKakaoLogin}
      >
        <Image src={kakaoSvg} alt="카카오 로고" width={30} height={30} />
        <p>kakao로 3초만에 시작하기</p>
      </Button>
    </div>
  );
}
