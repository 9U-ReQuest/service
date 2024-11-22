import banner from "@/assets/images/banner.png";
import { ROUTES } from "@/shared/constant/url";
import Typography from "@/shared/ui/common/typography/typography";
import Flex from "@/shared/ui/wrapper/flex/flex";
import Banner from "@/widgets/ui/banner";
import Link from "next/link";

export default function HomeBanner() {
  return (
    <Banner backgroundImage={banner.src} className="justify-center">
      <Flex direction="col" alignItems="center" justifyContent="center" gap="4">
        <Typography as="h1" size="4xl" weight="extrabold" color="white">
          완벽한 ReQuest와 함께 기업 과제를 준비해보세요!
        </Typography>
        <Typography as="p" size="base" weight="semibold" color="white">
          AI기반 맞춤형 과제 생성과 객관적인 평가를 통해 내 수행능력을 파악할 수 있어요
        </Typography>
        <Link
          href={ROUTES.HOME}
          className="rounded-[40px] bg-white hover:bg-white/90 border-[#D9D9D9] px-6 py-2 transition-colors"
        >
          <Typography size="xs" weight="semibold" color="black">
            AI 과제 생성하러 가기
          </Typography>
        </Link>
      </Flex>
    </Banner>
  );
}
