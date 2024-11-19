import Auth from "@/features/onboarding/ui/auth";
import OnboardingCarousel from "@/features/onboarding/ui/onboarding-carousel";
import Image from "next/image";

function OnboardingPage() {
  return (
    <section className="flex justify-center gap-24 h-screen">
      <div className="flex font-bold justify-center items-center leading-[91px]">
        <div className="space-y-6">
          <Image src="/icons/logo.svg" width={250} height={76} alt="ReQuest 로고 이미지" />
          <div>
            <span className="text-5xl leading min-w-max">IT업계 취업을 위한</span>
            <br />
            <span className="text-7xl min-w-max">AI과제 전형 도우미</span>
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

export default OnboardingPage;
