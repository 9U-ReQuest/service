import logoSvg from "@/assets/icons/logo.svg";
import Auth from "@/features/onboarding/ui/auth";
import OnboardingCarousel from "@/features/onboarding/ui/onboarding-carousel";
import Image from "next/image";

export default function OnboardingPage() {
  return (
    <section className="flex justify-center gap-24 h-screen">
      <div className="flex font-bold justify-center items-center">
        <div className="space-y-6">
          <Image src={logoSvg} width={250} height={76} alt="ReQuest 로고 이미지" />
          <div className="space-y-5">
            <p className="text-5xl min-w-max">IT업계 취업을 위한</p>
            <p className="text-7xl min-w-max">AI과제 전형 도우미</p>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-9 items-center justify-center">
        <OnboardingCarousel />
        <Auth />
      </div>
    </section>
  );
}
