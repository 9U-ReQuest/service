import kakaoSvg from "@/assets/icons/kakao-logo.svg";
import Typography from "@/shared/ui/common/typography/typography";
import Flex from "@/shared/ui/wrapper/flex/flex";
import Image from "next/image";
import Link from "next/link";

export default function Auth() {
  const href = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.NEXT_PUBLIC_KAKAO_CLIENT_ID}&redirect_uri=${process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI}&response_type=code`;

  return (
    <Flex direction="col" gap="2" alignItems="center" className="mt-5">
      <Link
        className="max-w-[300px] w-full py-3 px-10 rounded-lg bg-[#F0F0F0] hover:no-underline"
        href="/"
      >
        <Flex className="h-full" justifyContent="center" alignItems="center">
          <Typography as="p" size="base" weight="semibold" color="black">
            로그인 없이 둘러보기
          </Typography>
        </Flex>
      </Link>
      <Link
        className="max-w-[300px] w-full py-3 px-10 rounded-lg bg-kakao hover:no-underline flex justify-center items-center"
        href={href}
      >
        <Flex className="h-full" justifyContent="center" alignItems="center" gap="3">
          <Image src={kakaoSvg} alt="카카오 로고" width={24} height={24} />
          <Typography as="p" size="base" weight="semibold" color="black">
            kakao로 3초만에 시작하기
          </Typography>
        </Flex>
      </Link>
    </Flex>
  );
}
