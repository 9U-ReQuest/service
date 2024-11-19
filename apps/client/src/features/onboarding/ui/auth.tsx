"use client";

import { Button } from "@request/ui-kit";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Auth() {
  const navigate = useRouter();
  const onClickNavigate = () => {
    navigate.push("/");
  };

  const onClickKakaoLogin = () => {};
  return (
    <div className="mt-5 flex flex-col gap-2 items-center">
      <Button
        variant="link"
        className="font-semibold text-xl w-[389px] h-16 rounded-lg text-black bg-[#F0F0F0] hover:no-underline"
        onClick={onClickNavigate}
      >
        로그인 없이 둘러보기
      </Button>
      <Button
        variant="link"
        className="font-semibold text-xl w-[389px] h-16 rounded-lg text-black bg-[#FEE500] hover:no-underline flex"
        onClick={onClickKakaoLogin}
      >
        <Image src="/icons/kakao-logo.svg" alt="카카오 로고" width={30} height={30} />
        kakao로 3초만에 시작하기
      </Button>
    </div>
  );
}
