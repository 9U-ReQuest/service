"use client";

import lotte from "@/assets/images/lotte.png";
import { Button } from "@/shared/ui/button";
import Image from "next/image";

export default function AssignmentInfo() {
  return (
    <section className="flex justify-between self-center w-full px-[100px] py-[60px] max-w-screen-2xl">
      <div className="flex gap-10 w-full">
        <Image src={lotte} alt="기업 이미지" width={360} height={240} />
        <div className="flex flex-col justify-between w-full">
          <div className="leading-10">
            <p>쇼핑 / 롯데백화점</p>
            <p className="text-3xl font-bold">AI 기반 고객 맞춤형 쇼핑 큐레이션 서비스</p>
            <p className="text-[#313131] mt-3">2024 / 10 / 16</p>
          </div>
          <Button
            variant="link"
            className="self-end font-bold bg-[#F0F0F0] text-black px-14 py-5 rounded-lg text-lg hover:no-underline"
          >
            과제 도전하기
          </Button>
        </div>
      </div>
    </section>
  );
}
