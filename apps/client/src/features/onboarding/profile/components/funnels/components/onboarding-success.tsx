import logo from "@/assets/icons/logo.svg";
import onboarding_success from "@/assets/images/onboarding-success.png";
import { Button } from "@/shared/ui/button";
import Typography from "@/shared/ui/common/typography/typography";
import Flex from "@/shared/ui/wrapper/flex/flex";
import Image from "next/image";
import Link from "next/link";

export default function OnboardingSuccess() {
  return (
    <Flex justifyContent="center" className="w-full h-fit-height">
      <Flex direction="col" alignItems="center" className="text-center max-w-[676px]">
        <Flex direction="col" alignItems="center" gap="4">
          <Image src={logo} alt="ReQuest Logo" width={300} height={100} />
          <Typography size="4xl" weight="semibold" align="center" whitespace="pre-line">
            {"이제 ReQuest와 함께 \n기업 과제를 완벽하게 준비해보세요!"}
          </Typography>
          <Image
            src={onboarding_success}
            alt="Cartoon character"
            width={460}
            height={305}
            className="my-4"
          />
        </Flex>
        <Link href="/" className="w-full">
          <Button className="w-full bg-primary hover:bg-primary/90 text-white mt-4">
            메인화면으로
          </Button>
        </Link>
      </Flex>
    </Flex>
  );
}
