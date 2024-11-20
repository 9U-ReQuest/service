import banner from "@/assets/images/banner.png";
import { ROUTES } from "@/shared/constant/url";
import Banner from "@/widgets/ui/banner";
import Link from "next/link";

export default function HomeBanner() {
  return (
    <Banner backgroundImage={banner.src} className="justify-center">
      <div className="flex flex-col items-center justify-center">
        <h1 className="mb-4 text-4xl font-extrabold text-white">
          완벽한 ReQuest와 함께 기업 과제를 준비해보세요!
        </h1>
        <p className="mb-8 text-base font-semibold text-white">
          AI기반 맞춤형 과제 생성과 객관적인 평가를 통해 내 수행능력을 파악할 수 있어요
        </p>
        <Link
          href={ROUTES.HOME}
          className="rounded-[40px] bg-white border-[#D9D9D9] px-6 py-2 text-xs font-semibold text-black transition-colors hover:bg-white/90"
        >
          AI 과제 생성하러 가기
        </Link>
      </div>
    </Banner>
  );
}
