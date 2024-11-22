import logoSvg from "@/assets/icons/logo.svg";
import Auth from "@/features/onboarding/ui/auth";
import OnboardingCarousel from "@/features/onboarding/ui/onboarding-carousel";
import Typography from "@/shared/ui/common/typography/typography";
import Flex from "@/shared/ui/wrapper/flex/flex";
import Image from "next/image";

export default function OnboardingPage() {
  return (
    <Flex
      as="section"
      justifyContent="center"
      gap="24"
      className="h-fit-height
    "
    >
      <Flex className="font-bold justify-center items-center">
        <div className="space-y-6">
          <Image src={logoSvg} width={250} height={76} alt="ReQuest 로고 이미지" />
          <div className="space-y-5">
            <Typography as="p" size="5xl">
              IT업계 취업을 위한
            </Typography>
            <Typography as="p" size="7xl">
              AI과제 전형 도우미
            </Typography>
          </div>
        </div>
      </Flex>
      <Flex direction="col" justifyContent="center" alignItems="center" gap="9">
        <OnboardingCarousel />
        <Auth />
      </Flex>
    </Flex>
  );
}
