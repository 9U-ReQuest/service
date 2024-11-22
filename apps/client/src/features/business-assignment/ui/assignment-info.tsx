"use client";

import lotte from "@/assets/images/lotte.png";
import { Button } from "@/shared/ui/button";
import Typography from "@/shared/ui/common/typography/typography";
import Flex from "@/shared/ui/wrapper/flex/flex";
import Image from "next/image";

export default function AssignmentInfo() {
  return (
    <Flex
      as="section"
      justifyContent="between"
      className="self-center w-full px-[100px] py-[60px] max-w-screen-2xl"
    >
      <Flex gap="10" className="w-full">
        <Image src={lotte} alt="기업 이미지" width={360} height={240} />
        <Flex direction="col" justifyContent="between" className="w-full">
          <Flex direction="col" className="leading-10" gap="3">
            <Typography as="p" size="lg">
              쇼핑 / 롯데백화점
            </Typography>
            <Typography as="p" size="3xl" weight="bold">
              AI 기반 고객 맞춤형 쇼핑 큐레이션 서비스
            </Typography>
            <Typography as="p" size="sm" className="text-[#313131]">
              2024 / 10 / 16
            </Typography>
          </Flex>
          <Button
            variant="link"
            className="self-end bg-[#F0F0F0] px-14 py-5 rounded-lg hover:no-underline"
          >
            <Typography as="p" size="lg" weight="bold" color="black">
              과제 도전하기
            </Typography>
          </Button>
        </Flex>
      </Flex>
    </Flex>
  );
}
