import banner from "@/assets/images/banner.png";
import Typography from "@/shared/ui/common/typography/typography";
import Banner from "@/widgets/ui/banner";

export default function AssignmentBanner() {
  return (
    <Banner backgroundImage={banner.src} className="justify-end py-14 px-24 gap-6">
      <Typography as="p" size="3xl" weight="extrabold" color="white">
        AI과제생성을 통해 기업 과제 연습해보세요!
      </Typography>
      <Typography as="div" size="base" weight="semibold" color="white">
        실시간 코드분석을 통해 나의 진행을 완벽하게 파악할 수 있어요.
      </Typography>
    </Banner>
  );
}
