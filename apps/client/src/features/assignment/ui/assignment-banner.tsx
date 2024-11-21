import banner from "@/assets/images/banner.png";
import Banner from "@/widgets/ui/banner";

export default function AssignmentBanner() {
  return (
    <Banner backgroundImage={banner.src} className="justify-end py-14 px-24 gap-6">
      <p className="text-white text-3xl font-extrabold">
        AI과제생성을 통해 기업 과제 연습해보세요!
      </p>
      <div className="text-white text-base font-semibold">
        실시간 코드분석을 통해 나의 진행을 완벽하게 파악할 수 있어요.
      </div>
    </Banner>
  );
}
