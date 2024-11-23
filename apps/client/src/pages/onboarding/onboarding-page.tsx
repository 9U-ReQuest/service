import icon from "@/app/icon.png";
import logoSvg from "@/assets/icons/logo.svg";
import Auth from "@/features/onboarding/ui/auth";
import OnboardingCarousel from "@/features/onboarding/ui/onboarding-carousel";
import Typography from "@/shared/ui/common/typography/typography";
import Flex from "@/shared/ui/wrapper/flex/flex";
import Image from "next/image";

export default function OnboardingPage() {
  return (
    <Flex as="section" justifyContent="center" className="h-fit-height">
      <Flex justifyContent="center" alignItems="center" className="flex-1">
        <div className="space-y-2">
          <Flex alignItems="end" gap="3">
            <Image src={icon} width={60} height={60} alt="ReQuest 로고 이미지" />
            <Image src={logoSvg} width={80} height={24} alt="ReQuest 로고 이미지" />
          </Flex>
          <div className="space-y-1">
            <Typography as="p" size="2xl" weight="bold">
              IT업계 취업을 위한
            </Typography>
            <Typography as="p" size="3xl" weight="bold">
              AI과제 전형 도우미
            </Typography>
          </div>
        </div>
      </Flex>
      <Flex
        direction="col"
        justifyContent="center"
        alignItems="center"
        gap="4"
        className="flex-1 pr-[100px]"
      >
        <OnboardingCarousel />
        <Auth />
      </Flex>
    </Flex>
  );
}
