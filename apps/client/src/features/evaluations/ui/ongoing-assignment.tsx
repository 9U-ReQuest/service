"use client";

import baemin from "@/assets/images/baemin.png";
import { Button } from "@/shared/ui/button";
import Image from "next/image";

export default function OngoingAssignment() {
  const handleRouteToAssignment = () => {
    // TODO: Route to assignment page
  };
  return (
    <div className="relative">
      <div className="absolute flex justify-between p-2 xl:p-8 lg:p-4 sm:p-2 w-full h-full">
        <div className="flex flex-col justify-between">
          <div className="space-y-1">
            <p className="text-xs xl:text-base lg:text-sm sm:text-xs">결제/배달의민족/FE</p>
            <p className="font-bold text-xl xl:text-3xl lg:text-2xl sm:text-xl">
              배달의 민족 자동 업로드 생성
            </p>
          </div>
          <p className="text-xs">2024/10/16</p>
        </div>
        <Button
          variant="link"
          className="self-end font-bold bg-white text-black px-14 py-5 rounded-lg hover:no-underline"
          onClick={handleRouteToAssignment}
        >
          과제 확인하기
        </Button>
      </div>
      <Image src={baemin} alt="과제 이미지" width={1298} height={216} />
    </div>
  );
}
