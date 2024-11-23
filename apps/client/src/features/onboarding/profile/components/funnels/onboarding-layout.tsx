import InputImage from "@/assets/images/input-1.png";
import { cn } from "@/shared/lib/utils";
import Typography from "@/shared/ui/common/typography/typography";
import Flex from "@/shared/ui/wrapper/flex/flex";
import Image from "next/image";
import type { PropsWithChildren } from "react";

interface OnboardingLayoutProps {
  className?: string;
}

export default function OnboardingLayout({
  children,
  className,
}: PropsWithChildren<OnboardingLayoutProps>) {
  return (
    <Flex direction="col" className="w-full justify-center" alignItems="center">
      <Flex
        direction="col"
        className={cn("max-w-[1200px] w-full", className || "h-fit-height")}
        justifyContent="center"
      >
        <Flex direction="row" className="px-4 py-4 gap-52" justifyContent="center" wrap="wrap">
          <Flex
            direction="col"
            justifyContent="center"
            alignItems="center"
            className="flex-[0_0_30%]"
          >
            <Image
              src={InputImage}
              alt="Illustration"
              width={400}
              height={300}
              className="max-w-full h-auto"
            />
            <Flex direction="col" alignItems="center">
              <Typography as="h2" size="lg" weight="bold" className="mt-8">
                맞춤형 과제 생성을 위한 추가 정보가 필요해요!
              </Typography>
              <Typography size="base" weight="normal" className="mt-3">
                초기 설정을 통해 여러분에 대해 더 알려주세요!
              </Typography>
            </Flex>
          </Flex>
          <Flex direction="col" className="flex-[0_0_40%] space-y-4" gap="2">
            {children}
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
}
