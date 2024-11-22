"use client";

import kakaoSvg from "@/assets/icons/kakao-logo.svg";
import { Button } from "@/shared/ui/button";
import Typography from "@/shared/ui/common/typography/typography";
import Flex from "@/shared/ui/wrapper/flex/flex";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Auth() {
  const navigate = useRouter();
  const handleRoutetoHome = () => {
    navigate.push("/");
  };

  const onClickKakaoLogin = () => {};
  return (
    <Flex direction="col" gap="2" alignItems="center" className="mt-5">
      <Button
        variant="link"
        className="w-[389px] h-16 rounded-lg bg-[#F0F0F0] hover:no-underline"
        onClick={handleRoutetoHome}
      >
        <Typography as="p" size="xl" weight="semibold" color="black">
          로그인 없이 둘러보기
        </Typography>
      </Button>
      <Button
        variant="link"
        className="w-[389px] h-16 rounded-lg bg-kakao hover:no-underline flex"
        onClick={onClickKakaoLogin}
      >
        <Image src={kakaoSvg} alt="카카오 로고" width={30} height={30} />
        <Typography as="p" size="xl" weight="semibold" color="black">
          kakao로 3초만에 시작하기
        </Typography>
      </Button>
    </Flex>
  );
}
