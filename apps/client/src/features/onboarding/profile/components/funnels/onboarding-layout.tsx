import InputImage from "@/assets/images/input-1.png";
import Typography from "@/shared/ui/common/typography/typography";
import Flex from "@/shared/ui/wrapper/flex/flex";
import Image from "next/image";
import type { PropsWithChildren } from "react";

export default function OnboardingLayout({ children }: PropsWithChildren) {
  return (
    <Flex direction="col" className="w-full justify-center">
      <Flex direction="col" className="max-w-[1200px] w-full h-fit-height" justifyContent="center">
        <main className="w-full">
          <Flex direction="row" className="container mx-auto px-4 py-8" justifyContent="center">
            <Flex
              direction="col"
              justifyContent="center"
              alignItems="center"
              className="flex-[0_0_60%]"
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
              <hr />
              {children}
              <hr />
            </Flex>
          </Flex>
        </main>
      </Flex>
    </Flex>
  );
}
